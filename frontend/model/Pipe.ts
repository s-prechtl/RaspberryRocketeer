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

        let imageAspectRatio = this.image.height / this.image.width;
        let computedImageHeight = imageAspectRatio * this.width;
        this.drawImage(computedImageHeight, imageAspectRatio); 

        rect(this.position.x, this.position.y, this.width, this.height);
        pop();
    }

    /**
     * Draws the image of the pipe into it (tiling and not stretching)
     * @param computedImageHeight image height on screen
     * @param imageAspectRatio aspect ratio of the image
     * @private
     */
    private drawImage(computedImageHeight: number, imageAspectRatio: number): void {
        if (this.height > computedImageHeight) {
            let maxImageYPos = Math.ceil(this.height / computedImageHeight) * computedImageHeight;
            for (let imageYPosition = 0; imageYPosition < maxImageYPos; imageYPosition += computedImageHeight) {
                if(imageYPosition + computedImageHeight >= maxImageYPos) {
                    this.cropLastImage(imageYPosition, computedImageHeight, imageAspectRatio);
                    break;
                }
                image(this.image, this.position.x, this.position.y + imageYPosition, this.width, computedImageHeight);
            }
        } else {
            image(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    }

    /**
     * Crops the last image in the pipe so that is doesn't get stretched or compressed
     * @param imageYPosition y-Position of the image
     * @param computedImageHeight image height on screen
     * @param imageAspectRatio aspect ratio of the image
     * @private
     */
    private cropLastImage(imageYPosition: number, computedImageHeight: number, imageAspectRatio: number): void {
        let amountOfImages = Math.floor(imageYPosition / computedImageHeight);
        let heightToEdge = this.height - (amountOfImages * computedImageHeight);
        let croppedImage = this.image.get(0, 0, this.image.width, this.image.height - (heightToEdge * imageAspectRatio));
        image(croppedImage, this.position.x, this.position.y + imageYPosition, this.width, heightToEdge);
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