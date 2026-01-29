import { PlayerEvent, GameAction } from "../enums/Events";
import { Player } from "@project-vanilla/shared";

export type GameEvents = {
    [PlayerEvent.PLAYER_INIT]: Player;
    [PlayerEvent.PLAYER_ADDED]: Player;
    [PlayerEvent.PLAYER_REMOVED]: string;

    [PlayerEvent.PLAYER_MOVING]: {
        id: string;
        moveDirection: { x: number; y: number };
    };
    [PlayerEvent.PLAYER_STOP_MOVING]: { id: string };
};

export type GameActions = {
    [GameAction.MOVE]: { x: number; y: number };
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
