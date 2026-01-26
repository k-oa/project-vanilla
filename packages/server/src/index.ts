import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { SocketManager } from "./SocketManager";
import { GameServer } from "./GameServer";
import dotenv from "dotenv";
import path from "path";

const app = express();
const server = http.createServer(app);

const envFile =
    process.env.NODE_ENV === "production"
        ? ".env.production"
        : ".env.development";

dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });

const PORT = Number(process.env.SERVER_PORT) || 3000;

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const allowedOrigins = clientUrl.split(",").map((url) => url.trim());

console.log("🔒 Allowed CORS origins:", allowedOrigins);

const io = new SocketIOServer(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        // credentials: true,
    },
});

const gameServer = new GameServer();
const socketManager = new SocketManager(io, gameServer);

io.on("connection", (socket) => {
    socketManager.handleConnection(socket);
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`📍 Mode: ${process.env.NODE_ENV || "development"}`);
    console.log(
        `📱 Network: http://${process.env.LOCAL_IP || "YOUR_IP"}:${PORT}`
    );
});
