import { SocketEvent } from "@project-vanilla/protocol";
import { GameLoop } from "@project-vanilla/shared";
import { GameState } from "./GameState";
import { Renderer } from "../rendering/Renderer";
import { SocketManager } from "../network/SocketManager";
import { PlayerEvent, GameAction } from "../enums/Events";
import { InputManager } from "./InputManager";
import { PlaneGeometry } from "pixi.js";

export class Game extends GameLoop {
    renderer: Renderer;
    // sceneManager: SceneManager;
    socketManager!: SocketManager;
    inputManager: InputManager;
    private gameState: GameState;

    constructor() {
        super();
        this.gameState = new GameState();
        this.renderer = new Renderer();
        this.inputManager = new InputManager();
    }

    async init() {
        await this.renderer.init();
        this.setupEventListeners();

        const serverUrl =
            import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
        this.socketManager = new SocketManager(serverUrl, this.gameState);

        this.renderer.app.ticker.add(() => {
            if (!this.isRunning) return;
            this.tick(performance.now());
        });
        this.start();
    }

    private setupEventListeners(): void {
        this.gameState.on(PlayerEvent.PLAYER_ADDED, (player) => {
            this.renderer.drawPlayer(player);
        });

        this.gameState.on(PlayerEvent.PLAYER_REMOVED, (id) => {
            this.renderer.removePlayer(id);
        });

        // Debug
        this.inputManager.on(GameAction.DEBUG, (data) => {
            console.log(this.gameState.socketEventLog);
        });

        this.inputManager.on(GameAction.MOVE, (data) => {
            const player = this.gameState.players[this.gameState.playerId];
            this.movePlayer(player, data);
            this.socketManager.socket.emit(SocketEvent.PLAYER_MOVING, {
                moveDirection: data,
            });
        });
    }

    protected process(delta: number): void {
        this.inputManager.updateMovement();
        for (const player of Object.values(this.gameState.players)) {
            if (player.state === "moving") {
                this.renderer.updatePlayerPosition(player.id, player.position);
                player.state = "idle";
            }
        }
    }

    protected physicsProcess(delta: number): void {}
}
