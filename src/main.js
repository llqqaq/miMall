import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'


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
