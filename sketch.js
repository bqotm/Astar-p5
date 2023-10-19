var rows, cols;
rows = cols = 10

var grid = new Array(cols);

var cellWidth;
var cellHeight;

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.obstacle = false;
    this.neighbours = [];
    if(random()<0.5){
        this.wall=true
    }
    if (this.wall) {
        this.obstacle = true;
        fill(0);
    } else {
        fill(255);
    }
    rect(i * cellWidth, j * cellHeight, cellWidth*random(0.3, 1.1), cellHeight*random(0.3, 1.1))
}

function setup() {
    createCanvas(300, 300)
    cellWidth = width / cols;
    cellHeight = height / rows;
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows)
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j)
        }
    }
}

function draw() {
    let xpos = floor(mouseX / cellWidth);
    let ypos = floor(mouseY / cellHeight);

}