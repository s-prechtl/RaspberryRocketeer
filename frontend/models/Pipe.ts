class Pipe extends Entity {
    private _image: any;

    //region Getter & Setter
    get image() {
        return this._image;
    }

    set image(path: string) {
        this._image = loadImage(path);
    }
    //endregion

    constructor(positionX: number, width: number, height: number) {
        super(new Position(positionX, 0), width, height, 0);
    }

    public update(): void {}

    public draw(): void {
        // @ts-ignore
        image(this.image, this.position.x, this.position.y, this.width, this.height);
        noFill();
        rect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
}