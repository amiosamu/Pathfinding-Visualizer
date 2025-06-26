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
  const visitedNodesInOrder: GridNode[] = [];
  
  // Initialize all nodes with distance = Infinity, except start node (distance = 0)
  const unvisitedNodes: GridNode[] = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const node = grid[row][col];
      node.distance = node === startNode ? 0 : Infinity;
      node.isVisited = false;
      node.previousNode = null;
      unvisitedNodes.push(node);
    }
  }
  
  while (unvisitedNodes.length > 0) {
    // Sort nodes by distance and get the closest unvisited node
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift()!;
    
    // If the closest node has distance = Infinity, we're trapped (no path exists)
    if (closestNode.distance === Infinity) {
      break;
    }
    
    // If we encounter a wall, skip it
    if (closestNode.isWall) {
      continue;
    }
    
    // Mark the current node as visited
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    // If we reached the finish node, we're done!
    if (closestNode === finishNode) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      return {
        visitedNodesInOrder,
        nodesInShortestPathOrder,
        isPathFound: true
      };
    }
    
    // Update distances to all unvisited neighbors
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      const newDistance = closestNode.distance + 1; // In our grid, each move has cost 1
      if (newDistance < neighbor.distance) {
        neighbor.distance = newDistance;
        neighbor.previousNode = closestNode;
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