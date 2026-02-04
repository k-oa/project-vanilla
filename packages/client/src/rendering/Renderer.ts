import { Application, Sprite, TextureStyle } from "pixi.js";
import { Player } from "@project-vanilla/shared";
import { AssetManager } from "./AssetManager";

export class Renderer {
    public app: Application;
    private assetManager: AssetManager;
    private playerSprites: Map<string, Sprite> = new Map();
    private tileSprites: Sprite[] = [];
    private debugSprites: Map<string, Sprite> = new Map();

    public debug: boolean = false;

    constructor() {
        this.app = new Application();
        this.assetManager = new AssetManager();
    }

    async init() {
        const cssWidth = window.innerWidth;
        const cssHeight = window.innerHeight;
        const deviceWidth = Math.round(cssWidth * window.devicePixelRatio);
        const deviceHeight = Math.round(cssHeight * window.devicePixelRatio);

        await this.app.init({
            width: deviceWidth,
            height: deviceHeight,
            roundPixels: true,
            resolution: 1,
            autoDensity: false,
        });
        this.app.canvas.style.width = `${cssWidth}px`;
        this.app.canvas.style.height = `${cssHeight}px`;
        this.app.canvas.style.position = "absolute";
        this.app.canvas.style.imageRendering = "pixelated";
        TextureStyle.defaultOptions.scaleMode = "nearest";

        document.body.appendChild(this.app.canvas);

        await this.assetManager.init();
    }

    drawPlayer(player: Player) {
        const sprite = new Sprite(this.assetManager.placeholder.npc);
        sprite.scale.set(3);
        sprite.anchor.set(0.5, 0.5);
        sprite.position.set(player.position.x, player.position.y);
        this.app.stage.addChild(sprite);
        this.playerSprites.set(player.id, sprite);

        // Debug
        if (this.debug) {
            const debugSprite = new Sprite(this.assetManager.placeholder.npc);
            debugSprite.scale.set(2);
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

    drawTile(position: { x: number; y: number }) {
        const sprite = new Sprite(this.assetManager.placeholder.grass);
        sprite.position.set(position.x, position.y);
        sprite.scale.set(3, 3);
        this.app.stage.addChild(sprite);
        this.tileSprites.push(sprite);
    }
}
