export const PlayerEvent = {
    PLAYER_ADDED: "player.added",
    PLAYER_REMOVED: "player.removed",
    PLAYER_MOVED: "player.moved",
    PLAYER_INIT: "player.init",
} as const;

export type PlayerEventType = (typeof PlayerEvent)[keyof typeof PlayerEvent];
