export const PlayerEvent = {
    PLAYER_INIT: "player.init",
    PLAYER_ADDED: "player.added",
    PLAYER_REMOVED: "player.removed",
    PLAYER_MOVING: "player.moving",
    PLAYER_MOVED: "player.moved",
} as const;

export type PlayerEventType = (typeof PlayerEvent)[keyof typeof PlayerEvent];

export const GameAction = {
    DEBUG: "input.debug",

    MOVE: "input.move",
    MOVE_UP: "input.move.up",
    MOVE_DOWN: "input.move.down",
    MOVE_LEFT: "input.move.left",
    MOVE_RIGHT: "input.move.right",
    INTERACT: "input.interact",
    ATTACK: "input.attack",
    DEFEND: "input.defend",
    INVENTORY_TOGGLE: "input.inventory.toggle",
    MENU_OPEN: "input.menu.open",
} as const;

export type GameActionType = (typeof GameAction)[keyof typeof GameAction];
