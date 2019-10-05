class VectorField {
    constructor(span) {
        this.span = span;
        this.bound = (span - 1) / 2;

        this._field = Array.from({ length: this.span }).fill(
            Array.from({ length: this.span }).fill(
                new Vector2D(1, 1),
                0,
                this.span
            ),
            0,
            this.span
        );
    }

    getValueAt(point) {
        this._checkForIndex(point);
        const { x, y } = this._translateToIndex(point);
        return this._field[x][y];
    }

    setValueAt(point, value) {
        this._checkForIndex(point);
        const { x, y } = this._translateToIndex(point);
        this._field[x][y] = value;
    }

    _translateToIndex(point) {
        return point.pipe(
            V2D.multiply(new Vector2D(1, -1)),
            V2D.add(new Vector2D(7, 7))
        );
    }

    _translateFromIndex(point) {
        return point.pipe(
            V2D.sub(new Vector2D(7, 7)),
            V2D.mult(new Vector2D(1, -1)),
        );
    }

    _checkForIndex(point) {
        try {
            this._checkValue(point.x);
            this._checkValue(point.y);
        } catch(e) {
            throw `GridError: ${point} out of bound.\n${e}`;
        }
    }

    _checkBounds(point) {
        this._checkBound(point.x);
        this._checkBound(point.y);
    }

    _checkValue(value) {
        this._checkIsIndex(value);
        this._checkBound(value);
    }

    _checkIsIndex(value) {
        if (value !== Math.floor(value)) {
            throw `ValueError: ${value} must be integer.`;
        }
    }

    _checkBound(value) {
        if (value > this.bound) {
            throw `ValueError: ${value} too large.`;
        }
        if (value < -this.bound) {
            throw `ValueError: ${value} too small.`;
        }
    }

    draw() {
        this._field.forEach((column, x) => {
            column.forEach((row, y) => {
                const center = Grid.getCoordiantesOf(this._translateFromIndex(new Vector2D(x, y)));

                row.pipe(
                    V2D.add(center),
                    V2D.draw(center)    
                );
            })
        });
    }
}