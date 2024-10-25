/// <reference types="vitest" />
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    proxy: {},
    https: {
      key: "./certs/key.pem",
      cert: "./certs/cert.pem",
    },
  },
  test: {
    alias: {
      "~/*": "./app/*",
    },
    env: {
      NODE_TLS_REJECT_UNAUTHORIZED: "0",
    },
    environment: "edge-runtime",
    globals: true,
    setupFiles: ["./test/setup.ts"],
  },
});
