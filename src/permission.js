import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import './assets/css/nprogress.css'

NProgress.configure({showSpinner: false}); // NProgress Configuration

// const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  next();
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
});
