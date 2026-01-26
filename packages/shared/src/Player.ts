import { PlayerDTO } from "@project-vanilla/protocol";
import { Point } from "./Point";

export class Player {
    constructor(id: string, position: Point) {
        this.id = id;
        this.position = new Point().copyFrom(position);
    }

    id: string;
    position: Point;

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
