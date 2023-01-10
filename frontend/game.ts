// TODO: Refactor
const pipeImagePath: string = "resources/raspberry-low-res.png";
const obstacleWidth: number = 88;
let obstacleOffset: number;
const backgroundImagePath: string = "resources/raspberry-low-res.png";
let backgroundImage: any;
const raspberryImagePath: string = "resources/raspberry-rocket.png";

let obstacles: Obstacle[] = [];
let raspberry: Raspberry;
let paused: boolean;
let score: number;
let hasAlreadyScored: boolean;

function setup() {
    backgroundImage = loadImage(backgroundImagePath);
    createCanvas(2000, 1000);
    obstacleOffset = width / 3;
    
    textSize(150);
    textFont("resources/JetBrains-Mono-Regular.ttf");

    setupGame();
}

/**
 * Sets up everything needed for the game
 */
function setupGame() {
    paused = true;

    score = 0;
    raspberry = new Raspberry();
    raspberry.image = raspberryImagePath;

    // Create all obstacles
    // TODO: Loop
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

    // Randomize position of all Obstacles
    obstacles.forEach((obstacle) => obstacle.randomizeHeight());
}

// TODO: Split into funciton
function draw() {
    background(backgroundImage)
    if (!paused) {
        raspberry.update();
    }
    raspberry.draw();
    
    // Reset Obstacles Position
    obstacles.forEach((obstacle) => {
        if (!paused) {
            obstacle.update();
            checkObstacleReset(obstacle);
        }

        obstacle.draw();
    });

    // Check for collisions with pipes and set score
    if (!paused) {
        if (obstacles[0].collides(raspberry)) {
            setupGame();
        }
        checkRaspberryScore();
        obstacles[0].draw();
    }
    
    push();
    fill(200, 100, 60);
    text(score, width / 2, height / 10, width, height);
    pop();
}

/**
 * Check if obstacle positions should be reset and reset if so
 * @param obstacle obstacle to check
 */
function checkObstacleReset(obstacle: Obstacle) {
    if (obstacle.position.x < -obstacleWidth) {
        obstacle.resetPosition();
        obstacles.shift();
        obstacles.push(obstacle);
        hasAlreadyScored = false;
    }
}

/**
 * Check if the raspberry should score and set score
 */
function checkRaspberryScore() {
    if ((obstacles[0].position.x + obstacles[0].width / 2) < (raspberry.position.x + raspberry.width / 2)
        && !hasAlreadyScored) {
        score += 1;
        hasAlreadyScored = true;
    }
}

function keyPressed() {
    // Jump
    if (key.toLowerCase() == "k") {
        raspberry.boost();
    }
    
    // Pause the Game
    if (key == "Escape") {
        paused = !paused;
    } else if (paused) {
        paused = false;
    }
}