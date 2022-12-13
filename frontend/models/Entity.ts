abstract class Entity {
    private _position: Position;
    private _width: number;
    private _height: number;
    private fill: number;

    //region Getter & Setter
    get position(): Position {
        return this._position;
    }

    set position(value: Position) {
        this._position = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }
    //endregion

    protected constructor(position: Position, width: number, height: number, fill: number) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.fill = fill;
    }

    public abstract update(): void;

    public draw(): void {
        fill(this.fill);
        rect(this.position.x, this.position.y, this.width, this.height);
    }
}
