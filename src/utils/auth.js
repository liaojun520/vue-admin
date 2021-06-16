import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'  //token缓存
const routerKey = 'Admin-router' //router缓存
/**
 * @param {string} token 
 */
// export function setToken(token) {
//     sessionStorage.setItem(TokenKey, token)
//   }
//   export function getToken() {
//     return sessionStorage.getItem(TokenKey)
//   }
//   export function removeToken() {
//     return sessionStorage.removeItem(TokenKey)
//   }

/** session cookie 都只支持同源策略规则
 * session的缺陷很明显,只储存在当前浏览器窗口 浏览器每次新开标签都要重新登录
 * cookie 存在于整个浏览器，关闭浏览器就清空  
 * 注意点：针对全局数据，千万不能直接存session就完事, 要做到跟cookie token状态保持一致,没有session时应该重新调用接口获取 
 */

//改为cookie 
/**
 * 退出登录,修改密码,后端返回code状态码1010：清空token,所有cookie,所有session   登录：先清空token【防止登录前开了多个登录窗口】 
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

//清空当前所有cookie
export function removeAll() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if(keys) {
      for(var i = keys.length; i--;){
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
  }
}



/**
 * @param {string} token 
 */
  export function setRouter(router) {
    sessionStorage.setItem(routerKey, JSON.stringify(router))
  }
  export function getRouter() {
    return JSON.parse(sessionStorage.getItem(routerKey))
  }
  export function removeRouter() {
    return sessionStorage.removeItem(routerKey)
  }


