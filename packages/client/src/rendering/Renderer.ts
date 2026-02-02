import { Application, Sprite } from "pixi.js";
import { Player } from "@project-vanilla/shared";
import { AssetManager } from "./AssetManager";

export class Renderer {
    public app: Application;
    private assetManager: AssetManager;
    private playerSprites: Map<string, Sprite> = new Map();
    private debugSprites: Map<string, Sprite> = new Map();

    public debug: boolean = false;

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

        // Debug
        if (this.debug) {
            const debugSprite = new Sprite(this.assetManager.placeholder.npc);
            debugSprite.scale.set(2, 2);
            debugSprite.anchor.set(0.5, 0.5);
            debugSprite.position.set(player.position.x, player.position.y);
            debugSprite.tint = 0x33ff33;
            this.app.stage.addChild(debugSprite);
            this.debugSprites.set(player.id, debugSprite);
        }
    }

    updatePlayerPosition(id: string, position: { x: number; y: number }) {
        const sprite = this.playerSprites.get(id)!;
        sprite.position.set(position.x, position.y);

        // Debug
        if (this.debug) {
            const debugSprite = this.debugSprites.get(id)!;
            debugSprite.position.set(position.x, position.y);
        }
    }

    removePlayer(id: string) {
        const sprite = this.playerSprites.get(id)!;
        this.app.stage.removeChild(sprite);
        this.playerSprites.delete(id);
        sprite.destroy();

        // Debug
        if (this.debug) {
            const debugSprite = this.debugSprites.get(id)!;
            this.app.stage.removeChild(debugSprite);
            this.debugSprites.delete(id);
            debugSprite.destroy();
        }
    }
}
