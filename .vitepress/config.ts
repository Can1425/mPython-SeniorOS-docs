import { nav } from './config/nav'
import { sidebar } from './config/sidebar'
import { PluginTable } from './plugin'
import type MarkdownIt from 'markdown-it'

/**
 * 更多配置项参考：
 * 
 * @see app-configs https://vitepress.vuejs.org/config/app-configs.html
 */
export default {
  title: '苍旻OS-SeniorOS Docs',
  /**
   * 是否显示最后更新时间
   *
   * @see last-updated https://vitepress.vuejs.org/guide/theme-last-updated#last-updated
   */
  lastUpdated: true,
  /**
   * 缓存目录
   *
   * @see cacheDir https://vitepress.vuejs.org/config/app-configs#cachedir
   */
  cacheDir: '../../node_modules',
  /**
   * 主题配置
   *
   * @see theme-config https://vitepress.vuejs.org/guide/migration-from-vitepress-0#theme-config
   */
  themeConfig: {

    siteTitle: '苍旻OS | SeniorOS',

    logo: '/oslogo.png',
 
    lastUpdatedText: '最后更新时间',
    /**
     * 配置导航栏图表
     *
     * @see socialLinks https://vitepress.vuejs.org/config/theme-configs#sociallinks
     */
    socialLinks: [
      {
        svg: 'https://www.svgrepo.com/show/330508/gitee.svg',
        link: 'https://gitee.com/stfp/mPython-SeniorOS'
      }
    ],
    nav,
    sidebar
  },
  /**
   * 自定义 markdown 解析器
   *
   * @see markdown https://vitepress.vuejs.org/config/app-configs#markdown
   */
  markdown: {
    /**
     * 配置 Markdown-it 实例
     *
     * @param { Object } md markdown 实例
     */
    config: (md: MarkdownIt): void => {
      md.use(PluginTable)
    }
  }
}
