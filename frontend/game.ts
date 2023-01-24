const PIPE_IMAGE_PATH: string = "resources/dell-pc-min-min-small.png";
const BACKGROUND_IMAGE_PATH: string = "resources/htl-steyr-front.jpg";
const RASPBERRY_IMAGE_PATH: string = "resources/raspberry-rocket.png";
const FLOOR_IMAGE_PATH: string = "resources/table-min-min.png";
const FONT_PATH: string = "resources/PressStart2P-Regular.ttf";
const OBSTACLE_COUNT: number = 3;
const BOOST_KEYS = ["k", " "];
let floorHeight: number;
let obstacleWidth: number;
let obstacleOffset: number;
let backgroundImage: p5.Image;
let pipeImage: p5.Image;
let floorImage: p5.Image;
let font: p5.Font;

let obstacles: Obstacle[] = [];
let raspberry: Raspberry;
let startTime: number;
let playTime: number;
let score: number = 0;
let paused: boolean;
let hasAlreadyScored: boolean = false;
let hasDied: boolean = true;
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
    let originalSetItem = localStorage.setItem;
    localStorage.setItem = function () {
        document.createEvent('Event').initEvent('itemInserted', true, true);
        originalSetItem.apply(this, arguments);
    }
}

/**
 * Sets up the constants needed for the game.
 */
function setupObstacleConsts(): void {
    obstacleOffset = width / OBSTACLE_COUNT;
    obstacleWidth = width / 22.727272727272727272;
    Obstacle.distanceBetweenPipes = height / 2.5;
    Obstacle.startX = width;
}

/**
 * Set up the font.
 */
function setupFont(): void {
    textSize(150);
    textAlign(CENTER);
    textFont(font);
}

/**
 * Sets up everything needed for the game.
 */
function setupGame(): void {
    paused = true;
    raspberry = new Raspberry(RASPBERRY_IMAGE_PATH);
    setupObstacles();
}

/**
 * Clears the obstacles and reinitializes them.
 */
function setupObstacles(): void {
    obstacles = [];
    instantiateObstacles(OBSTACLE_COUNT);
    obstacles.forEach((obstacle) => obstacle.randomizeHeight());
}

/**
 * Instantiates a certain amount of obstacles.
 * @param number
 */
function instantiateObstacles(number: number): void {
    for (let i = 0; i < number; i++) {
        obstacles.push(
            new Obstacle(new Position(width + obstacleOffset * i, 0), obstacleWidth, height, pipeImage)
        );
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
function drawGame(): void {
    drawScenery();
    drawEntities();
    displayScore();
}

/**
 * Draws the:
 * - background
 * - floor
 */
function drawScenery(): void {
    background(backgroundImage);
    drawFloor();
}

/**
 * Draws the floor with the corresponding image
 */
function drawFloor(): void {
    push();
    noFill();
    image(floorImage, 0, height - floorHeight, width, floorHeight);
    rect(0, height - floorHeight, width, floorHeight);
    pop();
}

/**
 * Draws the game's entities.
 */
function drawEntities(): void {
    raspberry.draw();
    drawObstacles();
}

/**
 * Draws the obstacles.
 */
function drawObstacles(): void {
    obstacles.forEach((obstacle) => {
        obstacle.draw();
    });
}

/**
 * Operations for the game's functionality.
 */
function gameLoop(): void {
    if (!paused) {
        collisionCheck(obstacles[0]);
        checkRaspberryScore();
    }
}

/**
 * Checks the collision between an obstacle and the raspberry.
 * @param o
 */
function collisionCheck(o: Obstacle): void {
    if (o.collides(raspberry)) {
        die();
        setupGame();
    }
}

/**
 * Timeouts key events.
 */
function die(): void {
    ready = false;
    hasDied = true;
    playTime = Date.now() - startTime;
    exportToLocalStorage();
    setTimeout(() => ready = true, 1000);
}

/**
 * Exports playTime, Score and if the game is running into localStorage
 */
function exportToLocalStorage() {
    localStorage.setItem("game-playTime", String(playTime));
    localStorage.setItem("game-score", String(score));
    localStorage.setItem("game-isRunning", String(!hasDied));
}

/**
 * Displays the game score.
 */
function displayScore(): void {
    push();
    fill(195, 33, 34);
    text(score, 0, height / 10, width, height);
    pop();
}

/**
 * Updates all objects.
 */
function update(): void {
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
function checkObstacleReset(obstacle: Obstacle): void {
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
function checkRaspberryScore(): void {
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
    if (!hasDied || localStorage.getItem("frontend-ready") == "false") return;
    
    hasDied = false;
    score = 0;
    hasAlreadyScored = false;
    startTime = Date.now();
    exportToLocalStorage();
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
