export const SocketEvent = {
    CONNECT: "connect",
    DISCONNECT: "disconnect",

    PLAYER_INIT: "player:init",
    PLAYER_JOINED: "player:joined",
    PLAYER_LEFT: "player:left",
    PLAYER_MOVED: "player:move",
} as const;

export type SocketEventType = (typeof SocketEvent)[keyof typeof SocketEvent];
