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

    createCanvas(2000, 1000);
    obstacleOffset = width / 3;

    raspberry = new Raspberry();
    raspberry.image = raspberryImagePath;
    raspberry.showHitbox = true;

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

        checkObstacleReset(obstacle);
    });

    if (obstacles[0].collides(raspberry)) {
        obstacles[0].draw();
        console.log("SAMC")
    }
}

function checkObstacleReset(obstacle: Obstacle){
    if(obstacle.position.x < -obstacleWidth) {
        obstacle.resetPosition(true);
        obstacles.shift();
        obstacles.push(obstacle);
    }
}


function keyPressed() {
    if (key.toLowerCase() == "k") {
        raspberry.boost();
    }
}