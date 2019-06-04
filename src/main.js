import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Cookies from 'js-cookie'
// import '@/icons'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/icon.css'
import './permission.js'
import store from './store'
// import api from './request/api'
import vuescroll from 'vuescroll'
Vue.prototype.$axios = axios
// Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码
// 给config配置baseURL

axios.defaults.baseURL = process.env.API_ROOT
import i18n from './lang'
Vue.use(vuescroll)
Vue.use(ElementUI,{
  size: Cookies.get('size') || 'medium',
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   const role = localStorage.getItem('ms_username');
//   if (!role && to.path !== '/login') {
//     next('/login');
//     console.log("!!!!!!!!!!!!!!!!!!!")
//   } else {
//     next();
//   }
// })
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  console.log(to.path)
  console.log(localStorage.getItem('Authorization'))
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization'); 
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
});

// //使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   const role = localStorage.getItem('ms_username');
//   console.log(role)
//   if (!role && to.path !== '/login') {
//       next('/login');
//   } else if (to.meta.permission) {
//       // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//       role === 'admin' ? next() : next('/403');
//   } else {
//       // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//       if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
//           Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//               confirmButtonText: '确定'
//           });
//       } else {
//           next();
//       }
//   }
// })
// 创建axios实例
// const service = axios.create({
//   baseURL: process.env.BASE_API,
//   timeout: 5000 // 请求超时时间
// })
// respone拦截器
// service.interceptors.response.use(
//   response => response,
//   /**
//   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
//   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
//   */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
//   error => {
//     console.log('err' + error)// for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   })

// router.beforeEach((to, from, next) => {
//   let roel = localStorage.getItem('')
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
