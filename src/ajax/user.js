import qs from 'qs' // npm install qs
import request from './request'

//登录
export function login(data) {
    return request({
      url: '/user/login',
      method: 'POST',
      data
    })
  }
//获取账号名 入参token  【修改密码需要】
  export function getInfo(token) {
    return request({
      url: '/user/info',
      method: 'get',
      params: token
    })
  }
//修改密码
export function change_password(data) {
  return request({
    url: '/user/change_password',
    method: 'POST',
    data
  })
}
//查询所有账号密码  /user/list
export function userList() {
  return request({
    url: '/user/list',
    method: 'get',
  })
}