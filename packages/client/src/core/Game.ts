import { Application, Graphics } from "pixi.js";
import { SocketManager } from "../network/SocketManager";
// import { InputManager } from "./InputManager";

export class Game {
    app: Application;
    // sceneManager: SceneManager;
    socketManager: SocketManager;
    // inputManager: InputManager;

    constructor() {
        this.app = new Application();
        const serverUrl =
            import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
        this.socketManager = new SocketManager(serverUrl);
        console.log("SocketManager initialized:", this.socketManager);
        // this.inputManager = new InputManager();
    }

    async init() {
        await this.app.init({
            resizeTo: window,
        });
        this.app.canvas.style.position = "absolute";
        this.app.canvas.style.imageRendering = "pixelated";
        document.body.appendChild(this.app.canvas);
    }
}

// const rectangle = new Graphics().rect(10, 10, 30, 30).fill({
//     color: 0xff8080,
// });
// app.stage.addChild(rectangle);

// rectangle.eventMode = "static";
// rectangle.cursor = "pointer";

// rectangle.on("pointertap", () => {
//     console.log("Tap! My player ID is:", socketManager.myPlayerId);
//     // toggleFullscreen();
// });

// function toggleFullscreen() {
//     if (!document.fullscreenElement) {
//         // Enter fullscreen
//         document.documentElement.requestFullscreen().catch((err) => {
//             console.log(
//                 `Error attempting to enable fullscreen: ${err.message}`
//             );
//         });
//     } else {
//         // Exit fullscreen
//         document.exitFullscreen();
//     }
// }
// //     socketManager.sendMove(100, 100);
