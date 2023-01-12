/**
 * Obstacle of the game. Built from 2 pipes, one at the bottom, one at the top.
 */
class Obstacle extends Entity implements Collidable {
    private pipeTop: Pipe;
    private pipeBottom: Pipe;
    private readonly padding: number = 150;
    private readonly speed: number = 3;

    private static _distanceBetweenPipes: number;
    private static _startX: number;

    static set startX(value: number) {
        this._startX = value;
    }

    static set distanceBetweenPipes(value: number) {
        this._distanceBetweenPipes = value;
    }

    /**
     * Constructs the Obstacle with the given image.
     * @param position starting position of the obstacle
     * @param obstacleWidth width of the obstacle
     * @param obstacleHeight height of the obstacle
     * @param pipeImagePath path to the image to be used
     */
    constructor(position: Position, obstacleWidth: number, obstacleHeight: number, pipeImagePath: string) {
        super(position, obstacleWidth, obstacleHeight, 0);
        this.createPipes(position, obstacleHeight, obstacleWidth, pipeImagePath);
    }

    /**
     * Creates the pipes.
     * @param position
     * @param obstacleHeight
     * @param obstacleWidth
     * @param pipeImagePath
     * @private
     */
    private createPipes(position: Position, obstacleHeight: number, obstacleWidth: number, pipeImagePath: string) {
        this.pipeTop = new Pipe(position.x, obstacleWidth, obstacleHeight, pipeImagePath);
        this.pipeBottom = new Pipe(position.x, obstacleWidth, obstacleHeight, pipeImagePath);
    }

    /**
     * Resets the position of the obstacle to the Obstacle.startX variable
     * Randomises the height of the pipes using the padding variable
     */
    public resetPosition(): void {
        this.randomizeHeight();
        this.pipeBottom.position.x = Obstacle._startX;
        this.pipeTop.position.x = Obstacle._startX;
    }

    /**
     * Randomizes the height of the pipes
     */
    public randomizeHeight(): void {
        this.pipeTop.height = this.randomRange(this.padding, height - this.padding - Obstacle._distanceBetweenPipes);
        this.pipeBottom.position.y = this.pipeTop.height + Obstacle._distanceBetweenPipes;
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
        this.pipeTop.move(this.speed);
        this.pipeBottom.move(this.speed);
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