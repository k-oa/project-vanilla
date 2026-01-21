import { io, Socket } from "socket.io-client";
import { Player } from "@project-vanilla/shared";
import { Point } from "@project-vanilla/shared";

// rectangle.on("pointertap", sendMessage);

// function sendMessage() {
//     socket.emit("message", "Tap!");
// }

// socket.on("connect", () => {
//     socket.emit("message", "Hello from Pixi!");
// });

// socket.on("message", (msg) => {
//     console.log("From server:", msg);
// });

export class SocketManager {
    socket: Socket;
    players: Map<string, Player>; // playerId -> Player  // this should be in PlayerManager
    myPlayerId: string | null; // this should be in PlayerManager

    constructor(serverUrl: string) {
        this.socket = io(serverUrl);
        this.players = new Map();
        this.myPlayerId = null;

        this.setupListeners();
    }

    setupListeners() {
        this.socket.on("connect", () => {
            console.log("Connected to server");
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        this.socket.on("player:init", (data) => this.handleInit(data));
        this.socket.on("player:joined", (data) =>
            this.handlePlayerJoined(data)
        );
        // this.socket.on("player:left", (playerId) =>
        //     this.handlePlayerLeft(playerId)
        // );
        //     this.socket.on("player:moved", (data) => this.handlePlayerMoved(data));
    }

    handleInit(data: { id: string; position: { x: number; y: number } }) {
        this.myPlayerId = data.id;
        const player = new Player(
            data.id,
            new Point(data.position.x, data.position.y)
        );
        this.players.set(data.id, player);
        console.log("Initialized as:", data.id);
    }

    handlePlayerJoined(data: {
        id: string;
        position: { x: number; y: number };
    }) {
        const player = new Player(
            data.id,
            new Point(data.position.x, data.position.y)
        );
        this.players.set(data.id, player);
        console.log("Player joined:", data.id);
    }

    disconnect() {
        this.socket.disconnect();
    }

    // handlePlayerLeft(playerId: string) {
    //     this.players.delete(playerId);
    //     console.log("Player left:", playerId);
    // }

    // handlePlayerMoved(data: {
    //     id: string;
    //     position: { x: number; y: number };
    // }) {
    //     const player = this.players.get(data.id);
    //     if (player) {
    //         player.position.x = data.position.x;
    //         player.position.y = data.position.y;
    //     }
    // }

    // sendMove(x: number, y: number) {
    //     this.socket.emit("player:move", { x, y });
    // }

    // getMyPlayer(): Player | undefined {
    //     if (!this.myPlayerId) return undefined;
    //     return this.players.get(this.myPlayerId);
    // }

    // getAllPlayers(): Player[] {
    //     return Array.from(this.players.values());
    // }

    // getOtherPlayers(): Player[] {
    //     return this.getAllPlayers().filter((p) => p.id !== this.myPlayerId);
    // }
}
