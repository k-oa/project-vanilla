import { EventEmitter } from "./EventEmitter";
import { PlayerEvent } from "../enums/Events";
import { GameEvents } from "../types/events";
import { Player } from "@project-vanilla/shared";
import { PlayerInitPayload } from "@project-vanilla/protocol";

export class GameState extends EventEmitter<GameEvents> {
    players: Record<string, Player> = {};
    playerId: string | null = null;

    isInventoryOpen: boolean = false;
    isMenuOpen: boolean = false;

    initPlayer(data: PlayerInitPayload): void {
        this.playerId = data.playerId;
        this.players = {};

        for (const p of Object.values(data.players)) {
            this.addPlayer(Player.fromDTO(p));
        }
    }

    addPlayer(player: Player): void {
        this.players[player.id] = player;
        this.emit(PlayerEvent.PLAYER_ADDED, player);
    }

    removePlayer(id: string): void {
        const player = this.players[id];
        if (!player) return;

        delete this.players[id];
        this.emit(PlayerEvent.PLAYER_REMOVED, id);
    }

    movePlayer(id: string, moveDirection: { x: number; y: number }): void {
        const player = this.players[id];
        if (!player) return;

        player.position.x += moveDirection.x;
        player.position.y += moveDirection.y;
        this.emit(PlayerEvent.PLAYER_MOVING, { id, moveDirection });
    }
}
