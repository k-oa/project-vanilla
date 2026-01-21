import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@project-vanilla/shared": path.resolve(__dirname, "../shared/src"),
            "@project-vanilla/protocol": path.resolve(
                __dirname,
                "../protocol/src"
            ),
        },
    },
    server: {
        host: "0.0.0.0",
        port: 5173,
        strictPort: true,
    },
});
