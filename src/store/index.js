// store文件的作用:本地存储
// 封装操作sessionStorage的函数, 提供给其他模块使用
// 1. 约定好key的名字
// 2. 约定好value的格式, 字符串格式 json数据
const KEY = 'hm-toutiao-78-user'

export default {
  setUser (user) {
    // 设置用户信息
    // 存储 user 对象
    // 现在: 给什么存什么  完整替换之前的信息.
    // 预期: 给一个字段, 就局部修改这个字段即可 {name :''}
    // 思路: 获取本地存储的对象, 把传入的对象, 合并覆盖到当前存储对象中.
    const localUser = this.getUser()
    // ...使用场景不一样作用也不一样
    // 不相同的属性叫合并  //相同的属性后面的...会覆盖前面的...时
    const newUser = { ...localUser, ...user }
    // console.log(user)
    window.sessionStorage.setItem(KEY, JSON.stringify(newUser))
  },
  getUser () {
    //   获取用户信息  空对象, 当没拿到数据时候返回的是一个空对象
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  // 移除用户信息
  clearUser () {
    // clear() 清除所有的sessionStorage本地存储(不建议使用)
    window.sessionStorage.removeItem(KEY)
  }
}
