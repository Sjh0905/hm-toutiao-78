// 对axios进行配置 然后将配置好的axios导出
import axios from 'axios'
import store from '@/store'

// 进行配置
// 基准路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 请求头字段
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }

axios.interceptors.request.use((config) => {
  // 在每次请求的时候会执行
  // config 是配置项
  // 对config进行修改, 加token
  // 返回一个请求配置对象
  // 修改 在每次请求前 获取一次token 设置头部
  // 好处: 不会覆盖之前的头部信息
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  // 在请求的过程中可能出现异常, 走这个函数
  // 对请求错误做什么
  // 返回了一个错误的promise对象
  // 怎么创建一个promise new Promise((resolve, reject)=>{})
  // Promise.reject(error) 一定失败的promise对象
  // Promise.resolve(error) 一定成功的promise对象

  return Promise.reject(err)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对相应数据做点什么
  return response
}, function (error) {
  // 获取响应状态码 判断是不是401
  // 如果是 跳转登录
  if (error.response.status === 401) {
    //   token失效 跳转登录页面
    // this.$router.push('/login')  本质  把hash改成了 #/login
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

// 导出
export default axios

// 问题:
// api/index.js模块只会在页面初始化执行一次
// 获取的token信息, 是页面初始化的时候存储的
// 登录页面, 没有token信息, axios的配置项没有token
// 登陆成功是 路由跳转, 并没有刷新页面, axios还是没有token
// 发送请求是没有携带token信息

// 方案:
// 在每次请求前, 重新获取token, 设置给请求头, 即可
// 添加请求拦截器
