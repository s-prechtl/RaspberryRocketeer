class Obstacle extends Entity implements Collidable {
    private pipeTop: Pipe;
    private pipeBottom: Pipe;
    private readonly distanceBetweenPipes: number;
    private readonly padding: number = 150;
    private readonly speed: number = 3;

    private static startX: number;

    /**
     * Constructs the Obstacle with the given image
     * (fill is not used here)
     * @param position starting position of the obstacle
     * @param obstacleWidth width of the obstacle
     * @param obstacleHeight height of the obstacle
     * @param pipeImagePath path to the image to be used
     */
    constructor(position: Position, obstacleWidth: number, obstacleHeight: number, pipeImagePath: string) {
        super(position, obstacleWidth, obstacleHeight, 0);
        this.pipeTop = new Pipe(position.x, obstacleWidth, obstacleHeight);
        this.pipeBottom = new Pipe(position.x, obstacleWidth, obstacleHeight);
        this.pipeTop.image = pipeImagePath;
        this.pipeBottom.image = pipeImagePath;

        this.distanceBetweenPipes = height / 2.5;
        Obstacle.startX = width;
    }

    /**
     * Resets the position of the obstacle to the Obstacle.startX variable
     * Randomises the height of the pipes using the padding variable
     */
    public resetPosition(): void {
        this.randomizeHeight();

        this.pipeBottom.position.x = Obstacle.startX;
        this.pipeTop.position.x = Obstacle.startX;
    }

    /**
     * Randomizes the height of the pipes
     */
    public randomizeHeight(): void {
        this.pipeTop.height = this.randomRange(this.padding, height - this.padding - this.distanceBetweenPipes);
        this.pipeTop.position.y = 0;
        this.pipeBottom.position.y = this.pipeTop.height + this.distanceBetweenPipes;
        this.pipeBottom.height = height - this.pipeTop.height - this.padding;
    }

    /**
     * Creates a random number between the min and max parameter
     * @param min minimum number
     * @param max maximum number
     */
    private randomRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public update(): void {
        this.pipeTop.position.x -= this.speed;
        this.pipeBottom.position.x -= this.speed;
        this.position.x = this.pipeTop.position.x;
    }

    public draw(): void {
        this.pipeTop.draw();
        this.pipeBottom.draw();
    }

    /**
     * Determines when the obstacle is colliding with another entity
     * @param o other entity
     */
    public collides(o: Entity): boolean {
        return this.pipeTop.collides(o) || this.pipeBottom.collides(o);
    }
}