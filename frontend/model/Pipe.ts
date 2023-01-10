/**
 * Rectangular obstacle.
 */
class Pipe extends Entity implements Collidable {
    /**
     * Pipe's image.
     * @private
     */
    private _image: p5.Image;

    //region Getter & Setter
    /**
     * Gets the image.
     */
    get image(): p5.Image {
        return this._image;
    }

    /**
     * Sets the image.
     * @param path Path to image
     */
    set image(path: any) {
        this._image = loadImage(path);
    }
    //endregion

    /**
     * Constructs the pipe.
     * @param positionX starting x-Position
     * @param width pipe width
     * @param height pipe height
     * @param image path to image.
     */
    constructor(positionX: number, width: number, height: number, image: string) {
        super(new Position(positionX, 0), width, height, 0);
        this.image = image;
    }

    /**
     * YAGNI.
     */
    public update(): void {}

    /**
     * Draws the pipe.
     */
    public draw(): void {
        push();
        noFill();
        image(this.image, this.position.x, this.position.y, this.width, this.height);
        rect(this.position.x, this.position.y, this.width, this.height);
        pop();
    }

    /**
     * Moves the pipe to the lift with the given speed
     * @param speed how fast the pipe moves
     */
    public move(speed: number): void {
        this.position.x -= speed;
    }

    /**
     * Determines when the pipe is colliding with another entity
     * @param o other entity
     */
    collides(o: Entity): boolean {
        return this.position.x < (o.position.x + o.width) && //inside left border
            (this.position.x + this.width) > o.position.x && //but not outside right border
            this.position.y < (o.position.y + o.height) && //inside top border
            (this.position.y + this.height) > o.position.y; //but not outside bottom border
    }
}