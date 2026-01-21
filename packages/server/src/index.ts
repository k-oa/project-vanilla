import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { SocketManager } from "./SocketManager";
import dotenv from "dotenv";
import path from "path"; // ✅ ADDED: Import path module to resolve file paths

const app = express();
const server = http.createServer(app);

const envFile =
    process.env.NODE_ENV === "production"
        ? ".env.production"
        : ".env.development";

dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });

// ✅ CHANGED: Use SERVER_PORT from .env instead of hardcoded 3000
// OLD: const port = process.env.SERVER_PORT;
const PORT = Number(process.env.SERVER_PORT) || 3000; // Convert string to number with fallback

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

const socketManager = new SocketManager(io);

io.on("connection", (socket) => {
    socketManager.handleConnection(socket);
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`📍 Mode: ${process.env.NODE_ENV || "development"}`);
    console.log(
        `📱 Network: http://${process.env.LOCAL_IP || "YOUR_IP"}:${PORT}`
    );
});
