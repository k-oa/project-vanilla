import { Application, Sprite } from "pixi.js";
import { Player } from "@project-vanilla/shared";
import { AssetManager } from "./AssetManager";

export class Renderer {
    public app: Application;
    private assetManager: AssetManager;
    private playerSprites: Map<string, Sprite> = new Map();

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
        this.playerSprites.set(player.id, sprite);
    }

    updatePlayerPosition(id: string, position: { x: number; y: number }) {
        const sprite = this.playerSprites.get(id)!;
        sprite.position.set(position.x + sprite.x, position.y + sprite.y);
    }

    removePlayer(id: string) {
        const sprite = this.playerSprites.get(id)!;
        this.app.stage.removeChild(sprite);
        this.playerSprites.delete(id);
    }
}
