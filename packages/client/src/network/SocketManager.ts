import { io, Socket } from "socket.io-client";
import { Player } from "@project-vanilla/shared";
import { SocketEvent } from "@project-vanilla/protocol";
import {
    ServerToClientEvents,
    ClientToServerEvents,
} from "@project-vanilla/protocol";
import { GameState } from "../core/GameState";

export class SocketManager {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    gameState: GameState;

    constructor(serverUrl: string, gameState: GameState) {
        this.socket = io(serverUrl);
        this.gameState = gameState;
        this.setupListeners();
    }

    setupListeners() {
        this.socket.on(SocketEvent.CONNECT, () => {
            console.log("Connected to server");
        });

        this.socket.on(SocketEvent.DISCONNECT, () => {
            console.log("Disconnected from server");
        });

        this.socket.on(SocketEvent.PLAYER_INIT, (data) => {
            this.gameState.initPlayer(data);
        });

        this.socket.on(SocketEvent.PLAYER_JOINED, (player) => {
            this.gameState.addPlayer(Player.fromDTO(player));
        });

        this.socket.on(SocketEvent.PLAYER_LEFT, (id) => {
            this.gameState.removePlayer(id);
        });

        this.socket.on(SocketEvent.PLAYER_MOVING, (data) => {
            this.gameState.movePlayer(data.id, data.moveDirection);
        });
    }

    disconnect() {
        this.socket.disconnect();
    }
}
