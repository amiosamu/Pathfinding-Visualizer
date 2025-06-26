export interface GridNode {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  previousNode: GridNode | null;
}

export enum NodeType {
  EMPTY = 'empty',
  START = 'start',
  END = 'end',
  WALL = 'wall',
  VISITED = 'visited',
  PATH = 'path'
}

export enum Algorithm {
  DIJKSTRA = 'dijkstra',
  A_STAR = 'a-star',
  BFS = 'bfs',
  DFS = 'dfs'
}

export interface VisualizerState {
  grid: GridNode[][];
  isRunning: boolean;
  isFinished: boolean;
  startNode: { row: number; col: number } | null;
  endNode: { row: number; col: number } | null;
  selectedAlgorithm: Algorithm;
  speed: number;
}

export interface GridDimensions {
  rows: number;
  cols: number;
} 