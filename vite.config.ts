import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "node-server",
    // Match the platform Output Directory (`build`) instead of Nitro's default `.output`.
    output: {
      dir: "build",
    },
  },
});