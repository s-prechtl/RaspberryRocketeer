class Obstacle extends Entity {
    private pipeTop: Pipe;
    private pipeBottom: Pipe;
    private distanceBetweenPipes: number;
    private padding: number = 300;
    private speed: number = 8;

    private static startX: number;

    /**
     * Constructs the Obstacle using the top and bottom Pipe
     * (fill is not used here)
     */
    constructor(pipeTop: Pipe, pipeBottom: Pipe, pipeImagePath: string) {
        super(pipeTop.position, pipeTop.width, pipeBottom.height, 0);
        this.pipeTop = pipeTop;
        this.pipeBottom = pipeBottom;
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
    }

    public draw(): void {
        noFill();
        this.pipeTop.draw();
        this.pipeBottom.draw();
    }
}