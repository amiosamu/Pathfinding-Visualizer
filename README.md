# Pathfinding Visualizer

A interactive web application that visualizes popular pathfinding algorithms including Dijkstra's, A*, BFS, and DFS.

## Features

- **Four Pathfinding Algorithms**
  - Dijkstra's Algorithm - Guarantees shortest path
  - A* Search - Optimal pathfinding with heuristic guidance
  - Breadth-First Search (BFS) - Unweighted shortest path
  - Depth-First Search (DFS) - Explores deeply before backtracking

- **Interactive Grid**
  - Click and drag to draw walls
  - Set custom start and end points
  - Adjustable visualization speed
  - Real-time algorithm exploration

- **Visual Enhancements**
  - Gradient animation showing exploration progression
  - Distinctive start (arrow) and end (target) symbols
  - Smooth animations for visited nodes and final path
  - Performance optimized for smooth zooming

## Usage

1. **Set Start Point**: Click "Set Start" then click on the grid
2. **Set End Point**: Click "Set End" then click on the grid  
3. **Add Walls**: Click and drag on the grid to draw obstacles
4. **Choose Algorithm**: Select from the dropdown menu
5. **Adjust Speed**: Use the slider to control visualization speed
6. **Run**: Click "Run Algorithm" to start the visualization

## Controls

- **Random Walls**: Generate random obstacles
- **Clear Path**: Remove visited nodes and path
- **Reset**: Clear entire grid
- **Stop**: Halt running algorithm

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: CSS Modules with custom properties
- **Build Tool**: Vite
- **Algorithms**: Custom implementations with optimized data structures

## Installation

```bash
# Clone repository
git clone https://github.com/your-username/Pathfinding-Visualizer.git

# Install dependencies
cd Pathfinding-Visualizer
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Algorithm Details

**Dijkstra's Algorithm**: Explores uniformly in all directions, guarantees shortest path for weighted graphs.

**A* Search**: Uses Manhattan distance heuristic to guide search toward the goal, faster than Dijkstra while maintaining optimality.

**BFS**: Explores layer by layer, guarantees shortest path for unweighted graphs.

**DFS**: Explores as far as possible along each branch, does not guarantee shortest path but useful for maze solving.
