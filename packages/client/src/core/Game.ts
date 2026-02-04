import { SocketEvent } from "@project-vanilla/protocol";
import { GameLoop } from "@project-vanilla/shared";
import { GameState } from "./GameState";
import { Renderer } from "../rendering/Renderer";
import { SocketManager } from "../network/SocketManager";
import { PlayerEvent, GameAction } from "../enums/Events";
import { InputManager } from "./InputManager";
import { PlaneGeometry } from "pixi.js";
import { TileMap } from "@project-vanilla/shared";

export class Game extends GameLoop {
    renderer: Renderer;
    // sceneManager: SceneManager;
    socketManager!: SocketManager;
    inputManager: InputManager;
    private tileMap: TileMap;
    private gameState: GameState;

    constructor() {
        super();
        this.gameState = new GameState();
        this.renderer = new Renderer();
        this.inputManager = new InputManager();
        this.tileMap = new TileMap();
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
        const tileSize = 32 * 3;

        for (const [y, row] of this.tileMap.tiles.entries()) {
            for (const [x, tile] of row.entries()) {
                this.renderer.drawTile({
                    x: (x * tileSize * 1 + y * tileSize * -1) / 2,
                    y: (y * tileSize * 0.5 + x * tileSize * 0.5) / 2,
                });
            }
        }
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
