/**
 * Rectangular obstacle.
 */
class Pipe extends Entity implements Collidable {
    /**
     * Pipe's image.
     * @private
     */
    private readonly image: p5.Image;

    /**
     * Constructs the pipe.
     * @param positionX starting x-Position
     * @param width pipe width
     * @param height pipe height
     * @param image image object
     */
    constructor(positionX: number, width: number, height: number, image: p5.Image) {
        super(new Position(positionX, 0), width, height, 0);
        this.image = image;
    }

    /**
     * YAGNI.
     */
    public update(): void {
    }

    /**
     * Draws the pipe.
     */
    public draw(): void {
        push();
        noFill();

        if (this.height > this.image.height) {
            let maxImageYPos = Math.ceil(this.height / this.image.height) * this.image.height;
            for (let imageYPos = 0; imageYPos < maxImageYPos; imageYPos += this.image.height) {
                console.log("maximageypos: " + maxImageYPos);
                console.log("image height: " + this.image.height);
                console.log("imageypos: " + imageYPos);
                image(this.image, this.position.x, this.position.y + imageYPos, this.width, this.image.height);
            }
        } else {
            image(this.image, this.position.x, this.position.y, this.width, this.height);
        }

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