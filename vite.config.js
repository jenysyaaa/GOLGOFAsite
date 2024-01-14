import { fileURLToPath, URL } from "node:url";
import nodePolyfills from "rollup-plugin-node-polyfills";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    define: {
        __VUE_I18N_FULL_INSTALL__: true,
        __VUE_I18N_LEGACY_API__: false,
        __INTLIFY_PROD_DEVTOOLS__: false,
    },
    build: {
        rollupOptions: {
            plugins: [nodePolyfills({ buffer: true, crypto: true })],
        },
        assetsInlineLimit: 50000,
        chunkSizeWarningLimit: 4000,
        reportCompressedSize: false,
    },
});