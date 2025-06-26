import React from 'react';
import { GridNode } from '../types';
import styles from './Grid.module.css';

interface GridProps {
  grid: GridNode[][];
  onNodeClick: (row: number, col: number) => void;
  onNodeMouseDown: (row: number, col: number) => void;
  onNodeMouseEnter: (row: number, col: number) => void;
  onNodeMouseUp: () => void;
  isRunning: boolean;
}

interface NodeProps {
  node: GridNode;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
  onClick: (row: number, col: number) => void;
  isRunning: boolean;
}

const Node: React.FC<NodeProps> = React.memo(({
  node,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onClick,
  isRunning,
}) => {
  const getNodeClassName = () => {
    const classes = [styles.node];
    
    if (node.isStart) classes.push(styles.start);
    else if (node.isEnd) classes.push(styles.end);
    else if (node.isWall) classes.push(styles.wall);
    else if (node.isPath) classes.push(styles.path);
    else if (node.isVisited) classes.push(styles.visited);
    else classes.push(styles.empty);
    
    return classes.join(' ');
  };

  return (
    <div
      className={getNodeClassName()}
      onMouseDown={() => !isRunning && onMouseDown(node.row, node.col)}
      onMouseEnter={() => !isRunning && onMouseEnter(node.row, node.col)}
      onMouseUp={() => !isRunning && onMouseUp()}
      onClick={() => !isRunning && onClick(node.row, node.col)}
      role="button"
      tabIndex={0}
      aria-label={`Node at row ${node.row}, column ${node.col}`}
    />
  );
});

const Grid: React.FC<GridProps> = React.memo(({
  grid,
  onNodeClick,
  onNodeMouseDown,
  onNodeMouseEnter,
  onNodeMouseUp,
  isRunning,
}) => {
  return (
    <div className={styles.grid}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((node, nodeIndex) => (
            <Node
              key={`${rowIndex}-${nodeIndex}`}
              node={node}
              onMouseDown={onNodeMouseDown}
              onMouseEnter={onNodeMouseEnter}
              onMouseUp={onNodeMouseUp}
              onClick={onNodeClick}
              isRunning={isRunning}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

export default Grid; 