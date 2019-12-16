import axios from 'axios'
import qs from 'qs'


//添加请求拦截器,发请求之前调用
axios.interceptors.request.use(config=>{ //通过config 获取请求类型 和请求体数据
  const {method,data} = config

  if(method.toLowerCase()==='post' && typeof data === "object"){
    config.data = qs.stringify(data)
  }
  return config
})



//添加响应拦截器
axios.interceptors.response.use(config=>config.data,
  err=>{// 响应出错的回调
    return new Promise(()=>{})
})

//中断promise链 请求拦截->请求->响应拦截->响应

export default axios