import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/HelloWorld'
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: () => import('components/HelloWorld')
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('page/common/sign')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('page/common/404')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('page/common/main')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
