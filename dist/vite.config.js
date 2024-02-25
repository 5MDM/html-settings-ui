"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const vite_plugin_checker_1 = require("vite-plugin-checker");
exports.default = (0, vite_1.defineConfig)({
    build: {
        target: "es2022",
        assetsInlineLimit: 0
    },
    plugins: [
        (0, vite_plugin_checker_1.checker)({
            typescript: true,
        })
    ],
    base: "/html-settings-ui/"
});
