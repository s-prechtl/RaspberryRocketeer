var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({__proto__: []} instanceof Array && function (d, b) {
                d.__proto__ = b;
            }) ||
            function (d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);

        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PIPE_IMAGE_PATH = "resources/dell-pc-min-min-small.png";
var BACKGROUND_IMAGE_PATH = "resources/htl-steyr-front.jpg";
var RASPBERRY_IMAGE_PATH = "resources/raspberry-rocket.png";
var FLOOR_IMAGE_PATH = "resources/table-min-min.png";
var FONT_PATH = "resources/PressStart2P-Regular.ttf";
var OBSTACLE_COUNT = 3;
var BOOST_KEYS = ["k", " "];
var floorHeight;
var obstacleWidth;
var obstacleOffset;
var backgroundImage;
var pipeImage;
var floorImage;
var font;
var obstacles = [];
var raspberry;
var startTime;
var playTime;
var score = 0;
var paused;
var hasAlreadyScored = false;
var hasDied = true;
var ready = true;

function preload() {
    font = loadFont(FONT_PATH);
    backgroundImage = loadImage(BACKGROUND_IMAGE_PATH);
    pipeImage = loadImage(PIPE_IMAGE_PATH);
    floorImage = loadImage(FLOOR_IMAGE_PATH);
}

function setup() {
    createCanvas(1085, 600);
    floorHeight = height / 5;
    setupObstacleConsts();
    setupFont();
    setupGame();
    var originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
        var event = new Event('itemInserted');

        event.value = value; // Optional..
        event.key = key; // Optional..
        window.dispatchEvent(event);
        originalSetItem.apply(this, arguments);
    };
}

function setupObstacleConsts() {
    obstacleOffset = width / OBSTACLE_COUNT;
    obstacleWidth = width / 22.727272727272727272;
    Obstacle.distanceBetweenPipes = height / 2.5;
    Obstacle.startX = width;
}

function setupFont() {
    textSize(75);
    textAlign(CENTER);
    textFont(font);
}

function setupGame() {
    paused = true;
    raspberry = new Raspberry(RASPBERRY_IMAGE_PATH);
    setupObstacles();
}

function setupObstacles() {
    obstacles = [];
    instantiateObstacles(OBSTACLE_COUNT);
    obstacles.forEach(function (obstacle) {
        return obstacle.randomizeHeight();
    });
}

function instantiateObstacles(number) {
    for (var i = 0; i < number; i++) {
        obstacles.push(new Obstacle(new Position(width + obstacleOffset * i, 0), obstacleWidth, height, pipeImage));
    }
}

function draw() {
    update();
    gameLoop();
    drawGame();
}

function drawGame() {
    drawScenery();
    drawEntities();
    displayScore();
}

function drawScenery() {
    background(backgroundImage);
    drawFloor();
}

function drawFloor() {
    push();
    noFill();
    image(floorImage, 0, height - floorHeight, width, floorHeight);
    rect(0, height - floorHeight, width, floorHeight);
    pop();
}

function drawEntities() {
    raspberry.draw();
    drawObstacles();
}

function drawObstacles() {
    obstacles.forEach(function (obstacle) {
        obstacle.draw();
    });
}

function gameLoop() {
    if (!paused) {
        collisionCheck(obstacles[0]);
        checkRaspberryScore();
    }
}

function collisionCheck(o) {
    if (o.collides(raspberry)) {
        die();
        setupGame();
    }
}

function die() {
    ready = false;
    hasDied = true;
    playTime = Date.now() - startTime;
    exportToLocalStorage();
    setTimeout(function () {
        return ready = true;
    }, 1000);
}

function exportToLocalStorage() {
    localStorage.setItem("game-playTime", String(playTime));
    localStorage.setItem("game-score", String(score));
    localStorage.setItem("game-isRunning", String(!hasDied));
}

function displayScore() {
    push();
    fill(195, 33, 34);
    text(score, 0, height / 8, width, height);
    pop();
}

function update() {
    if (!paused) {
        raspberry.update();
    }
    obstacles.forEach(function (obstacle) {
        if (!paused) {
            obstacle.update();
            checkObstacleReset(obstacle);
        }
    });
}

function checkObstacleReset(obstacle) {
    if (obstacle.position.x < -obstacleWidth) {
        obstacle.resetPosition();
        obstacles.shift();
        obstacles.push(obstacle);
        hasAlreadyScored = false;
    }
}

function checkRaspberryScore() {
    if ((obstacles[0].position.x + obstacles[0].width / 2) < (raspberry.position.x + raspberry.width / 2)
        && !hasAlreadyScored) {
        score += 1;
        hasAlreadyScored = true;
    }
}

function resetScore() {
    if (hasDied) {
        hasDied = false;
        score = 0;
        hasAlreadyScored = false;
        startTime = Date.now();
        exportToLocalStorage();
    }
}

function keyPressed() {
    if (!ready)
        return;
    if (BOOST_KEYS.includes(key.toLowerCase())) {
        resetScore();
        raspberry.boost();
    }
    if (key == "Escape") {
        paused = !paused;
    } else if (paused) {
        paused = false;
    }
}

var Entity = (function () {
    function Entity(position, width, height, fill) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.fill = fill;
        this._showHitbox = false;
    }

    Object.defineProperty(Entity.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
            this._position = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "showHitbox", {
        get: function () {
            return this._showHitbox;
        },
        set: function (value) {
            this._showHitbox = value;
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.draw = function () {
        push();
        fill(this.fill);
        rect(this.position.x, this.position.y, this.width, this.height);
        pop();
    };
    return Entity;
}());
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);

    function Obstacle(position, obstacleWidth, obstacleHeight, image) {
        var _this = _super.call(this, position, obstacleWidth, obstacleHeight, 0) || this;
        _this.speed = 3;
        _this.padding = height / 6.6666666666666666;
        _this.createPipes(position, obstacleHeight, obstacleWidth, image);
        return _this;
    }

    Object.defineProperty(Obstacle, "startX", {
        set: function (value) {
            this._startX = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Obstacle, "distanceBetweenPipes", {
        set: function (value) {
            this._distanceBetweenPipes = value;
        },
        enumerable: false,
        configurable: true
    });
    Obstacle.prototype.createPipes = function (position, obstacleHeight, obstacleWidth, pipeImage) {
        this.pipeTop = new Pipe(position.x, obstacleWidth, obstacleHeight, pipeImage);
        this.pipeBottom = new Pipe(position.x, obstacleWidth, obstacleHeight, pipeImage);
    };
    Obstacle.prototype.resetPosition = function () {
        this.randomizeHeight();
        this.pipeBottom.position.x = Obstacle._startX;
        this.pipeTop.position.x = Obstacle._startX;
    };
    Obstacle.prototype.randomizeHeight = function () {
        this.pipeTop.height = this.randomRange(this.padding, height - this.padding - Obstacle._distanceBetweenPipes);
        this.pipeBottom.position.y = this.pipeTop.height + Obstacle._distanceBetweenPipes;
        this.pipeBottom.height = height - this.pipeTop.height - this.padding;
    };
    Obstacle.prototype.randomRange = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    Obstacle.prototype.update = function () {
        this.pipeTop.move(this.speed);
        this.pipeBottom.move(this.speed);
        this.position.x = this.pipeTop.position.x;
    };
    Obstacle.prototype.draw = function () {
        this.pipeTop.draw();
        this.pipeBottom.draw();
    };
    Obstacle.prototype.collides = function (o) {
        return this.pipeTop.collides(o) || this.pipeBottom.collides(o);
    };
    return Obstacle;
}(Entity));
var Pipe = (function (_super) {
    __extends(Pipe, _super);

    function Pipe(positionX, width, height, image) {
        var _this = _super.call(this, new Position(positionX, 0), width, height, 0) || this;
        _this.image = image;
        return _this;
    }

    Pipe.prototype.update = function () {
    };
    Pipe.prototype.draw = function () {
        push();
        noFill();
        var imageAspectRatio = this.image.height / this.image.width;
        var computedImageHeight = imageAspectRatio * this.width;
        this.drawImage(computedImageHeight, imageAspectRatio);
        rect(this.position.x, this.position.y, this.width, this.height);
        pop();
    };
    Pipe.prototype.drawImage = function (computedImageHeight, imageAspectRatio) {
        if (this.height > computedImageHeight) {
            var maxImageYPos = Math.ceil(this.height / computedImageHeight) * computedImageHeight;
            for (var imageYPosition = 0; imageYPosition < maxImageYPos; imageYPosition += computedImageHeight) {
                if (imageYPosition + computedImageHeight >= maxImageYPos) {
                    this.cropLastImage(imageYPosition, computedImageHeight, imageAspectRatio);
                    break;
                }
                image(this.image, this.position.x, this.position.y + imageYPosition, this.width, computedImageHeight);
            }
        } else {
            image(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    };
    Pipe.prototype.cropLastImage = function (imageYPosition, computedImageHeight, imageAspectRatio) {
        var amountOfImages = Math.floor(imageYPosition / computedImageHeight);
        var heightToEdge = this.height - (amountOfImages * computedImageHeight);
        var croppedImage = this.image.get(0, 0, this.image.width, this.image.height - (heightToEdge * imageAspectRatio));
        image(croppedImage, this.position.x, this.position.y + imageYPosition, this.width, heightToEdge);
    };
    Pipe.prototype.move = function (speed) {
        this.position.x -= speed;
    };
    Pipe.prototype.collides = function (o) {
        return this.position.x < (o.position.x + o.width) &&
            (this.position.x + this.width) > o.position.x &&
            this.position.y < (o.position.y + o.height) &&
            (this.position.y + this.height) > o.position.y;
    };
    return Pipe;
}(Entity));
var Position = (function () {
    function Position(x, y) {
        this._x = x;
        this._y = y;
    }

    Object.defineProperty(Position.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: false,
        configurable: true
    });
    return Position;
}());
var Raspberry = (function (_super) {
    __extends(Raspberry, _super);

    function Raspberry(image) {
        var _this = this;
        Raspberry.position = new Position(width / 6, height / 2);
        Raspberry.height = height / 14.2857142857142857;
        Raspberry.width = width / 11.1111111111111111;
        _this = _super.call(this, Raspberry.position, Raspberry.width, Raspberry.height, Raspberry.FILL) || this;
        _this.lift = -15;
        _this.gravity = 0.45;
        _this._velocity = 0;
        Raspberry.bottomFloorOffset = (height / 5) - (height / 15 / 2);
        _this.image = image;
        return _this;
    }

    Object.defineProperty(Raspberry.prototype, "velocity", {
        get: function () {
            return this._velocity;
        },
        set: function (value) {
            this._velocity = (Math.abs(this.velocity) > Raspberry.maxVelocity) ? Raspberry.maxVelocity : value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Raspberry.prototype, "image", {
        get: function () {
            return this._image;
        },
        set: function (path) {
            this._image = loadImage(path);
        },
        enumerable: false,
        configurable: true
    });
    Raspberry.prototype.update = function () {
        this.applyGravity();
        this.forceBoundaries();
    };
    Raspberry.prototype.applyGravity = function () {
        this.velocity += this.gravity;
        this.position.y += this.velocity;
    };
    Raspberry.prototype.forceBoundaries = function () {
        this.boundaryTop();
        this.boundaryBottom();
    };
    Raspberry.prototype.boundaryTop = function () {
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity = 0;
        }
    };
    Raspberry.prototype.boundaryBottom = function () {
        if (this.position.y + this.height + Raspberry.bottomFloorOffset > height) {
            this.position.y = height - this.height - Raspberry.bottomFloorOffset;
            this.velocity = 0;
        }
    };
    Raspberry.prototype.boost = function () {
        this.velocity += this.lift;
    };
    Raspberry.prototype.draw = function () {
        push();
        noFill();
        this.setPose();
        this.drawObject();
        pop();
    };
    Raspberry.prototype.drawObject = function () {
        this.drawHitBox();
        this.drawRocket();
    };
    Raspberry.prototype.drawRocket = function () {
        image(this.image, 0, 0, this.width, this.height);
        rect(0, 0, this.width, this.height);
    };
    Raspberry.prototype.drawHitBox = function () {
        if (!this.showHitbox) {
            noStroke();
        }
    };
    Raspberry.prototype.setPose = function () {
        translate(this.position.x, this.position.y);
        rotate((PI / 2) * (this.velocity / Raspberry.maxVelocity));
    };
    Raspberry.maxVelocity = 75;
    Raspberry.FILL = 0;
    return Raspberry;
}(Entity));
//# sourceMappingURL=build.js.map
