import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history', //后端支持可开
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      // component: resolve => require(['../components/page/login.vue'], resolve)
      component: () => import('@//components/page/login.vue')
    },
    {
      path: '/',
      // component: resolve => require(['../components/common/Home.vue'], resolve),
      component: () => import('@/components/common/Home.vue'),
      children:[
        {
          path: '/dashboard',
          // component: resolve => require(['../components/page/dashboard.vue'], resolve),
          component: () => import('@/components/page/dashboard.vue')
        },
        {
          path: '/form',
          // component: resolve => require(['../components/page/form.vue'], resolve),
          component: () => import('@/components/page/form.vue')
        },
        {
          path: '/tableTree',
          // component: resolve => require(['../components/page/tableTree.vue'], resolve)
          component: () => import('@/components/page/tableTree.vue')
        },
        {
          path: '/tab',
          // component: resolve => require(['../components/page/tab.vue'], resolve),
          component: () => import('@/components/page/tab.vue')
        }
      ]
    },
  ]
})