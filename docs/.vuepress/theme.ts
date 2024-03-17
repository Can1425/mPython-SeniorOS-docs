import {getDirname, path} from "vuepress/utils";
import {hopeTheme} from "vuepress-theme-hope";
import {zhNavbar} from "./navbar.js";
import {zhSidebar} from "./sidebar.js";

const __dirname = getDirname(import.meta.url);

export default hopeTheme(
  {
    hostname: "https://senioros.stfp.site",
    logo: "/img/home-logo.png",

    repo: "https://github.com/Can1425/mPython-SeniorOS-docs",
    docsDir: "docs",
    docsBranch: "main",

    copyright: "Copyright © 2021-present 惟灿 Can1425",
    displayFooter: true,

    pageInfo: false,
    fullscreen: true,
    editLink: false,
    contributors: false,

    darkmode: "enable",

    iconAssets: "//at.alicdn.com/t/c/font_2601581_d17fm4nxa97.css",

    locales: {
      "/": {
        footer:
          "主题使用 <a target='blank' href='https://theme-hope.vuejs.press/zh/'>vuepress-theme-hope</a>",

        navbar: zhNavbar,
        sidebar: zhSidebar,
      },

    plugins: {
      // comment: {
      //   provider: "Giscus",
      //   repo: "kings1990/giscus-fastrequest",
      //   repoId: "R_kgDOHLlUsg",
      //   category: "fastRequest",
      //   categoryId: "DIC_kwDOHLlUss4COlsW",
      // },

      components: {
        components: ["Badge", "BiliBili", "SiteInfo", "VPCard","VPBanner"],
        rootComponents: {
          notice: [
            {
              path: "/",
              title: "Flag OS 已正式更名为 SeniorOS",
              content:
                '<ul><li>All-Inclusive | 包罗万象</li></ul><div class="addthis_inline_follow_toolbox_qssu"></div>',
              actions: [
                {
                  text: "了解详情→",
                  link: "/guide/history.html#_2024-1-3",
                  type: "primary",
                },
              ],
              showOnce: true,
              key: "2024.1.3",
            },
          ],
        },
      },

      docsearch: {
        appId: "8FRYEU6KK8",
        apiKey: "84f513df1e83406ba42179da778d87b4",
        indexName: "dromara-fast-request",
        locales: {
          "/en/": {
            placeholder: "Search docs",
            translations: {
              button: {
                buttonText: "Search docs",
              },
            },
          },
        },
      },

      mdEnhance: {
        align: true,
        chart: true,
        codetabs: true,
        component: true,
        hint: true,
        imgLazyload: true,
        imgSize: true,
        include: {
          resolvePath: (file) =>
            file.startsWith("@src")
              ? file.replace("@src", path.resolve(__dirname, ".."))
              : file,
        },
        mark: true,
        tabs: true,
        tasklist: true,
      },
    },
  },
);
