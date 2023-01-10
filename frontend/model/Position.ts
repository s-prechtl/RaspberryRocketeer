/**
 * 2D Point.
 */
class Position {
    /**
     * X coordinate.
     * @private
     */
    private _x: number;

    /**
     * Y coordinate.
     * @private
     */
    private _y: number;

    //region Getter & Setter

    /**
     * Get x.
     */
    get x(): number {
        return this._x;
    }

    /**
     * Set x.
     * @param value
     */
    set x(value: number) {
        this._x = value;
    }

    /**
     * Get y.
     */
    get y(): number {
        return this._y;
    }

    /**
     * Set y.
     * @param value
     */
    set y(value: number) {
        this._y = value;
    }
    //endregion

    /**
     * Constructs the position.
     * @param x x-Position
     * @param y y-Position
     */
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
}