import { EventEmitter } from "./EventEmitter";
import { GameActions } from "../types/events";
import { GameAction, GameActionType } from "../enums/Events";

export class InputManager extends EventEmitter<GameActions> {
    private keys: Set<string> = new Set();
    private mousePosition = { x: 0, y: 0 };
    private mouseButtons: Set<number> = new Set();
    private gamepadIndex: number | null = null;

    private keyBindings: Map<string, GameActionType> = new Map([
        ["e", GameAction.INTERACT],
        ["space", GameAction.ATTACK],
        ["shift", GameAction.DEFEND],
        ["i", GameAction.INVENTORY_TOGGLE],
        ["escape", GameAction.MENU_OPEN],
    ]);

    private movementKeys: Map<string, GameActionType> = new Map([
        ["w", GameAction.MOVE_UP],
        ["a", GameAction.MOVE_LEFT],
        ["s", GameAction.MOVE_DOWN],
        ["d", GameAction.MOVE_RIGHT],
        ["arrowup", GameAction.MOVE_UP],
        ["arrowleft", GameAction.MOVE_LEFT],
        ["arrowdown", GameAction.MOVE_DOWN],
        ["arrowright", GameAction.MOVE_RIGHT],
    ]);

    constructor() {
        super();
        this.setupListeners();
    }

    private setupListeners(): void {
        // Keyboard
        window.addEventListener("keydown", this.handleKeyDown);
        window.addEventListener("keyup", this.handleKeyUp);

        // Mouse
        // window.addEventListener("mousedown", this.handleMouseDown);
        // window.addEventListener("mouseup", this.handleMouseUp);
        // window.addEventListener("mousemove", this.handleMouseMove);
        // window.addEventListener("wheel", this.handleMouseWheel);

        // Touch
        // window.addEventListener("touchstart", this.handleTouchStart);
        // window.addEventListener("touchmove", this.handleTouchMove);
        // window.addEventListener("touchend", this.handleTouchEnd);

        // Gamepad
        // window.addEventListener(
        //     "gamepadconnected",
        //     this.handleGamepadConnected
        // );
        // window.addEventListener(
        //     "gamepaddisconnected",
        //     this.handleGamepadDisconnected
        // );
    }

    private handleKeyDown = (e: KeyboardEvent): void => {
        const key = e.key.toLowerCase();
        if (this.keys.has(key)) return;
        this.keys.add(key);

        const action = this.keyBindings.get(key);
        if (!action) return;
        this.emit(action, undefined);
    };

    private handleKeyUp = (e: KeyboardEvent): void => {
        this.keys.delete(e.key.toLowerCase());
    };

    public updateMovement(): void {
        let x = 0;
        let y = 0;

        for (const [key, action] of this.movementKeys) {
            if (this.keys.has(key)) {
                switch (action) {
                    case GameAction.MOVE_UP:
                        y -= 1;
                        break;
                    case GameAction.MOVE_DOWN:
                        y += 1;
                        break;
                    case GameAction.MOVE_LEFT:
                        x -= 1;
                        break;
                    case GameAction.MOVE_RIGHT:
                        x += 1;
                        break;
                }
            }
        }

        if (x || y) {
            const length = Math.hypot(x, y);

            this.emit(GameAction.MOVE, {
                x: x / length,
                y: y / length,
            });
        }
    }
}
