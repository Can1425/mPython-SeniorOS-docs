import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import vpSearch from './components/vp-search.vue'
import './style/index.scss'
import type { VNode } from 'vue'

/**
 * 使用第三方组件库
 * 
 * @see fighting-design https://github.com/FightingDesign/fighting-design
 */
import FightingDesign from 'fighting-design'
import 'fighting-design/dist/index.css'
