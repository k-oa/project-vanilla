import { Point } from './Point.js';


export class Player {
    constructor(id: string, position: Point) {
        this.id = id;
        this.position = new Point().copyFrom(position);
    }

    id: string;
    position: Point;
}