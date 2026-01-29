import { PlayerDTO } from "@project-vanilla/protocol";
import { Point } from "./Point";

export class Player {
    id: string;
    position: Point;
    speed: number = 5;

    constructor(id: string, position: Point) {
        this.id = id;
        this.position = new Point().copyFrom(position);
    }

    toDTO(): PlayerDTO {
        return {
            id: this.id,
            position: { x: this.position.x, y: this.position.y },
        };
    }

    static fromDTO(dto: PlayerDTO): Player {
        return new Player(dto.id, new Point(dto.position.x, dto.position.y));
    }
}
