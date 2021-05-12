import qs from 'qs' // npm install qs
import request from './request'


export function login(data) {
    return request({
      url: '/user/login',
      method: 'POST',
      data
    })
  }

  export function getInfo(token) {
    return request({
      url: '/user/info',
      method: 'get',
      params: { token }
    })
  }