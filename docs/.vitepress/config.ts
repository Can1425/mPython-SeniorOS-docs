/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  title: "苍旻OS | SeniorOS",
  description: "使用/开发文档",
  lastUpdated: true,
  base: "/",
  // lang: 'zh-CN',
  head: [["link", { rel: "icon", type: "image/png", href: "logo.png" }]],
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "项目简介",
        link: "/frontend/javascript",
      },
      {
        text: "快速开始",
        link: "/start",
      },
      {
        text: "开发文档",
        link: "/dev",
      },
    ]
  }
}

export default config;
