import { Player } from "@project-vanilla/shared";
import { Point } from "@project-vanilla/shared";
import { GameLoop } from "@project-vanilla/shared";
import { PlayerMovingPayload } from "@project-vanilla/protocol";

export class GameServer extends GameLoop {
    players: Map<string, Player>;
    private intervalId?: NodeJS.Timeout;

    constructor() {
        super();
        this.players = new Map();

        this.start();
        const TARGET_FPS = 60;
        this.intervalId = setInterval(() => {
            if (!this.isRunning) return;
            this.tick(performance.now());
        }, 1000 / TARGET_FPS);
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

    protected process(delta: number): void {}
    protected physicsProcess(delta: number): void {}
}
