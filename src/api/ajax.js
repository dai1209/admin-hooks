import axios from 'axios'
import { getToken, removeToken } from 'utils/token'

import permission from 'utils/permission'
import { message } from 'antd';

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:7001', // api的base_url
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (!permission.check(config)) {
    throw "403"
  }
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token// 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  // // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;

    if (res.statusCode !== 200) {
      message.error(res.msg);
      return Promise.reject(res.msg);
    } else {

      return response.data;
    }
  },
  error => {
    if (error.response && error.response.status === 401) {
      removeToken();
      if (error.config.url.indexOf("logout") === -1) {
        message.error('登陆信息已过期,请重新登陆!');
      }
      setTimeout(() => {
        window.location.replace('/login')
      }, 1000)

    } else if (error.response && error.response.status === 500) {
      message.error('系统错误!');
    } else if (error.message&&error.message.indexOf("timeout") > -1) {
      message.error('网络超时!');
    }
    else if (error === "403") {
      message.error('没有请求权限!');
    } else {
      message.error('网络错误!');
    }
    return Promise.reject(error)

  })

export default service



