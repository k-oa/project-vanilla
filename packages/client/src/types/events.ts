import { PlayerEvent, GameAction } from "../enums/Events";
import { Player } from "@project-vanilla/shared";

export type GameEvents = {
    [PlayerEvent.PLAYER_ADDED]: Player;
    [PlayerEvent.PLAYER_REMOVED]: string;
    [PlayerEvent.PLAYER_MOVED]: Player;
    [PlayerEvent.PLAYER_INIT]: Player;
};

export type GameActions = {
    [GameAction.MOVE]: { direction: { x: number; y: number } };
    [GameAction.MOVE_UP]: void;
    [GameAction.MOVE_DOWN]: void;
    [GameAction.MOVE_LEFT]: void;
    [GameAction.MOVE_RIGHT]: void;
    [GameAction.INTERACT]: void;
    [GameAction.ATTACK]: void;
    [GameAction.DEFEND]: void;
    [GameAction.INVENTORY_TOGGLE]: void;
    [GameAction.MENU_OPEN]: void;
};
