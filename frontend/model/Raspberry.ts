class Raspberry extends Entity {
    private readonly lift: number = -20;
    private readonly gravity: number = 1.314159265358979323846264338;
    private _velocity: number = 0;
    private _image: any;

    private static position: Position;
    private static readonly maxVelocity: number = 100;
    private static readonly WIDTH: number = 180;
    private static readonly HEIGHT: number = 70;
    private static readonly FILL: number = 0;

    //region Getter & Setter
    get velocity(): number {
        return this._velocity;
    }

    set velocity(value: number) {
        this._velocity = (Math.abs(this.velocity) > Raspberry.maxVelocity) ? Raspberry.maxVelocity : value;
    }

    get image(): any {
        return this._image;
    }

    set image(path: string) {
        this._image = loadImage(path);
    }

    //endregion

    /**
     * Constructs the Raspberry with fixed sizes
     */
    constructor(image: string) {
        Raspberry.position = new Position(width / 6, height / 2);
        super(Raspberry.position, Raspberry.WIDTH, Raspberry.HEIGHT, Raspberry.FILL);
        this.image = image;
    }

    public update(): void {
        this.applyGravity();
        this.forceBoundaries();
    }

    /**
     * Lets the Raspberry fall to the ground
     */
    private applyGravity(): void {
        this.velocity += this.gravity;
        this.position.y += this.velocity;
    }

    private forceBoundaries(): void {
        if (this.position.y + this.height > height) {
            this.position.y = height - this.height;
            this.velocity = 0;
        }

        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity = 0;
        }
    }
    
    public boost(): void {
        this.velocity += this.lift;
    }

    public draw(): void {
        push();
        noFill();
        translate(this.position.x, this.position.y);
        rotate((PI / 2) * (this.velocity / Raspberry.maxVelocity));
        image(this.image, 0, 0, this.width, this.height);
        if (!this.showHitbox) {
            noStroke();
        }
        rect(
            0,
            0,
            this.width,
            this.height
        );
        pop();
    }
}