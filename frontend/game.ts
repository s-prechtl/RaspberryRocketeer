const pipeImagePath: string = "resources/raspberry-low-res.png";
const obstacleWidth: number = 42;
let obstacleOffset: number;

const backgroundImagePath: string = "resources/raspberry-low-res.png";
let backgroundImage: any;

let obstacles: Obstacle[] = [];
let raspberry: Raspberry;

function setup() {
    backgroundImage = loadImage(backgroundImagePath);

    createCanvas(1000, 1000);
    obstacleOffset = width / 4;

    raspberry = new Raspberry();

    obstacles.push(new Obstacle(
        new Pipe(width, obstacleWidth, height),
        new Pipe(width, obstacleWidth, height),
        pipeImagePath
    ));
    obstacles.push(new Obstacle(
        new Pipe(width + obstacleOffset, obstacleWidth, height),
        new Pipe(width + obstacleOffset, obstacleWidth, height),
        pipeImagePath
    ));
    obstacles.push(new Obstacle(
        new Pipe(width + obstacleOffset * 2, obstacleWidth, height),
        new Pipe(width + obstacleOffset * 2, obstacleWidth, height),
        pipeImagePath
    ));
    obstacles.push(new Obstacle(
        new Pipe(width + obstacleOffset * 3, obstacleWidth, height),
        new Pipe(width + obstacleOffset * 3, obstacleWidth, height),
        pipeImagePath
    ));

    obstacles.forEach((obstacle) => obstacle.resetPosition(false));
}

function draw() {
    background(backgroundImage)
    raspberry.draw();
    raspberry.update();

    obstacles.forEach((obstacle) => {
        obstacle.draw();
        obstacle.update();

        if(obstacle.position.x < -obstacleWidth) {
            obstacle.resetPosition(true);
        }
    });
}

//
// function keyPressed() {
//
// }