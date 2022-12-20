class Position {
    private _x: number;
    private _y: number;

    //region Getter & Setter
    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }
    //endregion

    /**
     * Constructs the position
     * @param x x-Position
     * @param y y-Position
     */
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
}