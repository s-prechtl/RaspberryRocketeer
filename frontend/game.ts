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

    obstacles.forEach((obstacle) => obstacle.resetPosition(false));
}

function draw() {
    background(backgroundImage)
    raspberry.update();
    raspberry.draw();

    obstacles.forEach((obstacle) => {
        obstacle.update();
        obstacle.draw();

        if(obstacle.position.x < -obstacleWidth) {
            obstacle.resetPosition(true);
        }


    });
}

function keyPressed() {
    if (key == "K" || key == "k") {
        raspberry.boost();
        console.log("BOOOST")
    }
}