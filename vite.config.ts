import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    // Keep Nitro's default output directory (`.output`).
    // Deployment Output Directory must be set to `.output`, not `build`.
    preset: "node-server",
  },
});
