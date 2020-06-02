import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import env from './env'
import axios from 'axios'
// 为了可以直接this.axios
import VueAxios from 'vue-axios'

// mock开关打开后，才会被拦截
const mock = true
// 请求已经被拦截，并返回自定义的json数据
if(mock) {
// require不会被预编译，import会
  require('./mock/api')
}


// 设置基地址
// 如果是通过代理
axios.defaults.baseURL = '/api'
// 如果是普通的jsonp或者CROS
// axios.defaults.baseURL = env.baseURL
// console.log(env.baseURL)
// 设置超时
axios.defaults.timeout = 8000

// 请求响应拦截器
// 可以在npm的axios文档查看
axios.interceptors.response.use(function(response){
  let res = response.data
  if(res.status == 0) {
    return res.data
  }else if(res.status == 10){
    // 跳转到登录界面
    // 这里不可以用路由跳转，没有this
    window.location.href = '/#/login'
  }else{
    alert(res.msg)
  }
})


// 挂载
Vue.use(VueAxios,axios)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
