class Raspberry extends Entity{
    private lift: number = -10;
    private gravity: number = 1;
    private _velocity: number = 0;
    private static maxVelocity = 5;

    constructor() {
        super(new Position(2*width/6, height/2), 10, 10, 0);
    }

    get velocity(): number {
        return this._velocity;
    }

    set velocity(value: number) {
        this._velocity = (this.velocity > Raspberry.maxVelocity) ? Raspberry.maxVelocity : value;
    }

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