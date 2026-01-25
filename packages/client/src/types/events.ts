import { PlayerEvent } from "../enums/Events";
import { Player } from "@project-vanilla/shared";

export type GameEvents = {
    [PlayerEvent.PLAYER_ADDED]: Player;
    [PlayerEvent.PLAYER_REMOVED]: string;
    [PlayerEvent.PLAYER_MOVED]: Player;
    [PlayerEvent.PLAYER_INIT]: Player;
};
