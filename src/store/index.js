import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)

// webpack前端工程化  文件目录 是否检索子文件夹 检索文件类型  详情请查看README 1.0
const file = require.context('./modules',true,/\.js$/);
const modules = file.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = file(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  // }
  modules,
  getters
})
