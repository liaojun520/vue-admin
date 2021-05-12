import axios from 'axios'  //npm install axios --save
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import E from '@/easy'
const service = axios.create({
  baseURL:E.baseURL,
  timeout: 20000 // request timeout
})
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
service.interceptors.request.use(
  config => {
    if (store.getters.token) {   //请求头设置token信息 方便后端查询，提升效率
      config.headers['token'] = getToken();
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.type == "multipart/form-data") {  //form-data格式值针对下载导出,返回没有code属性，直接编码
      return response
    }else if (res.code != 0 && res.code !=='4000') {
    // 当接口响应status为200时，接口并未失败   
    // code等于0(0是成功) 或者4000（假设的，某个接口可能需要二次校验） 时  不能直接reject,需要返回res
    //其他响应code 就直接reject
      Message({
        message: res.message || '网络错误，请稍后重试！',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code == 1010) {  //登录失效特有的code
        MessageBox.confirm('请重新登录', '登陆失败', {
          confirmButtonText: '重新登录',
          cancelButtonText: 'Cancel',
          showClose: false,
          showCancelButton: false,
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => { //清空Token
            location.reload() //刷新 路由首位到 login页面
          })
        })
      }
      console.error('异常接口详情=>',response);
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
