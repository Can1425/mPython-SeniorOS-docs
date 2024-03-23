import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  dest: "./dist",
  lang: "zh-CN",
  title: "SeniorOS | 苍旻OS",
  description: "SeniorOS 使用/开发文档"

});
