class Obstacle extends Entity implements Collidable{
    private pipeTop: Pipe;
    private pipeBottom: Pipe;
    private readonly distanceBetweenPipes: number;
    private readonly padding: number = 300;
    private readonly speed: number = 3;

    private static startX: number;

    /**
     * Constructs the Obstacle using the top and bottom Pipe
     * (fill is not used here)
     */
    constructor(position: Position, obstacleWidth: number, obstacleHeight: number, pipeImagePath: string) {
        super(position, obstacleWidth, obstacleHeight, 0);
        this.pipeTop = new Pipe(position.x, obstacleWidth, obstacleHeight);
        this.pipeBottom = new Pipe(position.x, obstacleWidth, obstacleHeight);
        this.pipeTop.image = pipeImagePath;
        this.pipeBottom.image = pipeImagePath;

        this.distanceBetweenPipes = height / 4;
        Obstacle.startX = width;
    }

    public resetPosition(resetX: boolean): void {
        this.pipeBottom.position.y =
            this.distanceBetweenPipes + this.randomRange(0, height - this.padding - 1.2 * this.distanceBetweenPipes);

        this.pipeTop.position.y =
            this.pipeBottom.position.y - this.distanceBetweenPipes - this.pipeTop.height;

        if(resetX){
            this.pipeBottom.position.x = Obstacle.startX;
            this.pipeTop.position.x = Obstacle.startX;
        }
    }

    private randomRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public update(): void {
        this.pipeTop.position.x -= this.speed;
        this.pipeBottom.position.x -= this.speed;
        this.position.x = this.pipeTop.position.x;
    }

    public draw(): void {
        noFill();
        this.pipeTop.draw();
        this.pipeBottom.draw();
    }

    collides(o: Entity): boolean {
        return this.pipeTop.collides(o) || this.pipeBottom.collides(o);
    }
}