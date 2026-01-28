import { GameState } from "./GameState";
import { Renderer } from "../rendering/Renderer";
import { SocketManager } from "../network/SocketManager";
import { PlayerEvent, GameAction } from "../enums/Events";
import { InputManager } from "./InputManager";
import { GameLoop } from "@project-vanilla/shared";

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

        this.setupGameLoop();
        this.start();
    }

    private setupEventListeners(): void {
        this.gameState.on(PlayerEvent.PLAYER_INIT, (player) => {
            return;
        });

        this.gameState.on(PlayerEvent.PLAYER_ADDED, (player) => {
            this.renderer.drawPlayer(player);
        });

        this.gameState.on(PlayerEvent.PLAYER_REMOVED, (id) => {
            this.renderer.removePlayer(id);
        });

        this.inputManager.on(GameAction.MOVE, (data) => {
            const player = this.gameState.players[this.gameState.playerId!];
            const playerSprite = this.renderer.updatePlayerPosition(player.id, {
                x: data.direction.x,
                y: data.direction.y,
            });
        });
    }

    private setupGameLoop(): void {
        this.renderer.app.ticker.add(() => {
            if (!this.isRunning) return;
            this.tick(performance.now());
        });
    }

    public start(): void {
        this.isRunning = true;
        this.lastTime = performance.now();
        this.renderer.app.ticker.start();
    }

    public stop(): void {
        super.stop();
        this.renderer.app.ticker.stop();
    }

    protected _process(delta: number): void {
        console.log("x");
        this.inputManager.updateMovement();
    }

    protected _physicsProcess(delta: number): void {}
}
