const pipeImagePath: string = "resources/raspberry-low-res.png";
const obstacleWidth: number = 88;
let obstacleOffset: number;
const backgroundImagePath: string = "resources/raspberry-low-res.png";
let backgroundImage: any;
const raspberryImagePath: string = "resources/raspberry-rocket.png";

let obstacles: Obstacle[] = [];
let raspberry: Raspberry;
let paused: boolean;

function setup() {
    backgroundImage = loadImage(backgroundImagePath);

    createCanvas(2000, 1000);
    obstacleOffset = width / 3;

    setupGame();
}

function draw() {
    background(backgroundImage)
    if (!paused) {
        raspberry.update();
    }
    raspberry.draw();

    obstacles.forEach((obstacle) => {
        if (!paused) {
            obstacle.update();
            checkObstacleReset(obstacle);
        }

        obstacle.draw();
    });
    if (!paused) {
        if (obstacles[0].collides(raspberry)) {
            setupGame();
        }
        obstacles[0].draw();
    }
}

function setupGame() {
    paused = true;

    raspberry = new Raspberry();
    raspberry.image = raspberryImagePath;

    obstacles = [];
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

function checkObstacleReset(obstacle: Obstacle) {
    if (obstacle.position.x < -obstacleWidth) {
        obstacle.resetPosition(true);
        obstacles.shift();
        obstacles.push(obstacle);
    }
}


function keyPressed() {
    if (key.toLowerCase() == "k") {
        raspberry.boost();
    }
    if (key == "Escape") {
        paused = !paused;
    } else if (paused) {
        paused = false;
    }
}