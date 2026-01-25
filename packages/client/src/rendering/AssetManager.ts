import { Assets } from "pixi.js";
import { GameAssets } from "../types/assets";

export class AssetManager {
    private bundles!: GameAssets;

    async init(): Promise<void> {
        await Assets.init({ manifest: "/manifest.json" });
        this.bundles = {
            placeholder: await Assets.loadBundle("placeholder"),
        } as GameAssets;
    }

    get placeholder() {
        return this.bundles.placeholder;
    }
}
