import { Assets } from "pixi.js";
import { GameAssets } from "../types/assets";

export class AssetManager {
    private bundles!: GameAssets;

    async init(): Promise<void> {
        await Assets.init({ manifest: "/manifest.json" });
        this.bundles = {
            placeholder: await Assets.loadBundle("placeholder"), // ← Singular
            // ui: await Assets.loadBundle("ui"), // ← Singular
            // character: await Assets.loadBundle("character"), // ← Singular
            // item: await Assets.loadBundle("item"), // ← Singular
        } as GameAssets;
    }

    get placeholder() {
        return this.bundles.placeholder;
    }
    // get ui() {
    //     return this.bundles.ui;
    // }
    // get character() {
    //     return this.bundles.character;
    // }
    // get item() {
    //     return this.bundles.item;
    // }
}
