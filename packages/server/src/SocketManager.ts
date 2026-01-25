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
        // socket.on('player:moved', (data) => this.handlePlayerMove(socket, data));
        // socket.on('player:chat', (data) => this.handlePlayerChat(socket, data));
    }

    handleDisconnect(socket: TypedSocket) {
        const player = this.players.get(socket.id);
        if (!player) {
            return;
        }
        this.io.emit(SocketEvent.PLAYER_LEFT, player.id);
        this.players.delete(socket.id);
    }

    //   handleMove(socket, data) {
    //     const player = this.players.get(socket.id);
    //     if (!player) return;

    //     const dist = Math.hypot(data.x - player.x, data.y - player.y);
    //     if (dist > 10) return;

    //     player.x = data.x;
    //     player.y = data.y;

    //     socket.broadcast.emit('player:moved', {
    //       id: player.id,
    //       x: player.x,
    //       y: player.y
    //     });
    //   }

    //   handleChat(socket, data) {
    //     const player = this.players.get(socket.id);
    //     if (!player) return;

    //     const msg = data.message.trim().substring(0, 200);
    //     socket.broadcast.emit('player:chat', { id: player.id, message: msg });
    //   }
}
