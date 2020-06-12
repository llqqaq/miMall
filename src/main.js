import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import env from './env'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'

// mock开关打开后，才会被拦截
const mock = false
// 请求已经被拦截，并返回自定义的json数据
if (mock) {
  // require不会被预编译，import会
  require('./mock/api')
}

Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.use(VueCookie)
Vue.config.productionTip = false

Vue.prototype.$message = Message;

import './assets/scss/btn.scss';
import './assets/scss/base.scss';
import './assets/scss/reset.scss';
import 'element-ui/lib/theme-chalk/index.css';



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
