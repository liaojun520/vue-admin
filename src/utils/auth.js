const TokenKey = 'Admin-Token'
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