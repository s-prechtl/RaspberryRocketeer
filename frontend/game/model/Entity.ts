/**
 * General rectangular entities.
 */
abstract class Entity {
    /**
     * Position.
     * @private
     */
    private _position: Position;

    /**
     * Width.
     * @private
     */
    private _width: number;

    /**
     * Height.
     * @private
     */
    private _height: number;

    /**
     * Color.
     * @private
     */
    private fill: number;

    /**
     * Whether the hitbox (rectangular surrounding) is shown, or not.
     * @private
     */
    private _showHitbox: boolean;

    //region Getter & Setter

    /**
     * Get position.
     */
    get position(): Position {
        return this._position;
    }

    /**
     * Set position.
     * @param value
     */
    set position(value: Position) {
        this._position = value;
    }

    /**
     * Get width.
     */
    get width(): number {
        return this._width;
    }

    /**
     * Set width.
     * @param value
     */
    set width(value: number) {
        this._width = value;
    }

    /**
     * Get height.
     */
    get height(): number {
        return this._height;
    }

    /**
     * Set height.
     * @param value
     */
    set height(value: number) {
        this._height = value;
    }

    /**
     * Get the hitbox's visibility.
     */
    get showHitbox(): boolean {
        return this._showHitbox;
    }

    /**
     * Set the hitbox's visibility.
     * @param value
     */
    set showHitbox(value: boolean) {
        this._showHitbox = value;
    }
    //endregion

    /**
     * Constructs the Entity.
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
