import { TileType } from "./Tile";

export class TileMap {
    width: number = 0;
    height: number = 0;
    tiles: TileType[][];

    readonly SIZE = 16;

    constructor() {
        this.tiles = [];
        for (let y = 0; y < this.SIZE; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.SIZE; x++) {
                this.tiles[y][x] = TileType.GRASS;
                if (Math.random() < 0.5) this.tiles[y][x] = TileType.AIR;
            }
        }
    }
}
