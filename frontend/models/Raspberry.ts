class Raspberry extends Entity{
    private lift: number = -10;
    private gravity: number = 1;
    private velocity: number = 0;

    update() {
        this.applyGravity();
        this.forceBoundaries();
    }

    private applyGravity() {
        if (this.position.y - this.height > 0) {
            this.velocity += this.gravity;
        }
    }

    private forceBoundaries() {
        if (this.position.y > height) {
            this.position.y = height;
            this.velocity = 0;
        }

        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity = 0;
        }
    }

    public boost() {
        this.velocity += this.lift;
    }
}