import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./pages/home.vue'),
            redirect: '/index',
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: () => import('./pages/index.vue')
                },
                {
                    path: 'product/:id',
                    name: 'product',
                    component: () => import('./pages/product.vue')
                },
                {
                    path: 'detail/:id',
                    name: 'detail',
                    component: import('./pages/detail.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./pages/login.vue')
        },
        {
            path: '/cart',
            name: 'cart',
            meta: {
                needLogin: true
            },
            component: () => import('./pages/cart.vue')
        },
        {
            path: '/order',
            name: 'order',
            meta: {
                needLogin: true
            },
            component: () => import('./pages/order.vue'),
            children: [
                {
                    path: 'list',
                    name: 'order-list',
                    component: () => import('./pages/orderList.vue')
                },
                {
                    path: 'confirm',
                    name: 'order-corfirm',
                    component: () => import('./pages/orderConfirm.vue')
                },
                {
                    path: 'pay',
                    name: 'order-pay',
                    component: () => import('./pages/orderPay.vue')
                },
                {
                    path: 'alipay',
                    name: 'alipay',
                    component: () => import('./pages/alipay.vue')
                }
            ]
        },
    ]
})

//判断页面是否需要先登录
router.beforeEach((to, from, next) => {
    if (to.meta.needLogin) {
        // console.log(new Vue().$cookie.get('userId'));
        if (new Vue().$cookie.get('userId') == null) {
            new Vue().$message.warning('正在跳转到登录界面')
            setTimeout(() => {
                router.push('/login')
            }, 1000)
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router