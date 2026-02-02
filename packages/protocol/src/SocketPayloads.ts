import { PlayerDTO } from "./dto";
import { SocketEvent } from "./SocketEvent";

export interface PlayerInitPayload {
    playerId: string;
    players: Record<string, PlayerDTO>;
}

export interface PlayerMovingPayload {
    moveDirection: { x: number; y: number };
}

export interface PlayerMovedPayload {
    playerId: string;
    newPosition: { x: number; y: number };
}

export type ServerToClientEvents = {
    [SocketEvent.CONNECT]: () => void;
    [SocketEvent.DISCONNECT]: () => void;
    [SocketEvent.PLAYER_INIT]: (data: PlayerInitPayload) => void;
    [SocketEvent.PLAYER_JOINED]: (player: PlayerDTO) => void;
    [SocketEvent.PLAYER_LEFT]: (playerId: string) => void;
    [SocketEvent.PLAYER_MOVED]: (data: PlayerMovedPayload) => void;
};

export type ClientToServerEvents = {
    [SocketEvent.PLAYER_MOVING]: (data: PlayerMovingPayload) => void;
};
