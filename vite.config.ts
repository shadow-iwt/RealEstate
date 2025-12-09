import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    {
      name: "external-shared",
      resolveId(id) {
        if (id.startsWith("@shared/")) {
          return { id, external: true };
        }
      },
    },
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@lib": path.resolve(import.meta.dirname, "client", "src", "lib"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: false,
      deny: ["**/.*"],
    },
    middlewareMode: false,
  },
  optimizeDeps: {
    exclude: ["drizzle-orm", "drizzle-zod", "@shared/schema"],
    include: [],
  },
  ssr: {
    noExternal: false,
    external: ["drizzle-orm", "drizzle-zod"],
  },
});
