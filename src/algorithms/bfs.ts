import { GridNode } from '../types';
import { AlgorithmResult } from './types';
import { getUnvisitedNeighbors, getNodesInShortestPathOrder } from './utils';

/**
 * Breadth-First Search (BFS) Algorithm Implementation
 * 
 * Key concepts to implement:
 * 1. Explores nodes level by level (breadth-first)
 * 2. Uses a queue (FIFO - First In, First Out)
 * 3. Guarantees shortest path in unweighted graphs
 * 4. Visits all nodes at distance k before visiting nodes at distance k+1
 * 
 * BFS is excellent for finding the shortest path in terms of number of steps.
 * Since our grid is unweighted, BFS will find the optimal solution.
 */

export const bfs = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode
): AlgorithmResult => {
  console.log('Starting BFS from:', startNode.row, startNode.col, 'to:', finishNode.row, finishNode.col);
  
  const visitedNodesInOrder: GridNode[] = [];
  const queue: GridNode[] = [];
  
  // Initialize start node
  startNode.isVisited = true;
  startNode.distance = 0;
  startNode.previousNode = null;
  queue.push(startNode);

  let iterations = 0;
  const maxIterations = grid.length * grid[0].length; // Prevent infinite loops

  while (queue.length > 0 && iterations < maxIterations) {
    iterations++;
    const currentNode = queue.shift();
    
    // Handle undefined case
    if (!currentNode) {
      console.log('Current node is undefined, breaking');
      break;
    }
    
    console.log('Processing node:', currentNode.row, currentNode.col, 'Queue size:', queue.length);
    
    // Add to visited nodes for visualization (except start node)
    if (currentNode !== startNode) {
      visitedNodesInOrder.push(currentNode);
    }
    
    // Found the target!
    if (currentNode === finishNode) {
      console.log('Found target! Reconstructing path...');
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      console.log('Path length:', nodesInShortestPathOrder.length);
      return { 
        visitedNodesInOrder, 
        nodesInShortestPathOrder, 
        isPathFound: true 
      };
    }
    
    // Process all unvisited neighbors
    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    console.log('Found', neighbors.length, 'unvisited neighbors');
    
    for (const neighbor of neighbors) {
      // Check if neighbor is already in queue to prevent duplicates
      if (!neighbor.isVisited) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        neighbor.distance = currentNode.distance + 1;
        queue.push(neighbor);
      }
    }
  }
  
  if (iterations >= maxIterations) {
    console.log('Max iterations reached, possible infinite loop');
  }
  
  console.log('BFS completed. Visited nodes:', visitedNodesInOrder.length);
  
  // No path found
  return {
    visitedNodesInOrder,
    nodesInShortestPathOrder: [],
    isPathFound: false
  };
}; 