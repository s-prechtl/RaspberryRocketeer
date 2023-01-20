/**
 * Raspberry class.
 */
class Raspberry extends Entity {
    /**
     * Amount of lift applied when boosting.
     * @private
     */
    private readonly lift: number = -15;

    /**
     * Gravity applied.
     * @private
     */
    private readonly gravity: number = 0.45;

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
    private static readonly maxVelocity: number = 75;

    /**
     * Width.
     * @private
     */
    private static width: number;

    /**
     * Height.
     * @private
     */
    private static height: number;

    /**
     * Offset off of the floor so that the raspberry looks like it's falling on the floor
     * @private
     */
    private static bottomFloorOffset: number;

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
        Raspberry.height = height / 14.2857142857142857;
        Raspberry.width = width / 11.1111111111111111;
       
        super(Raspberry.position, Raspberry.width, Raspberry.height, Raspberry.FILL);
        Raspberry.bottomFloorOffset = (height / 5) - (height / 15 / 2);
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
     * Limits the Raspberry's movement to the shown canvas.
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
        if (this.position.y + this.height + Raspberry.bottomFloorOffset > height) {
            this.position.y = height - this.height - Raspberry.bottomFloorOffset;
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