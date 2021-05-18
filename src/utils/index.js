import Layout from '@/layout'
/**
 * 判断path是否是https开头的
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**校验用户名
 * @param {string} str
 * @returns {Boolean}
 */
 export function validUsername(str) {
  const valid_map = ['admin', 'user']
  return valid_map.indexOf(str.trim()) >= 0
}

/**递归获取动态路由 处理component路径【把字符串格式改为组件引入格式】
 * @param {Array} routesList
 * @returns {Array}
 */
export function getAsyncRoutes(routesList) {
  const res = []
  // 定义路由中需要的自定名
  const keys = ['path', 'name', 'children', 'redirect', 'meta', 'hidden']
  // 遍历路由数组去重组可用的路由
  if(routesList){
    if(routesList instanceof Array ){
        routesList.forEach(item => {
            const newItem = {};
            if (item.component) {
                // 判断 item.component 是否等于 'Layout',若是则直接替换成引入的 Layout 组件
                if (item.component === 'Layout') {
                    newItem.component = Layout
                } else {
                //  item.component 不等于 'Layout',则说明它是组件路径地址，因此直接替换成路由引入的方法
                    newItem.component = resolve => require([`@/views/${item.component}`],resolve)
                    
                    // 此处用reqiure比较好，import引入变量会有各种莫名的错误
                    // newItem.component = (() => import(`@/views/${item.component}`));
                }
            }
            for (const key in item) {
                if (keys.includes(key)) {
                    newItem[key] = item[key]
                }
            }
            // 若遍历的当前路由存在子路由，需要对子路由进行递归遍历
            if (newItem.children && newItem.children.length) {
                newItem.children = getAsyncRoutes(item.children)
            }
            res.push(newItem)
        })
    }
  }
  // 返回处理好且可用的路由数组
  return res
}