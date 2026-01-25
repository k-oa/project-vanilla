import { SocketEvent } from "./SocketEvent";

export interface PlayerInitPayload {
    id: string;
    position: { x: number; y: number };
}

export interface PlayerJoinedPayload {
    id: string;
    position: { x: number; y: number };
}

export interface PlayerMovedPayload {
    id: string;
    position: { x: number; y: number };
}

export interface PlayerMovePayload {
    x: number;
    y: number;
}

export interface ChatMessagePayload {
    message: string;
}

export interface ChatMessageBroadcastPayload {
    playerId: string;
    message: string;
}

export interface ServerToClientEvents {
    [SocketEvent.CONNECT]: () => void;
    [SocketEvent.DISCONNECT]: () => void;

    [SocketEvent.PLAYER_INIT]: (data: PlayerInitPayload) => void;
    [SocketEvent.PLAYER_JOINED]: (data: PlayerJoinedPayload) => void;
    [SocketEvent.PLAYER_MOVED]: (data: PlayerMovedPayload) => void;
    [SocketEvent.PLAYER_LEFT]: (playerId: string) => void;
}

export interface ClientToServerEvents {
    [SocketEvent.PLAYER_MOVED]: (data: PlayerMovePayload) => void;
}
