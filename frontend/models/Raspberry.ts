class Raspberry extends Entity {
    private readonly lift: number = -20;
    private readonly gravity: number = 1.314159265358979323846264338;
    private _velocity: number = 0;
    private _image: any;
    private static readonly maxVelocity: number = 100;

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

    constructor() {
        super(new Position(width / 6, height / 2), 180, 70, 0);
    }

    public update(): void {
        this.applyGravity();
        this.forceBoundaries();
    }

    private applyGravity(): void {
        this.velocity += this.gravity;
        this.position.y += this.velocity;
    }

    private forceBoundaries(): void {
        if (this.position.y+this.height > height) {
            this.position.y = height-this.height;
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
        image(this.image, this.position.x, this.position.y, this.width, this.height);
        noFill();
        noStroke();
        rect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
}