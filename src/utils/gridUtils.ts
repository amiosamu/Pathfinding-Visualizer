import { GridNode, GridDimensions } from '../types';

export const GRID_DIMENSIONS: GridDimensions = {
  rows: 25,
  cols: 50
};

export const createNode = (row: number, col: number): GridNode => ({
  row,
  col,
  isStart: false,
  isEnd: false,
  isWall: false,
  isVisited: false,
  isPath: false,
  distance: Infinity,
  previousNode: null,
});

export const createGrid = (dimensions: GridDimensions = GRID_DIMENSIONS): GridNode[][] => {
  const grid: GridNode[][] = [];
  for (let row = 0; row < dimensions.rows; row++) {
    const currentRow: GridNode[] = [];
    for (let col = 0; col < dimensions.cols; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const getNewGridWithWallToggled = (
  grid: GridNode[][],
  row: number,
  col: number
): GridNode[][] => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (!node.isStart && !node.isEnd) {
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};

export const clearPath = (grid: GridNode[][]): GridNode[][] => {
  return grid.map(row =>
    row.map(node => ({
      ...node,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      previousNode: null,
    }))
  );
};

// Create a deep copy of the grid for algorithm processing
export const createGridCopy = (grid: GridNode[][]): GridNode[][] => {
  return grid.map(row =>
    row.map(node => ({
      ...node,
      distance: Infinity,
      previousNode: null,
      isVisited: false,
      isPath: false,
    }))
  );
};

export const clearWalls = (grid: GridNode[][]): GridNode[][] => {
  return grid.map(row =>
    row.map(node => ({
      ...node,
      isWall: false,
    }))
  );
};

export const resetGrid = (grid: GridNode[][]): GridNode[][] => {
  return grid.map(row =>
    row.map(node => ({
      ...node,
      isStart: false,
      isEnd: false,
      isWall: false,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      previousNode: null,
    }))
  );
};

export const generateRandomMaze = (grid: GridNode[][]): GridNode[][] => {
  const newGrid = clearWalls(clearPath(grid));
  
  return newGrid.map(row =>
    row.map(node => {
      if (node.isStart || node.isEnd) {
        return { ...node, isWall: false };
      }
      return {
        ...node,
        isWall: Math.random() < 0.3, // 30% chance of being a wall
      };
    })
  );
};

export const updateNodeInGrid = (
  grid: GridNode[][],
  row: number,
  col: number,
  updates: Partial<GridNode>
): GridNode[][] => {
  const newGrid = grid.slice();
  newGrid[row][col] = {
    ...newGrid[row][col],
    ...updates,
  };
  return newGrid;
}; 