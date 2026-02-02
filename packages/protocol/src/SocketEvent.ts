export const SocketEvent = {
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    PLAYER_INIT: "player:init",
    PLAYER_JOINED: "player:joined",
    PLAYER_MOVING: "player:moving",
    PLAYER_MOVED: "player:moved",
    PLAYER_LEFT: "player:left",
} as const;

export type SocketEventType = (typeof SocketEvent)[keyof typeof SocketEvent];
