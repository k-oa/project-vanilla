import { Application, Graphics } from "pixi.js";
import { SocketManager } from "./SocketManager.js";

(async () => {
    const app = new Application();
    await app.init({
        resizeTo: window,
    });

    app.canvas.style.position = "absolute";
    app.canvas.style.imageRendering = "pixelated";

    document.body.appendChild(app.canvas);

    const serverUrl =
        import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
    const socketManager = new SocketManager(serverUrl);
    console.log("SocketManager initialized:", socketManager);

    const rectangle = new Graphics().rect(10, 10, 30, 30).fill({
        color: 0xff8080,
    });
    app.stage.addChild(rectangle);

    rectangle.eventMode = "static";
    rectangle.cursor = "pointer";

    rectangle.on("pointertap", () => {
        console.log("Tap! My player ID is:", socketManager.myPlayerId);
    });
    //     socketManager.sendMove(100, 100);
})();
