import request from './request'
//获取动态路由
export function router_menu(data) {
    return request({
      url: '/user/router_menu',
      method: 'POST',
      data
    })
  }


