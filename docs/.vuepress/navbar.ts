import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  {
    text: "快速上手",
    link: "/guide/getstarted/start",
    icon: "start1",
  },
  {
    text: "用户手册",
    link: "/guide/features/README.md",
    icon: "featuresNew",
  },
  {
    text: "开发者手册",
    link: "/guide/history",
    icon: "changelog",
  },
  {
    text: "Web App",
    link: "/guide/script",
    icon: "code-box-fill",
  },
  {
    text: "先锋计划",
    icon: "team",
    link: "/guide/concatGroup",
  },
  {
    text: "🎯 FAQ",
    link: "/guide/faq",
  },
  {
    text: "更多",
    children: [
      "/guide/link",
      "/guide/sponsorList",
      "/guide/activity",
      "/guide/java",
    ],
  },
]);
