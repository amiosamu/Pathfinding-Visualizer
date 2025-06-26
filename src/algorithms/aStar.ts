import { GridNode } from '../types';
import { AlgorithmResult } from './types';
import { 
  getUnvisitedNeighbors, 
  getNodesInShortestPathOrder, 
  manhattanDistance 
} from './utils';

/**
 * A* (A-Star) Algorithm Implementation
 * 
 * Key concepts to implement:
 * 1. Like Dijkstra, but uses a heuristic function to guide the search
 * 2. f(n) = g(n) + h(n)
 *    - g(n) = actual distance from start to node n
 *    - h(n) = heuristic estimate from node n to goal
 *    - f(n) = estimated total cost of path through node n
 * 3. Always expand the node with lowest f(n) value
 * 4. Use Manhattan distance as heuristic for grid-based pathfinding
 * 
 * A* is generally faster than Dijkstra because the heuristic guides it
 * toward the goal, but it still guarantees the shortest path.
 */

export const aStar = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode
): AlgorithmResult => {
  // TODO: Your implementation here!
  // 
  // Hints:
  // 1. You'll need to track f, g, and h values for each node
  // 2. Use a priority queue (or array sorted by f value) for open set
  // 3. Keep a closed set of already evaluated nodes
  // 4. Initialize start node with g=0, h=heuristic to goal, f=g+h
  // 5. While open set is not empty:
  //    - Get node with lowest f value
  //    - If it's the goal, reconstruct path
  //    - Move current from open to closed set
  //    - For each neighbor:
  //      - Skip if in closed set or is a wall
  //      - Calculate tentative g score
  //      - If neighbor not in open set or new g score is better:
  //        - Update neighbor's g, h, f values and previous node
  //        - Add to open set if not already there
  // 6. Use manhattanDistance as your heuristic function
  
  const visitedNodesInOrder: GridNode[] = [];
  const nodesInShortestPathOrder: GridNode[] = [];
  const isPathFound = false;

  return {
    visitedNodesInOrder,
    nodesInShortestPathOrder,
    isPathFound
  };
}; 