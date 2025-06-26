import React, { useState, useCallback, useRef } from 'react';
import Grid from './components/Grid';
import { GridNode, Algorithm } from './types';
import { 
  createGrid, 
  generateRandomMaze, 
  clearPath, 
  resetGrid,
  getNewGridWithWallToggled,
  updateNodeInGrid,
  createGridCopy,
  GRID_DIMENSIONS 
} from './utils/gridUtils';
import { getAlgorithm } from './algorithms';
import styles from './App.module.css';

const App: React.FC = () => {
  const [grid, setGrid] = useState<GridNode[][]>(() => createGrid());
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startNode, setStartNode] = useState<{ row: number; col: number } | null>(null);
  const [endNode, setEndNode] = useState<{ row: number; col: number } | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(Algorithm.BFS);
  const [speed, setSpeed] = useState(50);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [placingMode, setPlacingMode] = useState<'start' | 'end' | 'wall'>('wall');
  const [isDrawingWalls, setIsDrawingWalls] = useState(false);
  
  const mouseIsPressed = useRef(false);

  const handleMouseDown = useCallback((row: number, col: number) => {
    if (isRunning) return;
    
    mouseIsPressed.current = true;
    setIsMousePressed(true);
    
    const node = grid[row][col];
    
    // If clicking on start or end node, switch to placement mode
    if (node.isStart) {
      setPlacingMode('start');
      // Clear the current start node
      setGrid(prev => updateNodeInGrid(prev, row, col, { isStart: false }));
      setStartNode(null);
    } else if (node.isEnd) {
      setPlacingMode('end');
      // Clear the current end node
      setGrid(prev => updateNodeInGrid(prev, row, col, { isEnd: false }));
      setEndNode(null);
    } else {
      // Handle first click for wall drawing
      if (placingMode === 'wall') {
        const newWallState = !node.isWall;
        setIsDrawingWalls(newWallState);
        setGrid(prev => updateNodeInGrid(prev, row, col, { isWall: newWallState }));
      } else {
        // Place start/end node
        handleNodeAction(row, col);
      }
    }
  }, [grid, isRunning, placingMode]);

  const handleMouseEnter = useCallback((row: number, col: number) => {
    if (!mouseIsPressed.current || isRunning) return;
    
    const node = grid[row][col];
    
    // Only draw walls when in wall mode and dragging
    if (placingMode === 'wall' && !node.isStart && !node.isEnd) {
      // Continue drawing walls/erasing walls based on the initial action
      setGrid(prev => updateNodeInGrid(prev, row, col, { isWall: isDrawingWalls }));
    }
  }, [isRunning, placingMode, isDrawingWalls, grid]);

  const handleMouseUp = useCallback(() => {
    mouseIsPressed.current = false;
    setIsMousePressed(false);
    setIsDrawingWalls(false);
  }, []);

  const handleNodeClick = useCallback((row: number, col: number) => {
    if (isRunning) return;
    handleNodeAction(row, col);
  }, [isRunning, placingMode, startNode, endNode]);

  const handleNodeAction = useCallback((row: number, col: number) => {
    const node = grid[row][col];
    
    if (placingMode === 'start' && !node.isEnd && !node.isWall) {
      // Remove previous start node
      if (startNode) {
        setGrid(prev => updateNodeInGrid(prev, startNode.row, startNode.col, { isStart: false }));
      }
      // Set new start node
      setGrid(prev => updateNodeInGrid(prev, row, col, { isStart: true }));
      setStartNode({ row, col });
      setPlacingMode('wall'); // Switch back to wall mode
    } else if (placingMode === 'end' && !node.isStart && !node.isWall) {
      // Remove previous end node
      if (endNode) {
        setGrid(prev => updateNodeInGrid(prev, endNode.row, endNode.col, { isEnd: false }));
      }
      // Set new end node
      setGrid(prev => updateNodeInGrid(prev, row, col, { isEnd: true }));
      setEndNode({ row, col });
      setPlacingMode('wall'); // Switch back to wall mode
    } else if (placingMode === 'wall' && !node.isStart && !node.isEnd) {
      setGrid(prev => getNewGridWithWallToggled(prev, row, col));
    }
  }, [grid, placingMode, startNode, endNode]);

  const handleClearPath = useCallback(() => {
    if (isRunning) return;
    setGrid(prev => clearPath(prev));
    setIsFinished(false);
  }, [isRunning]);

  const handleReset = useCallback(() => {
    if (isRunning) return;
    setGrid(resetGrid);
    setStartNode(null);
    setEndNode(null);
    setIsFinished(false);
    setPlacingMode('wall');
  }, [isRunning]);

  const handleGenerateMaze = useCallback(() => {
    if (isRunning) return;
    setGrid(prev => generateRandomMaze(prev));
    setIsFinished(false);
  }, [isRunning]);

  const handleSetStartNode = useCallback(() => {
    setPlacingMode('start');
  }, []);

  const handleSetEndNode = useCallback(() => {
    setPlacingMode('end');
  }, []);

  const handleRunAlgorithm = useCallback(() => {
    if (!startNode || !endNode || isRunning) return;
    
    console.log('Starting algorithm:', selectedAlgorithm);
    console.log('Start node:', startNode);
    console.log('End node:', endNode);
    
    // Clear previous path and prepare grid
    const clearedGrid = clearPath(grid);
    setGrid(clearedGrid);
    setIsRunning(true);
    setIsFinished(false);
    
    // Create a copy of the grid for algorithm processing
    const gridCopy = createGridCopy(clearedGrid);
    
    // Get the algorithm function
    const algorithmFunction = getAlgorithm(selectedAlgorithm);
    
    // Find start and end nodes in the grid copy
    const startGridNode = gridCopy[startNode.row][startNode.col];
    const endGridNode = gridCopy[endNode.row][endNode.col];
    
    // Ensure start and end nodes have correct properties
    startGridNode.isStart = true;
    endGridNode.isEnd = true;
    
    console.log('Running algorithm...');
    
    // Run the algorithm
    try {
      const result = algorithmFunction(gridCopy, startGridNode, endGridNode);
      console.log('Algorithm result:', result);
      
      // Animate the results
      animateAlgorithm(result.visitedNodesInOrder, result.nodesInShortestPathOrder, result.isPathFound);
    } catch (error) {
      console.error('Algorithm error:', error);
      setIsRunning(false);
    }
  }, [startNode, endNode, isRunning, selectedAlgorithm, speed, grid]);

  const animateAlgorithm = useCallback((
    visitedNodesInOrder: GridNode[], 
    shortestPath: GridNode[], 
    pathFound: boolean
  ) => {
    console.log('Animating algorithm. Visited nodes:', visitedNodesInOrder.length, 'Path nodes:', shortestPath.length);
    
    // Calculate delay based on speed (1-100 -> 200ms-10ms)
    const baseDelay = Math.max(10, 210 - (speed * 2));
    
    // If no nodes were visited, just finish
    if (visitedNodesInOrder.length === 0) {
      console.log('No nodes to animate');
      animatePath(shortestPath, pathFound);
      return;
    }
    
    // Animate visited nodes
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        console.log('Animating visited node:', node.row, node.col);
        
        if (!node.isStart && !node.isEnd) {
          setGrid(prev => {
            const newGrid = [...prev];
            newGrid[node.row][node.col] = { ...newGrid[node.row][node.col], isVisited: true };
            return newGrid;
          });
        }
        
        // If this is the last visited node, start animating the path
        if (i === visitedNodesInOrder.length - 1) {
          setTimeout(() => animatePath(shortestPath, pathFound), baseDelay);
        }
      }, baseDelay * i);
    }
  }, [speed]);

  const animatePath = useCallback((shortestPath: GridNode[], pathFound: boolean) => {
    console.log('Animating path. Path found:', pathFound, 'Path length:', shortestPath.length);
    
    const pathDelay = 50; // Fixed fast delay for path animation
    
    if (shortestPath.length === 0 || !pathFound) {
      console.log('No path to animate or path not found');
      setIsRunning(false);
      setIsFinished(true);
      if (!pathFound) {
        alert('No path found!');
      }
      return;
    }
    
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        console.log('Animating path node:', node.row, node.col);
        
        if (!node.isStart && !node.isEnd) {
          setGrid(prev => {
            const newGrid = [...prev];
            newGrid[node.row][node.col] = { ...newGrid[node.row][node.col], isPath: true };
            return newGrid;
          });
        }
        
        // If this is the last path node, finish the algorithm
        if (i === shortestPath.length - 1) {
          setTimeout(() => {
            console.log('Algorithm animation completed');
            setIsRunning(false);
            setIsFinished(true);
          }, pathDelay);
        }
      }, pathDelay * i);
    }
  }, []);

  const getSpeedLabel = (speed: number) => {
    if (speed <= 25) return 'Slow';
    if (speed <= 75) return 'Medium';
    return 'Fast';
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Pathfinding Visualizer</h1>
        <p className={styles.subtitle}>
          Visualize popular pathfinding algorithms like Dijkstra, A*, BFS, and DFS in action
        </p>
      </header>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Algorithm</label>
          <select
            className={styles.algorithmSelect}
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value as Algorithm)}
            disabled={isRunning}
          >
            <option value={Algorithm.DIJKSTRA}>Dijkstra's</option>
            <option value={Algorithm.A_STAR}>A* Search</option>
            <option value={Algorithm.BFS}>Breadth-First Search</option>
            <option value={Algorithm.DFS}>Depth-First Search</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Speed</label>
          <div className={styles.speedControl}>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className={styles.speedSlider}
              disabled={isRunning}
            />
            <span className={styles.speedValue}>{getSpeedLabel(speed)}</span>
          </div>
        </div>



        <div className={styles.buttonGroup}>
          <button
            onClick={handleSetStartNode}
            disabled={isRunning}
            className={placingMode === 'start' ? 'active' : 'secondary'}
          >
            Set Start
          </button>
          <button
            onClick={handleSetEndNode}
            disabled={isRunning}
            className={placingMode === 'end' ? 'active' : 'secondary'}
          >
            Set End
          </button>
        </div>

        <div className={styles.buttonGroup}>
          <button
            onClick={handleRunAlgorithm}
            disabled={isRunning || !startNode || !endNode}
          >
            {isRunning ? 'Running...' : 'Run Algorithm'}
          </button>
          <button
            onClick={handleClearPath}
            disabled={isRunning}
            className="secondary"
          >
            Clear Path
          </button>
          <button
            onClick={handleGenerateMaze}
            disabled={isRunning}
            className="secondary"
          >
            Random Walls
          </button>
          <button
            onClick={handleReset}
            disabled={isRunning}
            className="secondary"
          >
            Reset
          </button>
        </div>
      </div>

      <div className={styles.gridContainer}>
        <Grid
          grid={grid}
          onNodeClick={handleNodeClick}
          onNodeMouseDown={handleMouseDown}
          onNodeMouseEnter={handleMouseEnter}
          onNodeMouseUp={handleMouseUp}
          isRunning={isRunning}
        />
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.start}`}></div>
          <span>Start Node</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.end}`}></div>
          <span>End Node</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.wall}`}></div>
          <span>Wall</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.visited}`}></div>
          <span>Visited</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.path}`}></div>
          <span>Shortest Path</span>
        </div>
      </div>

      <div className={styles.instructions}>
        <h3 className={styles.instructionsTitle}>How to Use</h3>
        <p className={styles.instructionsText}>
          1. Click "Set Start" and then click on the grid to place the start node<br/>
          2. Click "Set End" and then click on the grid to place the end node<br/>
          3. <strong>Click and drag to draw walls</strong> - first click determines if you're adding or removing walls<br/>
          4. Select an algorithm and adjust the speed<br/>
          5. Click "Run Algorithm" to visualize the pathfinding process
        </p>
      </div>
    </div>
  );
};

export default App; 