import { Server, Socket } from "socket.io";
import { Player } from "@project-vanilla/shared";
import { Point } from "@project-vanilla/shared";

export class SocketManager {
    io: Server;
    players: Map<string, Player>; //  socketId -> Player

    constructor(io: Server) {
        this.io = io;
        this.players = new Map();
    }

    createPlayer(socketId: string) {
        const player: Player = new Player(
            `player_${this.players.size}`,
            new Point(400, 300)
        );
        this.players.set(socketId, player);
        return player;
    }

    handleConnection(socket: Socket) {
        const player = this.createPlayer(socket.id);

        socket.emit("player:init", {
            id: player.id,
            position: { x: player.position.x, y: player.position.y },
        }); // TODO we shouldn give player their id i think
        socket.broadcast.emit("player:joined", {
            id: player.id,
            position: { x: player.position.x, y: player.position.y },
        });

        socket.on("disconnect", () => this.handleDisconnect(socket));
        // socket.on('player:moved', (data) => this.handlePlayerMove(socket, data));
        // socket.on('player:chat', (data) => this.handlePlayerChat(socket, data));
    }

    handleDisconnect(socket: Socket) {
        const player = this.players.get(socket.id);
        if (!player) {
            return;
        }
        this.io.emit("player:left", player.id);
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
