const TokenKey = 'Admin-Token'  //token缓存
const routerKey = 'Admin-router' //router缓存
/**
 * @param {string} token 
 */
export function setToken(token) {
    sessionStorage.setItem(TokenKey, token)
  }
  export function getToken() {
    return sessionStorage.getItem(TokenKey)
  }
  export function removeToken() {
    return sessionStorage.removeItem(TokenKey)
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


