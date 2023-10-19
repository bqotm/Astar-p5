class PriorityQueue {
    constructor() {
        this.elements = new Array();
    }
    //PRIORITY IS THE f function f=g+h
    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.elements.shift().element;
    }

    isEmpty() {
        return this.elements.length === 0;
    }

    containsWithLowPriority(element, priority) {
        return this.elements.some(item => {
            return item.element === element && item.priority < priority
        });
    }
}

function contains(arr, element) {
    return arr.some(item => item === element)
}

function manhattanDistance(i, j) {
    return Math.abs(i - cols) + Math.abs(j - rows);
}

function _f(cell) {
    return cell.g + manhattanDistance(cell.i, cell.j);
}



var rows, cols;
rows = cols = 40

var grid = new Array(cols);

var cellWidth;
var cellHeight;

var openList = new PriorityQueue()
var closedList = []
var path = []
function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.isWall = false;
    this.neighbours = [];
    this.parent;
    this.g;//cost of going to cell i j
    this.h;//heuristic. manhattan here
    if (random() < 0.4) {
        this.isWall = true
    }
    if (this.isWall) {
        fill(0);
    } else {
        fill(255);
    }
    rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight)

    this.addNeighbours = function (grid) {
        let x = this.i;
        let y = this.j;

        for (let xOffset = -1; xOffset <= 1; xOffset++) {
            for (let yOffset = -1; yOffset <= 1; yOffset++) {
                if (xOffset === 0 && yOffset === 0) continue; // Skip the current cell
                let neighborX = x + xOffset;
                let neighborY = y + yOffset;
                // Check if the neighbor coordinates are within the valid bounds of the grid
                if (neighborX >= 0 && neighborX < grid.length && neighborY >= 0 && neighborY < grid[0].length) {
                    if (grid[neighborX][neighborY].isWall) {
                        continue; // Skip walls
                    }
                    this.neighbours.push(grid[neighborX][neighborY]);
                }
            }
        }
    }
}

function setup() {
    createCanvas(300, 300)
    cellWidth = width / cols;
    cellHeight = height / rows;

    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows)
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j)
        }
    }

    var START = grid[0][0]
    START.g = 0;
    START.isWall = true;
    var END = grid[cols - 1][rows - 1]
    openList.enqueue(START, _f(START))
    console.log(START)
    console.log(openList.elements)
}

function draw() {

    if (openList.isEmpty()) {
        window.alert("there is no path")
        noLoop();
        return;
    }
    let current = openList.dequeue();
    current.addNeighbours(grid)
    let i = current.i;
    let j = current.j;
    fill(0, 255, 0)
    rect(i * cellWidth, j * cellWidth, cellWidth, cellHeight)
    closedList.push(current)
    if (current.i === cols - 1 && current.j === rows - 1) {
        path = [];
        let temp = current;
        while (temp) {
            let i = temp.i;
            let j = temp.j;
            fill(0, 0, 255)
            rect(i * cellWidth, j * cellWidth, cellWidth, cellHeight)
            path.unshift(temp);
            temp = temp.parent; // Assuming you have a "parent" property in your nodes
        }
        noLoop();
        return;
    }
    for (let neighbour of current.neighbours) {
        console.log(neighbour)
        neighbour.g = current.g + 1 // 1 = cost of going to a neighbour, be it adjacent or diagonal
        let f = _f(neighbour);
        if (openList.containsWithLowPriority(neighbour, f))// skip if it's already there with low f
            continue;
        if (contains(closedList, neighbour))//skip if in closedList(already visited) [TEST SHOULD MOVE UP]
            continue;
        neighbour.parent = current
        openList.enqueue(neighbour, f)
    }

}