# Technical Specification: High-Performance Elastic Mesh Engine (WebGL + Fallback)

### 1. Objective
Develop a performant, interactive background mesh that deforms in real-time based on the proximity of "Mass" objects (DOM elements). The system must utilize **WebGL** for GPU-accelerated vertex manipulation, with a seamless **Canvas 2D** fallback for environments where WebGL is unavailable or disabled.

### 2. Core Constraints & Performance
* **Target:** Consistent 60 FPS across a minimum of 2,500 nodes (approx. 50x50 grid).
* **Memory Management:** Strictly avoid object allocation (GC pressure) inside the render loop. Use **TypedArrays** (`Float32Array`) for all vertex and physics data.
*   **Synchronization:** The mesh must react to external coordinates provided via an API (derived from HTML/CSS element `getBoundingClientRect` positions).
*   **Interaction:** Support both Mouse and Touch events (touchmove) for interactivity.

### 3. Configuration Schema
The engine must be entirely driven by a configuration object to allow for real-time adjustments. below is just reference actual configuration object might differ. use package that will handlee configuraiton and provide config panel on UI. usually UI demos have it.

```javascript
const MESH_CONFIG = {
  grid: { 
    columns: 60, 
    rows: 40, 
    lineWidth: 1.0, 
    color: [1.0, 1.0, 1.0, 0.2] // RGBA normalized (0.0 - 1.0)
  },
  physics: {
    baseRadiusMultiplier: 1.5, // Applied to Mass width/height
    magnitude: 0.75,           // Strength of repulsion/attraction
    springTension: 0.1,        // Hooke's Law: Stiffness of return
    friction: 0.85             // Dampening of movement
  },
  rendering: {
    useBezier: true,           // Required for Canvas 2D fallback
    antiAliasing: true
  }
};

```

### 4. Implementation Requirements - Canvas 2D Fallback
* Bézier Logic: Connect nodes using Quadratic Bézier Curves for smoothness.
* Control Points: The control point for the segment between Node A and Node B must be the displaced position of their shared midpoint.
* Drawing efficiency: should be performant.

### 5. Physics Engine logic
* Implement a Spring-Mass System where each node tracks velocity and currentPosition.
* Apply cumulative force from all active Masses in the scene to each node every frame.
* Use Hooke's Law for the elastic return: Force = -Stiffness * Displacement.

### 6. API Interface
* Use a Factory Function approach to ensure high performance through closure-scoped variables and to avoid this context overhead.
* The factory should return an immutable API object
* The API object should have the following methods:
  * init(containerElement): Detect WebGL support and initialize the appropriate renderer.
  * updateMasses(massArray): Accept an array of {x, y, radius} objects.
  * resize(): Handle window resize events without losing the mesh state.
  * dispose(): Clean up resources and remove event listeners.
* Add additional flag and method as required.
