import Vue from 'vue'
import App from './App.vue'

// 产品级别提示 不开启 开发阶段 提示越详细越好 开发级别提示
Vue.config.productionTip = false

// 入口文件
// 职责1: 引入需要依赖的模块 (js ,包, css, 其他资源)
// 职责2: 创建一个根 vue 实例
// mount 挂载的意思
new Vue({
  // h 渲染的意思
  render: h => h(App)
}).$mount('#app')
