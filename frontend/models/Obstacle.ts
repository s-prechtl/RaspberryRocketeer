class Obstacle extends Entity {
    private pipeTop: Entity;
    private pipeBottom: Entity;
    private distanceBetweenPipes: number;
    private padding: number = 300;
    private speed: number = 8;
    private static startX: number;

    /**
     * Constructs the Obstacle using the top and bottom Pipe
     * (fill is not used here)
     * @param pipeTop
     * @param pipeBottom
     */
    constructor(pipeTop: Entity, pipeBottom: Entity) {
        super(pipeTop.position, pipeTop.width, pipeBottom.height, 0);
        this.pipeTop = pipeTop;
        this.pipeBottom = pipeBottom;

        this.distanceBetweenPipes = height / 4;
        Obstacle.startX = width;
    }

    public resetPosition(): void {
        this.pipeBottom.position.y = this.distanceBetweenPipes + this.randomRange(0, height - this.padding - 1.2 * this.distanceBetweenPipes);
        this.pipeBottom.position.x = Obstacle.startX;

        this.pipeTop.position.y = this.pipeBottom.position.y - this.distanceBetweenPipes - this.pipeTop.height;
        this.pipeTop.position.x = Obstacle.startX;
    }

    private randomRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public update(): void {
        this.pipeTop.position.x -= this.speed;
        this.pipeBottom.position.x -= this.speed;
    }

    public draw(): void {
        fill(10, 200, 100); //TODO do not make static
        rect(
            this.pipeTop.position.x,
            this.pipeTop.position.y,
            this.pipeTop.width,
            this.pipeTop.height
        );
        rect(
            this.pipeBottom.position.x,
            this.pipeBottom.position.y,
            this.pipeBottom.width,
            this.pipeBottom.height
        )
    }
}