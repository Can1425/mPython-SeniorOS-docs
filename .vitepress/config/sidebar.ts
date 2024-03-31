/**
 * 侧边栏菜单
 *
 * @see sidebar https://vitepress.vuejs.org/guide/theme-sidebar#sidebar
 */
export const sidebar = {
  '/docs/': [
    {
      text: "系统简介",
      link: "/docs/intro",
    },
    {
      text: "快速上手",
      items: [
        { text: "环境配置 💻", link: "/docs/initall" },
        {
          text: "克隆仓库 📦",
          collapsed: false,
          items: [
            { text: "步骤认识", link: "/docs/get/intro" },
            { text: "Git 克隆文件", link: "/docs/get/git" },
            { text: "Gitee 下载 .zip 文件", link: "/docs/get/gitee-download-zip" },
          ],
        },
        {
          text: "构建环境 🧠",
          collapsed: false,
          items: [
            { text: "步骤认识", link: "/docs/construct-environment/intro" },
            { text: "创建并激活虚拟环境", link: "/docs/construct-environment/create-and-activate-venv" },
            { text: "安装编译器及 Build.py 前置", link: "/docs/construct-environment/installation-dependency" },
            { text: "使用 Build.py 构建", link: "/docs/construct-environment/construct" },
          ],
        },
        {
          text: "实机运行 🚀",
          collapsed: false,
          items: [
            { text: "步骤认识", link: "/advanced/" },
            { text: "使用 uPyLoader 上传编译文件", link: "/page/links" },
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
  ]
}
