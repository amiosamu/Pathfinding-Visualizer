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

// Extended node interface for A* specific properties
interface AStarNode extends GridNode {
  fScore: number;
  hScore: number;
}

export const aStar = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode
): AlgorithmResult => {
  const visitedNodesInOrder: GridNode[] = [];
  
  // Initialize all nodes with A* specific properties
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const node = grid[row][col] as AStarNode;
      node.distance = Infinity; // g(n) - actual distance from start
      node.hScore = manhattanDistance(node, finishNode); // h(n) - heuristic to goal
      node.fScore = Infinity; // f(n) = g(n) + h(n)
      node.isVisited = false;
      node.previousNode = null;
    }
  }
  
  // Initialize start node
  const startNodeAStar = startNode as AStarNode;
  startNodeAStar.distance = 0; // g(start) = 0
  startNodeAStar.fScore = startNodeAStar.hScore; // f(start) = g(start) + h(start)
  
  // Open set: nodes to be evaluated (priority queue ordered by f score)
  const openSet: AStarNode[] = [startNodeAStar];
  
  while (openSet.length > 0) {
    // Sort by f score and get the node with lowest f value
    openSet.sort((a, b) => a.fScore - b.fScore);
    const currentNode = openSet.shift()!;
    
    // If we encounter a wall, skip it
    if (currentNode.isWall) {
      continue;
    }
    
    // Move current node from open set to closed set (mark as visited)
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
    
    // Examine all neighbors
    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      const neighborAStar = neighbor as AStarNode;
      
      // Skip if already visited (in closed set)
      if (neighborAStar.isVisited) {
        continue;
      }
      
      // Calculate tentative g score (distance from start through current node)
      const tentativeGScore = currentNode.distance + 1; // Cost of 1 for each move
      
      // Check if this path to neighbor is better than any previous one
      if (tentativeGScore < neighborAStar.distance) {
        // This path is the best until now, record it
        neighborAStar.previousNode = currentNode;
        neighborAStar.distance = tentativeGScore; // g(neighbor)
        neighborAStar.fScore = neighborAStar.distance + neighborAStar.hScore; // f(neighbor) = g(neighbor) + h(neighbor)
        
        // Add neighbor to open set if not already there
        if (!openSet.includes(neighborAStar)) {
          openSet.push(neighborAStar);
        }
      }
    }
  }
  
  // If we get here, no path was found
  return {
    visitedNodesInOrder,
    nodesInShortestPathOrder: [],
    isPathFound: false
  };
}; 