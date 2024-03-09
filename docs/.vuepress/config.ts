import { getDirname, path } from "vuepress/utils";
import { viteBundler } from "@vuepress/bundler-vite";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/",

  dest: "./dist",

  clientConfigFile: path.resolve(__dirname, "./client.ts"),

  head: [
    [
      "script",
      {
        src: "https://umami.irain.in/script.js",
        "data-website-id": "1a7be6c3-a024-47e2-9a42-29e66b997a36",
        async: "",
        defer: "",
      },
    ],
    [
      "script",
      {
        type: "module",
        src: "https://get.microsoft.com/badge/ms-store-badge.bundled.js",
      },
    ],
  ],

  locales: {
    "/zh/": {
      lang: "zh-CN",
      title: "SeniorOS",
      description: "All-Inclusive",
  },

  bundler: viteBundler({
    viteOptions: {
      build: {
        chunkSizeWarningLimit: 1500,
      },
    },
    vuePluginOptions: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "ms-store-badge",
        },
      },
    },
  }),
  theme,

  shouldPrefetch: false,
};
