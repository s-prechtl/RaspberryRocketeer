class Obstacle {
    private pipeTop: Entity;
    private pipeBottom: Entity;
    private distanceBetweenPipes: number;
    private padding: number;
    private speed: number;
    private static startX: number;

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