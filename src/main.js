// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import echarts from 'echarts'
import VueCookie from 'vue-cookie'
import httpRequest from 'js/util/httpRequest'
import _global from 'js/config/_global'

import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'css/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookie)

// 非生产环境, 适配mockjs模拟数据
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.GLOBAL = _global
// Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
