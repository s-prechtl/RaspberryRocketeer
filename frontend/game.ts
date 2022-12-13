const pipeImagePath: string = "resources/raspberry-low-res.png";
const obstacleWidth: number = 42;
let obstacleOffset: number;
const backgroundImagePath: string = "resources/raspberry-low-res.png";
let backgroundImage: any;
const raspberryImagePath: string = "resources/raspberry-rocket.png";

let obstacles: Obstacle[] = [];
let raspberry: Raspberry;

function setup() {
    backgroundImage = loadImage(backgroundImagePath);

    createCanvas(1000, 1000);
    obstacleOffset = width / 3;

    raspberry = new Raspberry();
    raspberry.image = raspberryImagePath;

    obstacles.push(new Obstacle(
        new Position(width, 0),
        obstacleWidth,
        height,
        pipeImagePath,
    ));
    obstacles.push(new Obstacle(
        new Position(width + obstacleOffset, 0),
        obstacleWidth,
        height,
        pipeImagePath,
    ));
    obstacles.push(new Obstacle(
        new Position(width + obstacleOffset * 2, 0),
        obstacleWidth,
        height,
        pipeImagePath,
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

        // console.log(obstacle.position.x);
        if(obstacle.position.x <= -obstacleWidth) {
            obstacle.resetPosition(true);
        }
    });
}

//
// function keyPressed() {
//
// }