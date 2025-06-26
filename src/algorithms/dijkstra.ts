import { GridNode } from '../types';
import { AlgorithmResult } from './types';
import { 
  getUnvisitedNeighbors, 
  getNodesInShortestPathOrder, 
  sortNodesByDistance 
} from './utils';

/**
 * Dijkstra's Algorithm Implementation
 * 
 * Key concepts to implement:
 * 1. Initialize all nodes with distance = Infinity, except start node (distance = 0)
 * 2. Keep track of unvisited nodes
 * 3. Always visit the unvisited node with the smallest distance
 * 4. Update distances to neighbors
 * 5. Mark current node as visited
 * 6. Repeat until you reach the finish node or no more unvisited nodes
 * 
 * Dijkstra guarantees the shortest path for weighted graphs.
 * Since our grid has uniform weights (1), it will find the shortest path.
 */

export const dijkstra = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode
): AlgorithmResult => {
  // TODO: Your implementation here!
  // 
  // Hints:
  // 1. Create a copy of all nodes to track unvisited ones
  // 2. Set startNode.distance = 0
  // 3. Create an array to track visited nodes in order
  // 4. While there are unvisited nodes:
  //    - Get the unvisited node with minimum distance
  //    - If distance is Infinity, you're trapped - break
  //    - Mark as visited and add to visitedNodesInOrder
  //    - If it's the finish node, you're done!
  //    - Update distances to all unvisited neighbors
  // 5. Use getNodesInShortestPathOrder to reconstruct the path
  
  const visitedNodesInOrder: GridNode[] = [];
  const nodesInShortestPathOrder: GridNode[] = [];
  const isPathFound = false;

  return {
    visitedNodesInOrder,
    nodesInShortestPathOrder,
    isPathFound
  };
}; 