import { GridNode } from '../types';
import { AlgorithmResult } from './types';
import { getUnvisitedNeighbors, getNodesInShortestPathOrder } from './utils';

/**
 * Depth-First Search (DFS) Algorithm Implementation
 * 
 * Key concepts to implement:
 * 1. Explores as far as possible along each branch before backtracking
 * 2. Uses a stack (LIFO - Last In, First Out)
 * 3. Does NOT guarantee shortest path
 * 4. Good for exploring all possible paths or maze solving
 * 
 * DFS can be implemented iteratively (with explicit stack) or recursively.
 * For visualization purposes, iterative is often better as you can control
 * the order of visited nodes more easily.
 */

export const dfs = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode
): AlgorithmResult => {
  const visitedNodesInOrder: GridNode[] = [];
  
  // Initialize all nodes - reset visited status and previous node references
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const node = grid[row][col];
      node.isVisited = false;
      node.previousNode = null;
    }
  }
  
  // Use a stack for DFS (LIFO - Last In, First Out)
  const stack: GridNode[] = [startNode];
  
  while (stack.length > 0) {
    // Pop the top node from the stack
    const currentNode = stack.pop()!;
    
    // If already visited, continue to next iteration
    if (currentNode.isVisited) {
      continue;
    }
    
    // If we encounter a wall, skip it
    if (currentNode.isWall) {
      continue;
    }
    
    // Mark the current node as visited
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    
    // If we reached the finish node, we're done!
    if (currentNode === finishNode) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      return {
        visitedNodesInOrder,
        nodesInShortestPathOrder,
        isPathFound: true
      };
    }
    
    // Get unvisited neighbors and add them to the stack
    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      // Set the previous node for path reconstruction
      if (!neighbor.previousNode) {
        neighbor.previousNode = currentNode;
      }
      // Push neighbor to stack (will be processed in LIFO order)
      stack.push(neighbor);
    }
  }
  
  // If we get here, no path was found
  return {
    visitedNodesInOrder,
    nodesInShortestPathOrder: [],
    isPathFound: false
  };
}; 