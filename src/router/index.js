import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history', //后端支持可开
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      // component: resolve => require(['../components/page/login.vue'], resolve)
      component: () => import('@//components/page/login.vue')
    },
    {
      path: '/',
      component: () => import('@/components/common/Home.vue'),
      children:[
        {
          path: '/dashboard',
          component: () => import('@/views/dashboard/index'),
          name: 'Dashboard',
          meta: {title: '首页'}
        },
        {
          path: '/documentation',
          component: () => import('@/views/documentation/index'),
          name: 'documentation',
          meta: {title: '文档'}
        },
        {
          path: '/page',
          component: () => import('@/views/permission/page'),
          name: 'page',
          meta: {title: '页面权限'}
        },
        {
          path: '/role',
          component: () => import('@/views/permission/role'),
          name: 'role',
          meta: {title: '角色权限'}
        },
        {
          path: '/complex-table',
          component: () => import('@/views/table/complex-table'),
          name: 'complextable',
          meta: {title: '综合Table'}
        },
        {
          path: '/drag-table',
          component: () => import('@/views/table/drag-table'),
          name: '',
          meta: {title: '拖拽Table'}
        },
        {
          path: '/tab',
          component: () => import('@/views/tab/index'),
          name: 'Tab',
          meta: {title: 'Tab'}
        },
        {
          path: '/export-excel',
          component: () => import('@/views/Excel/export-excel'),
          meta: {title: '导出 Excel'}
        },
        {
          path: '/upload-excel',
          component: () => import('@/views/Excel/upload-excel'),
          meta: {title: '上传 Excel'}
        },
        {
          path: '/download',
          component: () => import('@/views/Zip/download'),
          meta: {title: 'Export Zip'}
        },
        {
          path: '/tinymce',
          component: () => import('@/views/components/tinymce'),
          meta: {title: '富文本编辑器'}
        },
        {
          path: '/avatar-upload',
          component: () => import('@/views/components/avatar-upload'),
          meta: {title: '头像上传'}
        },
        {
          path: '/line',
          component: () => import('@/views/echarts/line'),
          meta: {title: '折线图'}
        },
        {
          path: '/cake',
          component: () => import('@/views/echarts/cake'),
          meta: {title: '饼形图'}
        },
        {
          path: '/column',
          component: () => import('@/views/echarts/column'),
          meta: {title: '柱形图'}
        },
        {
          path: '/pdf',
          component: () => import('@/views/pdf/index'),
          meta: {title: 'pdf'}
        },
        {
          path: '/401',
          component: () => import('@/views/errorPage/401'),
          meta: {title: '401'}
        },
        {
          path: '/404',
          component: () => import('@/views/errorPage/404'),
          meta: {title: '404'}
        },
        {
          path: '/i18n',
          component: () => import('@/views/i18n/index'),
          meta: {title: '国际化'}
        },
        {
          path: '/link',
          component: () => import('@/views/link/index'),
          meta: {title: '外链'}
        }
      ]
    },
  ]
})