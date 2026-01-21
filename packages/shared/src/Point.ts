export interface IPoint {
    x: number;
    y: number;
}

export class Point implements IPoint {
    constructor(public x: number = 0, public y: number = 0) {}

    copyFrom(other: IPoint): this {
        this.x = other.x;
        this.y = other.y;
        return this;
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }

    add(other: IPoint): this {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    subtract(other: IPoint): this {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    multiply(scalar: number): this {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    distanceTo(other: IPoint): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.hypot(dx, dy);
    }

    magnitude(): number {
        return Math.hypot(this.x, this.y);
    }

    normalize(): this {
        const mag = this.magnitude();
        if (mag > 0) {
            this.multiply(1 / mag);
        }
        return this;
    }
}