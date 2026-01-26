import { Player } from "@project-vanilla/shared";
import { Point } from "@project-vanilla/shared";

export class GameServer {
    players: Map<string, Player>;

    constructor() {
        this.players = new Map();
    }

    addPlayer(socketId: string): Player {
        const player = new Player(
            `player_${Math.floor(Math.random() * 1000)}`,
            new Point(Math.random() * 600, Math.random() * 600)
        );
        this.players.set(socketId, player);
        return player;
    }

    removePlayer(socketId: string): string {
        const player = this.players.get(socketId);
        if (!player) return "";

        this.players.delete(socketId);
        return player.id;
    }

    getPlayer(socketId: string): Player | undefined {
        return this.players.get(socketId);
    }
}
