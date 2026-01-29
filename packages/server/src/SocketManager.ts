import { Server, Socket } from "socket.io";
import { PlayerDTO, SocketEvent } from "@project-vanilla/protocol";
import {
    ServerToClientEvents,
    ClientToServerEvents,
} from "@project-vanilla/protocol";
import { GameServer } from "./GameServer";

type TypedServer = Server<ClientToServerEvents, ServerToClientEvents>;
type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

export class SocketManager {
    io: TypedServer;
    gameServer: GameServer;

    constructor(io: TypedServer, gameServer: GameServer) {
        this.io = io;
        this.gameServer = gameServer;
    }

    handleConnection(socket: TypedSocket) {
        const player = this.gameServer.addPlayer(socket.id);
        const players: Record<string, PlayerDTO> = {};

        this.gameServer.players.forEach((p) => {
            players[p.id] = p.toDTO();
        });

        socket.emit(SocketEvent.PLAYER_INIT, {
            playerId: player.id,
            players: players,
        });
        socket.broadcast.emit(SocketEvent.PLAYER_JOINED, player.toDTO());

        socket.on(SocketEvent.DISCONNECT, () => this.handleDisconnect(socket));

        socket.on("player:moving", (data) => {
            socket.broadcast.emit("player:moving", data);
        });
    }

    handleDisconnect(socket: TypedSocket) {
        const playerId = this.gameServer.removePlayer(socket.id);
        if (!playerId) return;
        this.io.emit(SocketEvent.PLAYER_LEFT, playerId);
    }
}
