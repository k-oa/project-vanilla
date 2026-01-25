import { Application, Sprite } from "pixi.js";
import { Player } from "@project-vanilla/shared";
import { AssetManager } from "./AssetManager";

export class Renderer {
    private app: Application;
    private assetManager: AssetManager;

    constructor() {
        this.app = new Application();
        this.assetManager = new AssetManager();
    }

    async init() {
        await this.app.init({
            resizeTo: window,
        });
        this.app.canvas.style.position = "absolute";
        this.app.canvas.style.imageRendering = "pixelated";
        document.body.appendChild(this.app.canvas);

        await this.assetManager.init();
    }

    drawPlayer(player: Player) {
        const sprite = new Sprite(this.assetManager.placeholder.npc);
        sprite.scale.set(2, 2);
        sprite.anchor.set(0.5, 0.5);
        sprite.position.set(player.position.x, player.position.y);
        this.app.stage.addChild(sprite);
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
