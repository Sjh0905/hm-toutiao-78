import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import router from './router/index.js'
// @是一个路径的别名 是src路径 在vue-cli项目下有效
// index是目录的索引文件 默认使用的索引文件(index.js index.vue index.json)
import router from '@/router'

// 产品级别提示 不开启 开发阶段 提示越详细越好 开发级别提示
Vue.config.productionTip = false

Vue.use(ElementUI)

// 入口文件
// 职责1: 引入需要依赖的模块 (js ,包, css, 其他资源)
// 职责2: 创建一个根 vue 实例
// mount 挂载的意思
new Vue({
  router,
  // 是一个vue的配置项 指向的是函数
  // render的优先级最高 相比 el template
  // h 渲染的意思
  render: h => h(App)
  // render: function (createElement) {
  // return createElement(App)
  // }
}).$mount('#app') // 把render的内容挂载哪个容器内
