/*
 * @Description:
 * @Author: 惟灿 Can1425
 * @Email: myqf1425@126.com
 * @Date: 2024-03-31 11:34:31
 * @LastEditTime: 2023-09-02 21:53:30
 * @LastEditors: 惟灿 Can1425
 */
import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

const commitRef = process.env.COMMIT_REF?.slice(0, 8) || "dev";

const ogDescription = "SeniorOS 是运行在 mPython （掌控版）平台上的轻量级多文件操作系统，旨在致力于构建完整的 mPython 生态体验。";
const ogImage = "https://senioros.stfp.site/cover.jpg";
const ogTitle = "苍旻OS-SeniorOS Docs";
const ogUrl = "https://senioros.stfp.site";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "苍旻OS-SeniorOS Docs",
  description: "SeniorOS 是运行在 mPython （掌控版）平台上的轻量级多文件操作系统，旨在致力于构建完整的 mPython 生态体验。",
  lang: "zh",
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/logo.png" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: ogTitle }],
    ["meta", { property: "og:image", content: ogImage }],
    ["meta", { property: "og:url", content: ogUrl }],
    ["meta", { property: "og:description", content: ogDescription }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:site", content: "@anzhiyu" }],
    ["meta", { name: "theme-color", content: "#646cff" }],
    // 添加百度统计代码
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?bfb308357e73d7e9c856af04a77e822d";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
       `,
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "mPython 操作系统联盟", link: "https://stfp.com/" }],

    sidebar: [
      {
        text: "系统简介",
        link: "/intro",
      },
      {
        text: "快速上手",
        items: [
          { text: "环境配置 💻", link: "/initall" },
          {
            text: "克隆仓库 📦",
            collapsed: false,
            items: [
              { text: "步骤认识", link: "/page/front-matter" },
              { text: "Git 克隆文件", link: "/page/tags" },
              { text: "Gitee 下载 .zip 文件", link: "/page/classify" },
            ],
          },
          {
            text: "编译环境 🧠",
            collapsed: false,
            items: [
              { text: "步骤认识", link: "/global/base" },
              { text: "创建并激活虚拟环境", link: "/global/extra" },
              { text: "安装编译器及 Build.py 前置", link: "/global/extra" },
              { text: "使用 Build.py 编译", link: "/global/extra" },
            ],
          },
          {
            text: "实机运行 🚀",
            collapsed: false,
            items: [
              { text: "步骤认识", link: "/advanced/" },
              { text: "使用 uPython 上传编译文件", link: "/page/links" },
              { text: "使用 Thonny 上传编译文件", link: "/page/message" },
            ],
          },
          {
            text: "常见问题 📖",
            link: "/FAQ",
          },
        ],
      },
      {
        text: "开始使用",
        items: [
          { text: "操作逻辑 💻", link: "/initall" },
          { text: "启动操作 💻", link: "/initall" },
          { text: "系统首页 💻", link: "/initall" },
          { text: "系统 Apps 💻", link: "/initall" },
          { text: "Web Apps 💻", link: "/initall" },
          { text: "系统设置 💻", link: "/initall" },
          {
            text: "常见问题 📖",
            link: "/FAQ",
          },
        ],
      },
      {
        text: "开发详解",
        items: [
          {
            text: "正在编写... 📖",
            link: "/",
          },
        ],
      },
    ],

    socialLinks: [{ icon: "gitee", link: "https://gitee.com/can1425/mPython-SeniorOS" }],

    algolia: {
      appId: "CITURDDECN",
      apiKey: "e5c83518b67da17a254574c31759596b",
      indexName: "anheyu",
      // searchParameters: {
      //   facetFilters: ["tags:en"],
      // },
      locales: {
        zh: {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
      },
    },

    footer: {
      message: `Released under the MulanPSL-2.0 License. (${commitRef})`,
      copyright: "Copyright © 2023 Can1425",
    },

    editLink: {
      pattern: "https://github.com/Can1425/mPython-SeniorOS-docs/edit/main/:path",
      text: "Edit this page on GitHub",
    },
  },
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },
  locales: {
    root: { label: "简体中文", lang: "zh" },
  },
});
