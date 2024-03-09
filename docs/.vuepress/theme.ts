import { hopeTheme } from "vuepress-theme-hope";
import { enNavbar, zhNavbar, ruNavbar, idNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar, ruSidebar, idSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://senioros.stfp.site",

  author: {
    name: "惟灿 Can1425",
    url: "https://can1425.stfp.site",
  },

  iconAssets: [
    "iconfont",
    "https://at.alicdn.com/t/c/font_3861247_yn9taeyq2sc.css",
  ],

  logo: "/images/202403/logo.png",

  repo: "https://gitee.com/can1425/mPython-SeniorOS",

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  docsRepo: "/",

  docsDir: "docs",

  locales: {
    /**
     * Chinese locale config
     */
    "/zh/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "SeniorOS - All-Inclusive",

      displayFooter: true,

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },

  plugins: {
    comment: {
      provider: "Giscus",
      repo: "DGP-Studio/Snap.Hutao.Docs.Comments",
      repoId: "R_kgDOKySqhg",
      category: "Announcements",
      categoryId: "DIC_kwDOKySqhs4CbRrr",
      mapping: "pathname",
      inputPosition: "bottom",
    },

    components: {
      components: ["Badge", "BiliBili", "VPCard", "VPBanner"],
    },

    docsearch: {
      appId: "28CTGDOOQD",
      apiKey: "72d7a9a0f9f0466218ea19988886dce8",
      indexName: "hutao",
      locales: {
        "/zh/": {
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

    // https://ecosystem.vuejs.press/zh/plugins/feed/
    // https://theme-hope.vuejs.press/zh/config/plugins/feed.html
    feed: {
      rss: true,
    },

    sitemap: {
      changefreq: "weekly",
    },

    mdEnhance: {
      align: true,
      footnote: true,
      imgLazyload: true,
      include: true,
      tabs: true,
      tasklist: true,
      component: true,
      imgSize: true,
    },

    pwa: {
      appendBase: true,

      favicon: "/favicon.ico",
      cacheHTML: false,
      cacheImage: true,
      themeColor: "#f26d6d",
      update: "hint",

      apple: {
        icon: "/favicon.ico",
        statusBarColor: "black",
      },
      msTile: {
        image: "/favicon.ico",
        color: "#ffffff",
      },

      manifest: {
        icons: [
          {
            src: "/pwa-icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-icon/chrome-144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/pwa-icon/chrome-72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/pwa-icon/chrome-96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/pwa-icon/chrome-48.png",
            sizes: "48x48",
            type: "image/png",
          },
        ],
      },
    },

    redirect: {
      defaultLocale: "/zh/",
      autoLocale: true,
      switchLocale: "modal",
      localeConfig: {
        "/zh/": ["zh-CN", "zh-TW", "zh"],
      },
    },
  },
},{
  custom: true,
});
