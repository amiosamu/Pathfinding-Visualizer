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
  // TODO: Your implementation here!
  // 
  // Hints:
  // 1. Use a stack to store nodes to visit (array with push/pop works)
  // 2. Start by adding the start node to the stack
  // 3. While stack is not empty:
  //    - Pop the top node from stack
  //    - If already visited, continue to next iteration
  //    - Mark as visited and add to visitedNodesInOrder
  //    - If it's the finish node, you're done!
  //    - For each unvisited neighbor:
  //      - Set its previousNode to current node
  //      - Push to stack
  // 4. Use getNodesInShortestPathOrder to reconstruct path
  //
  // Alternative: You could implement this recursively, but iterative
  // gives you more control over the visualization order.
  //
  // Remember: DFS uses a STACK (LIFO), BFS uses a QUEUE (FIFO)
  
  const visitedNodesInOrder: GridNode[] = [];
  const nodesInShortestPathOrder: GridNode[] = [];
  const isPathFound = false;

  return {
    visitedNodesInOrder,
    nodesInShortestPathOrder,
    isPathFound
  };
}; 