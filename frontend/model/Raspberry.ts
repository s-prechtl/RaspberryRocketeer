/**
 * Raspberry class.
 */
class Raspberry extends Entity {
    /**
     * Amount of lift applied when boosting.
     * @private
     */
    private readonly lift: number = -20;

    /**
     * Gravity applied.
     * @private
     */
    private readonly gravity: number = 1.314159265358979323846264338;

    /**
     * Current speed.
     * @private
     */
    private _velocity: number = 0;

    /**
     * Image for the raspberry.
     * @private
     */
    private _image: p5.Image;

    /**
     * Position.
     * @private
     */
    private static position: Position;

    /**
     * Maximum velocity, so the raspberry doesn't get to infinite speed when boosting.
     * @private
     */
    private static readonly maxVelocity: number = 100;

    /**
     * Width.
     * @private
     */
    private static readonly WIDTH: number = 180;

    /**
     * Height.
     * @private
     */
    private static readonly HEIGHT: number = 70;

    /**
     * Color.
     * @private
     */
    private static readonly FILL: number = 0;

    //region Getter & Setter

    /**
     * Gets the velocity.
     */
    get velocity(): number {
        return this._velocity;
    }

    /**
     * Sets the velocity.
     * @param value
     */
    set velocity(value: number) {
        this._velocity = (Math.abs(this.velocity) > Raspberry.maxVelocity) ? Raspberry.maxVelocity : value;
    }

    /**
     * Gets the image.
     */
    get image(): p5.Image {
        return this._image;
    }

    /**
     * Sets the image by path.
     * @param {string} path
     */
    set image(path: any) {
        this._image = loadImage(path);
    }

    //endregion

    /**
     * Constructs the Raspberry with fixed sizes.
     * @param image Path to image
     */
    constructor(image: string) {
        Raspberry.position = new Position(width / 6, height / 2);
        super(Raspberry.position, Raspberry.WIDTH, Raspberry.HEIGHT, Raspberry.FILL);
        this.image = image;
    }

    /**
     * Applies gravity and keeps the raspberry within the canvas.
     */
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

    /**
     * Limits the raspberry's movement to the shown canvas.
     * @private
     */
    private forceBoundaries(): void {
        this.boundaryTop();
        this.boundaryBottom();
    }

    /**
     * Forces the boundaries at the canvas' top.
     * @private
     */
    private boundaryTop(): void {
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity = 0;
        }
    }

    /**
     * Forces the boundaries at the canvas' bottom.
     * @private
     */
    private boundaryBottom(): void {
        if (this.position.y + this.height > height) {
            this.position.y = height - this.height;
            this.velocity = 0;
        }
    }

    /**
     * Lets the raspberry jump.
     */
    public boost(): void {
        this.velocity += this.lift;
    }

    /**
     * Draws raspberry.
     */
    public draw(): void {
        push();
        noFill();
        this.setPose();
        this.drawObject();
        pop();
    }

    /**
     * Draws the rocket.
     * @private
     */
    private drawObject() {
        this.drawHitBox();
        this.drawRocket();
    }

    /**
     * Handles the drawing of the object.
     */
    private drawRocket() {
        image(this.image, 0, 0, this.width, this.height);
        rect(0, 0, this.width, this.height);
    }

    /**
     * If enabled, draws the hitbox.
     */
    private drawHitBox() {
        if (!this.showHitbox) {
            noStroke();
        }
    }

    /**
     * Rotation and position of the rocket.
     * @private
     */
    private setPose() {
        translate(this.position.x, this.position.y);
        rotate((PI / 2) * (this.velocity / Raspberry.maxVelocity));
    }
}