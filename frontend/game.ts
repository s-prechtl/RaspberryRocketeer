let obstacle: Obstacle;
let raspberry: Raspberry;

function setup() {
    createCanvas(1000, 1000);

    raspberry = new Raspberry();

    obstacle = new Obstacle(
        new Pipe(new Position(width, 0), 32, height),
        new Pipe(new Position(width, height - (height / 3)), 32, height),
    );
}

function draw() {
    background(187)
    raspberry.draw();
    raspberry.update();
    obstacle.draw();
    obstacle.update();

    if (obstacle.position.x < 0) {
        obstacle.resetPosition();
    }
}

//
// function keyPressed() {
//
// }