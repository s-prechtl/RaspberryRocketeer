const PIPE_IMAGE_PATH: string = "resources/seesORsoos_sad_no-bg.png";
const BACKGROUND_IMAGE_PATH: string = "resources/raspberry-low-res.png";
const RASPBERRY_IMAGE_PATH: string = "resources/raspberry-rocket.png";
const FLOOR_IMAGE_PATH: string = "resources/table-min-min.png";
const FONT_PATH: string = "resources/PressStart2P-Regular.ttf";
const OBSTACLE_WIDTH: number = 88;
const OBSTACLE_COUNT: number = 3;
const BOOST_KEYS = ["k", " "];
let floorHeight: number;
let obstacleOffset: number;
let font: p5.Font;
let backgroundImage: p5.Image;
let pipeImage: p5.Image;
let floorImage: p5.Image;

let obstacles: Obstacle[] = [];
let raspberry: Raspberry;
let paused: boolean;
let score: number = 0;
let hasAlreadyScored: boolean = false;
let hasDied: boolean = false;
let ready: boolean = true;

/**
 * p5 preload function
 */
function preload() {
    font = loadFont(FONT_PATH);
    backgroundImage = loadImage(BACKGROUND_IMAGE_PATH);
    pipeImage = loadImage(PIPE_IMAGE_PATH);
    floorImage = loadImage(FLOOR_IMAGE_PATH);
}

/**
 * p5 setup function.
 */
function setup() {
    createCanvas(2000, 1000);
    floorHeight = height / 5;
    setupObstacleConsts();
    setupFont();
    setupGame();
}

/**
 * Sets up the constants needed for the game.
 */
function setupObstacleConsts() {
    obstacleOffset = width / OBSTACLE_COUNT;
    Obstacle.distanceBetweenPipes = height / 2.5
    Obstacle.startX = width;
}

/**
 * Set up the font.
 */
function setupFont() {
    textSize(150);
    textAlign(CENTER);
    textFont(font);
}

/**
 * Sets up everything needed for the game.
 */
function setupGame() {
    paused = true;
    raspberry = new Raspberry(RASPBERRY_IMAGE_PATH);
    setupObstacles();
}

/**
 * Clears the obstacles and reinitializes them.
 */
function setupObstacles() {
    obstacles = [];
    instantiateObstacles(OBSTACLE_COUNT);
    obstacles.forEach((obstacle) => obstacle.randomizeHeight());
}

/**
 * Instantiates a certain amount of obstacles.
 * @param number
 */
function instantiateObstacles(number: number) {
    for (let i = 0; i < number; i++) {
        obstacles.push(
            new Obstacle(new Position(width + obstacleOffset * i, 0), OBSTACLE_WIDTH, height, pipeImage));
    }
}

/**
 * Draws and updates the game.
 */
function draw() {
    update();
    gameLoop();
    drawGame();
}

/**
 * Draws the game's elements.
 */
function drawGame() {
    drawScenery();
    drawEntities();
    displayScore();
}

/**
 * Draws the:
 * - background
 * - floor
 */
function drawScenery(){
   background(backgroundImage);
   drawFloor();
}

/**
 * Draws the floor with the corresponding image
 */
function drawFloor(){
    push();
    noFill();
    image(floorImage, 0, height - floorHeight, width, floorHeight);
    rect(0, height - floorHeight, width, floorHeight);
    pop();
}

/**
 * Draws the game's enities.
 */
function drawEntities() {
    raspberry.draw();
    drawObstacles();
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
 * Operations for the game's functionality.
 */
function gameLoop() {
    if (!paused) {
        collisionCheck(obstacles[0]);
        checkRaspberryScore();
    }
}

/**
 * Checks the collision between an obstacle and the raspberry.
 * @param o
 */
function collisionCheck(o: Obstacle) {
    if (o.collides(raspberry)) {
        die();
        setupGame();
    }
}

/**
 * Timeouts key events.
 */
function die() {
    ready = false;
    hasDied = true;
    setTimeout(() => ready = true, 1000);
}

/**
 * Displays the game score.
 */
function displayScore() {
    push();
    fill(200, 100, 60);
    text(score, 0, height / 10, width, height);
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
 * Resets the score if game is started
 */
function resetScore(): void {
    if (hasDied) {
        hasDied = false;
        score = 0;
        hasAlreadyScored = false;
    }
}

/**
 * Handler for key events.
 */
function keyPressed() {
    if (!ready) return;
    // Jump
    if (BOOST_KEYS.includes(key.toLowerCase())) {
        resetScore();
        raspberry.boost();
    }

    // Pause the Game
    if (key == "Escape") {
        paused = !paused;
    } else if (paused) {
        paused = false;
    }
}
