import { GameState } from "./GameState";
import { Renderer } from "../rendering/Renderer";
import { SocketManager } from "../network/SocketManager";
import { PlayerEvent } from "../enums/Events";
// import { InputManager } from "./InputManager";

export class Game {
    renderer: Renderer;
    // sceneManager: SceneManager;
    socketManager!: SocketManager;
    // inputManager: InputManager;
    private gameState: GameState;

    constructor() {
        this.gameState = new GameState();
        this.renderer = new Renderer();
    }

    async init() {
        await this.renderer.init();
        this.setupStateListeners();

        const serverUrl =
            import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
        this.socketManager = new SocketManager(serverUrl, this.gameState);
    }

    private setupStateListeners(): void {
        this.gameState.on(PlayerEvent.PLAYER_INIT, (player) => {
            return;
        });

        this.gameState.on(PlayerEvent.PLAYER_ADDED, (player) => {
            this.renderer.drawPlayer(player);
        });

        this.gameState.on(PlayerEvent.PLAYER_REMOVED, (id) => {
            this.renderer.removePlayer(id);
        });
    }
}
