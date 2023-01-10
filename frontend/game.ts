const PIPE_IMAGE_PATH: string = "resources/raspberry-low-res.png";
const BACKGROUND_IMAGE_PATH: string = "resources/raspberry-low-res.png";
const RASPBERRY_IMAGE_PATH: string = "resources/raspberry-rocket.png";
const OBSTACLE_WIDTH: number = 88;
let obstacleOffset: number;
let backgroundImage: any;

let obstacles: Obstacle[] = [];
let raspberry: Raspberry;
let paused: boolean;
let score: number;
let hasAlreadyScored: boolean;

/**
 * p5 setup function.
 */
function setup() {
    backgroundImage = loadImage(BACKGROUND_IMAGE_PATH);
    createCanvas(2000, 1000);
    obstacleOffset = width / 3;
    Obstacle.distanceBetweenPipes = height / 2.5
    Obstacle.startX = width;

    textSize(150);
    textFont("resources/PressStart2P-Regular.ttf");

    setupGame();
}

/**
 * Sets up everything needed for the game.
 */
function setupGame() {
    paused = true;
    score = 0;
    hasAlreadyScored = false;
    raspberry = new Raspberry(RASPBERRY_IMAGE_PATH);

    Obstacle.distanceBetweenPipes = height / 2.5;
    Obstacle.startX = width;

    // Create all obstacles
    obstacles = [];
    for (let i = 0; i < 3; i++) {
        obstacles.push(new Obstacle(
            new Position(width + obstacleOffset * i, 0),
            OBSTACLE_WIDTH,
            height,
            PIPE_IMAGE_PATH,
        ));
    }

    // Randomize position of all Obstacles
    obstacles.forEach((obstacle) => obstacle.randomizeHeight());
}

/**
 * Draws and updates the game.
 */
function draw() {
    update();
    background(backgroundImage);
    raspberry.draw();
    drawObstacles();
    // Check for collisions with pipes and set score
    if (!paused) {
        if (obstacles[0].collides(raspberry)) {
            setupGame();
        }
        checkRaspberryScore();
        obstacles[0].draw();
    }
    displayScore();
}

/**
 * Displays the game score.
 */
function displayScore(){
    push();
    fill(200, 100, 60);
    text(score, width / 2, height / 10, width, height);
    pop();
}

/**
 * Updates all objects.
 */
function update() {
    if (!paused) {
        raspberry.update();
    }
    obstacles.forEach((obstacle: Obstacle) => {
        if (!paused) {
            obstacle.update();
            // Reset Obstacles Position
            checkObstacleReset(obstacle);
        }
    })
}

/**
 * Draws the obstacles.
 */
function drawObstacles() {
    obstacles.forEach((obstacle) => {
        obstacle.draw();
    });
}


/**
 * Check if obstacle positions should be reset and reset if so
 * @param obstacle obstacle to check
 */
function checkObstacleReset(obstacle: Obstacle) {
    if (obstacle.position.x < -OBSTACLE_WIDTH) {
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

/**
 * Handler for key events.
 */
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
