import { GridNode } from '../types';

// Get all valid neighbors of a node (up, down, left, right)
export const getUnvisitedNeighbors = (node: GridNode, grid: GridNode[][]): GridNode[] => {
  const neighbors: GridNode[] = [];
  const { col, row } = node;
  
  // Up
  if (row > 0) neighbors.push(grid[row - 1][col]);
  // Down  
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  // Left
  if (col > 0) neighbors.push(grid[row][col - 1]);
  // Right
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
};

// Get all neighbors (including visited ones) - useful for path reconstruction
export const getAllNeighbors = (node: GridNode, grid: GridNode[][]): GridNode[] => {
  const neighbors: GridNode[] = [];
  const { col, row } = node;
  
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
  return neighbors.filter(neighbor => !neighbor.isWall);
};

// Calculate Manhattan distance (for A* heuristic)
export const manhattanDistance = (nodeA: GridNode, nodeB: GridNode): number => {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
};

// Calculate Euclidean distance
export const euclideanDistance = (nodeA: GridNode, nodeB: GridNode): number => {
  const dx = nodeA.row - nodeB.row;
  const dy = nodeA.col - nodeB.col;
  return Math.sqrt(dx * dx + dy * dy);
};

// Reconstruct the shortest path from finish node back to start
export const getNodesInShortestPathOrder = (finishNode: GridNode): GridNode[] => {
  const nodesInShortestPathOrder: GridNode[] = [];
  let currentNode: GridNode | null = finishNode;
  
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  
  return nodesInShortestPathOrder;
};

// Sort nodes by distance (useful for Dijkstra)
export const sortNodesByDistance = (unvisitedNodes: GridNode[]): void => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

// Get the closest unvisited node
export const getClosestNode = (unvisitedNodes: GridNode[]): GridNode | null => {
  sortNodesByDistance(unvisitedNodes);
  return unvisitedNodes.shift() || null;
}; 