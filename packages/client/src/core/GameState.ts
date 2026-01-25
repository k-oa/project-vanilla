import { EventEmitter } from "./EventEmitter";
import { PlayerEvent } from "../enums/Events";
import { GameEvents } from "../types/events";
import { Player } from "@project-vanilla/shared";
import { Point } from "@project-vanilla/shared";

export class GameState extends EventEmitter<GameEvents> {
    players: Map<string, Player> = new Map();
    myPlayerId: string | null = null;

    isInventoryOpen: boolean = false;
    isMenuOpen: boolean = false;

    initPlayer(player: Player): void {
        console.log("My player ID is:", player.id);
        this.myPlayerId = player.id;
        this.emit(PlayerEvent.PLAYER_INIT, player);
        this.addPlayer(player);
    }

    addPlayer(player: Player): void {
        this.players.set(player.id, player);
        this.emit(PlayerEvent.PLAYER_ADDED, player);
    }

    removePlayer(id: string): void {
        const player = this.players.get(id);
        if (player) {
            this.players.delete(id);
            this.emit(PlayerEvent.PLAYER_REMOVED, id);
        }
    }

    updatePlayerPosition(id: string, position: Point): void {
        const player = this.players.get(id);
        if (player) {
            player.position.x = position.x;
            player.position.y = position.y;
            this.emit(PlayerEvent.PLAYER_MOVED, player);
        }
    }
}
