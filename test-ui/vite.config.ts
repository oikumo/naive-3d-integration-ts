import { defineConfig, IndexHtmlTransform } from 'vite';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import wasmEsm from 'vite-plugin-wasm-esm'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import copy from 'rollup-plugin-copy';

import { resolve } from 'path'
import dts from 'vite-plugin-dts'


export default defineConfig(({ mode }) => {

  return {
    lib: {
    entry: [
      resolve(__dirname, '../src/main.ts')    ]
  },
    assetsInclude: ['**/*.wasm'],
    plugins: [
      dts(),
      wasm(),
      topLevelAwait()
    ],
    optimizeDeps: {
      exclude: ["module"],
    }
  }
});
