class Node {
  constructor(x, y, traversable) {
    this.x = x;
    this.y = y;
    this.traversable = traversable;
    this.g = 0; // Cost from start node to current node
    this.h = 0; // Heuristic cost from current node to destination node
    this.f = 0; // Total cost (g + h)
    this.parent = null; // Parent node
  }
}

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function astar(start, destination, grid) {
  const openSet = [start];
  const closedSet = [];

  while (openSet.length > 0) {
    // Find the node with the lowest f cost in the open set
    let lowestFIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestFIndex].f) {
        lowestFIndex = i;
      }
    }

    const current = openSet[lowestFIndex];

    // Check if the current node is the destination
    if (current === destination) {
      const path = [];
      let temp = current;
      while (temp !== null) {
        path.push(temp);
        temp = temp.parent;
      }
      return path.reverse();
    }

    // Move current node from open set to closed set
    openSet.splice(lowestFIndex, 1);
    closedSet.push(current);

    // Get the neighboring nodes
    const neighbors = getNeighbors(current, grid);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      // Skip if the neighbor is already in the closed set or not traversable
      if (closedSet.includes(neighbor) || !neighbor.traversable) {
        continue;
      }

      // Calculate the tentative g score
      const tentativeG = current.g + 1;

      // Check if the neighbor is already in the open set
      const inOpenSet = openSet.includes(neighbor);

      if (!inOpenSet || tentativeG < neighbor.g) {
        // Update the neighbor's properties
        neighbor.g = tentativeG;
        neighbor.h = heuristic(neighbor, destination);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = current;

        if (!inOpenSet) {
          openSet.push(neighbor);
        }
      }
    }
  }

  // No path found
  return null;
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { x, y } = node;

  // Check top neighbor
  if (y > 0) {
    neighbors.push(grid[y - 1][x]);
  }

  // Check right neighbor
  if (x < grid[0].length - 1) {
    neighbors.push(grid[y][x + 1]);
  }

  // Check bottom neighbor
  if (y < grid.length - 1) {
    neighbors.push(grid[y + 1][x]);
  }

  // Check left neighbor
  if (x > 0) {
    neighbors.push(grid[y][x - 1]);
  }

  return neighbors;
}

function heuristic(node, destination) {
  // Manhattan distance heuristic
  return Math.abs(node.x - destination.x) + Math.abs(node.y - destination.y);
}

let grid = []
let startNode = new Node(-1, -1, true);
let destinationNode = new Node(-1, -1, true);
let pathcell = [];
function createGrid() {
  grid = [];
  pathcell = [];
  let x1 = Math.floor(Math.random() * 20);
  let y1 = Math.floor(Math.random() * 20);
  let x2 = Math.floor(Math.random() * 20);
  let y2 = Math.floor(Math.random() * 20);

  for (let i = 0; i < 20; i++) {
    let curRow = [];
    for (let j = 0; j < 20; j++) {
      if (i == y1 && j == x1) {
        curRow.push(new Node(j, i, true))
      } else if (i == y2 && j == x2) {
        curRow.push(new Node(j, i, true));
      } else {
        let tmp = Math.floor(Math.random() * 3);
        if (tmp == 0) {
          curRow.push(new Node(j, i, false));
        } else {
          curRow.push(new Node(j, i, true));
        }
      }
    }
    grid.push(curRow);
  }
  startNode = grid[y1][x1];
  destinationNode = grid[y2][x2];
  displayGrid();
}

function checkPath(xx, yy) {
  for (let i = 0; i < pathcell.length; i++) {
    if (pathcell[i].x == xx && pathcell[i].y == yy) {
      return true;
    }
  }
  return false;
}

function displayGrid() {
  let gridContainer = document.getElementById("gridContainer");
  gridContainer.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    let gridRow = document.createElement("div");
    gridRow.classList.add("gridRow");
    for (let j = 0; j < 20; j++) {
      let cell = grid[i][j];
      let newCell = document.createElement("div");
      newCell.classList.add("cell");
      if (checkPath(j, i)) {
        //console.log(j + " " + i);
        newCell.classList.add("yellow");
      } else if (j == startNode.x && i == startNode.y) {
        newCell.classList.add("red");
      } else if (j == destinationNode.x && i == destinationNode.y) {
        newCell.classList.add("green");
      }
      else if (cell.traversable == true) {
        newCell.classList.add("white");
      } else {
        newCell.classList.add("black");
      }
      gridRow.appendChild(newCell);
    }
    gridContainer.appendChild(gridRow);
  }
}


function start() {
  if (grid.length == 0) {
    alert("Please create grid first!!!!");
    return;
  }

  const path = astar(startNode, destinationNode, grid);
  pathcell = [];
  if (path === null) {
    alert("Cant find the path");
  } else {
    console.log(path);
    for (let i = 0; i < path.length; i++) {
      if (path[i].x == startNode.x && path[i].y == startNode.y) continue;
      if (path[i].x == destinationNode.x && path[i].y == destinationNode.y) continue;
      pathcell.push(new Position(path[i].x, path[i].y));
    }
  }
  displayGrid();
}


