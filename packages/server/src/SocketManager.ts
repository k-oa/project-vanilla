import { Server, Socket } from "socket.io";
import { Player } from "@project-vanilla/shared";
import { Point } from "@project-vanilla/shared";
import { SocketEvent } from "@project-vanilla/protocol";
import {
    ServerToClientEvents,
    ClientToServerEvents,
} from "@project-vanilla/protocol";

type TypedServer = Server<ClientToServerEvents, ServerToClientEvents>;
type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

export class SocketManager {
    io: TypedServer;
    players: Map<string, Player>; //  socketId -> Player

    constructor(io: TypedServer) {
        this.io = io;
        this.players = new Map();
    }

    createPlayer(socketId: string) {
        const player: Player = new Player(
            `player_${this.players.size}`,
            new Point(Math.random() * 600, Math.random() * 600)
        );
        this.players.set(socketId, player);
        return player;
    }

    handleConnection(socket: TypedSocket) {
        const player = this.createPlayer(socket.id);

        socket.emit(SocketEvent.PLAYER_INIT, {
            id: player.id,
            position: { x: player.position.x, y: player.position.y },
        });
        socket.broadcast.emit(SocketEvent.PLAYER_JOINED, {
            id: player.id,
            position: { x: player.position.x, y: player.position.y },
        });

        socket.on(SocketEvent.DISCONNECT, () => this.handleDisconnect(socket));
    }

    handleDisconnect(socket: TypedSocket) {
        const player = this.players.get(socket.id);
        if (!player) {
            return;
        }
        this.io.emit(SocketEvent.PLAYER_LEFT, player.id);
        this.players.delete(socket.id);
    }
}
