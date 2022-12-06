const obstacleWidth: number = 42;
let obstacleOffset: number;

let obstacles: Obstacle[] = [];
let raspberry: Raspberry;

function setup() {
    createCanvas(1000, 1000);
    obstacleOffset = width / 4;

    raspberry = new Raspberry();

    obstacles.push(new Obstacle(
        new Pipe(new Position(width, 0), obstacleWidth, height),
        new Pipe(new Position(width, height - (height / 3)), obstacleWidth, height),
    ));
    obstacles.push(new Obstacle(
        new Pipe(new Position(width + obstacleOffset, 0), obstacleWidth, height),
        new Pipe(new Position(width + obstacleOffset, height - (height / 3)), obstacleWidth, height)
    ));
    obstacles.push(new Obstacle(
        new Pipe(new Position(width + obstacleOffset * 2, 0), obstacleWidth, height),
        new Pipe(new Position(width + obstacleOffset * 2, height - (height / 3)), obstacleWidth, height)
    ));
    obstacles.push(new Obstacle(
        new Pipe(new Position(width + obstacleOffset * 3, 0), obstacleWidth, height),
        new Pipe(new Position(width + obstacleOffset * 3, height - (height / 3)), obstacleWidth, height)
    ));
}

function draw() {
    background(187)
    raspberry.draw();
    raspberry.update();

    obstacles.forEach((obstacle) => {
        obstacle.draw();
        obstacle.update();

        if(obstacle.position.x < -obstacleWidth) {
            obstacle.resetPosition();
        }
    });
}

//
// function keyPressed() {
//
// }