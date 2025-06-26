// Export all algorithm implementations
export { dijkstra } from './dijkstra';
export { aStar } from './aStar';
export { bfs } from './bfs';
export { dfs } from './dfs';

// Export types and utilities
export * from './types';
export * from './utils';

// Algorithm map for easy access
import { dijkstra } from './dijkstra';
import { aStar } from './aStar';
import { bfs } from './bfs';
import { dfs } from './dfs';
import { Algorithm } from '../types';
import { AlgorithmFunction } from './types';

export const algorithmMap: Record<Algorithm, AlgorithmFunction> = {
  [Algorithm.DIJKSTRA]: dijkstra,
  [Algorithm.A_STAR]: aStar,
  [Algorithm.BFS]: bfs,
  [Algorithm.DFS]: dfs,
};

// Helper function to get algorithm by name
export const getAlgorithm = (algorithmType: Algorithm): AlgorithmFunction => {
  return algorithmMap[algorithmType];
}; 