import { io, Socket } from "socket.io-client";
import { Player } from "@project-vanilla/shared";
import { Point } from "@project-vanilla/shared";
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
            const position = new Point(data.position.x, data.position.y);
            const p = new Player(data.id, position);
            this.gameState.initPlayer(p);
        });

        this.socket.on(SocketEvent.PLAYER_JOINED, (data) => {
            const position = new Point(data.position.x, data.position.y);
            const p = new Player(data.id, position);
            this.gameState.addPlayer(p);
        });
    }

    handlePlayerJoined(data: {
        id: string;
        position: { x: number; y: number };
    }) {
        const player = new Player(
            data.id,
            new Point(data.position.x, data.position.y)
        );
        console.log("Player joined:", data.id);
    }

    disconnect() {
        this.socket.disconnect();
    }
}
