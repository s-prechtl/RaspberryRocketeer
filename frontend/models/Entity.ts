class Entity {
   private _position: Position;
   private _width: number;
   private _height: number;

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
}