import { SocketEvent } from "./SocketEvent";
import { PlayerDTO } from "./dto";

export interface PlayerInitPayload {
    playerId: string;
    players: Record<string, PlayerDTO>;
}

export interface PlayerJoinedPayload {
    player: PlayerDTO;
}

export interface PlayerMovedPayload {
    id: string;
    position: { x: number; y: number };
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
    // [SocketEvent.PLAYER_MOVED]: (data: PlayerMovePayload) => void;
}
