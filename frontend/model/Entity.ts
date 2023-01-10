abstract class Entity {
    private _position: Position;
    private _width: number;
    private _height: number;
    private fill: number;
    private _showHitbox: boolean;

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

    get showHitbox(): boolean {
        return this._showHitbox;
    }

    set showHitbox(value: boolean) {
        this._showHitbox = value;
    }
    //endregion

    /**
     * Constructs the Entity
     * @param position starting Position
     * @param width entity width
     * @param height entity height
     * @param fill fill color
     */
    protected constructor(position: Position, width: number, height: number, fill: number) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.fill = fill;
        this._showHitbox = false;
    }

    /**
     * Updates the entity.
     */
    public abstract update(): void;

    /**
     * Draws the entity.
     */
    public draw(): void {
        push();
        fill(this.fill);
        rect(this.position.x, this.position.y, this.width, this.height);
        pop();
    }
}
