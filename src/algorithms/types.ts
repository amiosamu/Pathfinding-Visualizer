import { GridNode } from '../types';

// Return type for algorithm functions
export interface AlgorithmResult {
  visitedNodesInOrder: GridNode[];
  nodesInShortestPathOrder: GridNode[];
  isPathFound: boolean;
}

// Algorithm function signature - all algorithms should follow this pattern
export type AlgorithmFunction = (
  grid: GridNode[][],
  startNode: GridNode,
  finishNode: GridNode
) => AlgorithmResult;

// For algorithms that need heuristic functions (like A*)
export type HeuristicFunction = (nodeA: GridNode, nodeB: GridNode) => number; 