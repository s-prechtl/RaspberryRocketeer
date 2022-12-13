class Pipe extends Entity implements Collidable {
    private _image: any;

    //region Getter & Setter
    get image(): any {
        return this._image;
    }

    set image(path: string) {
        this._image = loadImage(path);
    }

    //endregion

    constructor(positionX: number, width: number, height: number) {
        super(new Position(positionX, 0), width, height, 0);
    }

    public update(): void {
    }

    public draw(): void {
        image(this.image, this.position.x, this.position.y, this.width, this.height);
        noFill();
        rect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    collides(o: Entity): boolean {
        return this.position.x < o.position.x + o.width && //inside left border
            this.position.x + this.width > o.position.x && //but not outside right border
            this.position.y < o.position.y + o.height && //inside top border
            this.position.y + this.height > o.position.y; //but not outside bottom border
    }
}