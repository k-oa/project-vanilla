export const PlayerEvent = {
    PLAYER_ADDED: "player.added",
    PLAYER_REMOVED: "player.removed",
    PLAYER_MOVED: "player.moved",
    PLAYER_INIT: "player.init",
} as const;

export type PlayerEventType = (typeof PlayerEvent)[keyof typeof PlayerEvent];

// export enum Event {

//     UI_INVENTORY_TOGGLED = "ui.inventory.toggled",
//     UI_MENU_OPENED = "ui.menu.opened",
//     UI_MENU_CLOSED = "ui.menu.closed",

//     NETWORK_CONNECTED = "network.connected",
//     NETWORK_DISCONNECTED = "network.disconnected",
//     NETWORK_ERROR = "network.error",
// }
