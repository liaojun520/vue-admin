import Vue from 'vue'
import SvgIcon from './SvgIcon.vue'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)


/**
 * 配置svg 需要在vue.config.js 里配置 svg-sprite-loader
 */
