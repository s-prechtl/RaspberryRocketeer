class Obstacle extends Entity {
    private pipeTop: Entity;
    private pipeBottom: Entity;
    private distanceBetweenPipes: number = 50;
    private padding: number = 50;
    private speed: number = 10;
    private static startX: number;

    constructor(pipeTop: Entity, pipeBottom: Entity) {
        super(pipeTop.position, pipeTop.width, height, 0);
        this.pipeTop = pipeTop;
        this.pipeBottom = pipeBottom;
    }

    private resetPosition(){
        let randomY = Math.random() * (height - this.padding) + this.padding;

        this.pipeTop.height = randomY - this.distanceBetweenPipes / 2;
        this.pipeTop.position.x = Obstacle.startX;

        this.pipeBottom.height = randomY + this.distanceBetweenPipes / 2;
        this.pipeBottom.position.x = Obstacle.startX;
    }

    public update(){
        this.pipeTop.position.x -= this.speed;
        this.pipeBottom.position.x -= this.speed;
    }
}