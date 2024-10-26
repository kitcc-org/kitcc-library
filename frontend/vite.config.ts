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
    !process.env.VITEST
      ? remix({
          future: {
            v3_fetcherPersist: true,
            v3_relativeSplatPath: true,
            v3_throwAbortReason: true,
          },
        })
      : null,
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
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
  },
});
