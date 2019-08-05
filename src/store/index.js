// store文件的作用:本地存储
// 封装操作sessionStorage的函数, 提供给其他模块使用
// 1. 约定好key的名字
// 2. 约定好value的格式, 字符串格式 json数据
const KEY = 'hm-toutiao-78-user'

export default {
  setUser (user) {
    // 设置用户信息
    // 存储
    console.log(user)
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    //   获取用户信息  空对象, 当没拿到数据时候返回的是一个空对象
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  }
}
