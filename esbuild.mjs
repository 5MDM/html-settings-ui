import {build} from "esbuild";

await build({
  entryPoints: ["index.ts"],
  bundle: false,
  outfile: "dist/browser.js",
  target: "es6",
  platform: "browser",
});