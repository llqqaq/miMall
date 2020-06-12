import axios from 'axios'
import { Message } from 'element-ui'

// 设置基地址
// 如果是通过代理
// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = (process.env.NODE_ENV === 'development') ? '/api' : 'http://mall-pre.springboot.cn'
console.log(axios.defaults.baseURL);

// 如果是普通的jsonp或者CROS
// axios.defaults.baseURL = env.baseURL
// console.log(env.baseURL)
// 设置超时
axios.defaults.timeout = 8000

// 请求响应拦截器
// 可以在npm的axios文档查看
//第一个fun是业务拦截，状态码为200
//第二个是拦截HTtp状态码500错误
axios.interceptors.response.use(function (response) {
    let res = response.data
    // 获取哈希hash地址
    let path = location.hash
    if (res.status == 0) {
        return res.data
    } else if (res.status == 10) {
        // 跳转到登录界面
        // 这里不可以用路由跳转，没有this
        if (path != '#/index') {
            Message.warning('请先登录')
            window.location.href = '/#/login'
        }
        return Promise.reject(res);
    } else {
        Message.warning(res.msg)
        console.log('wozhixingle')
        return Promise.reject(res)
    }
}, (error) => {
    let res = error.response
    Message.error(res.data.message)
    return Promise.reject(error)
})

/**
 * 
 * 下面为api接口
 */

//获取手机商品列表
export const getProductList = ({ categoryId, pageSize }) => {
    return axios.get('/products', {
        params: {
            categoryId,
            pageSize
        }
    })
}

// 获取商品详情
export const getProductInfo = (productId) => {
    return axios.get(`/products/${productId}`)
}

// 添加购物车
export const addCart = ({ productId, selected }) => {
    return axios.post('/carts', {
        productId,
        selected
    })
}

// 注册
export const register = () => {
    return axios.post("/user/register", {
        username: "",
        password: "",
        email: ""
    })
}

// 登录
export const login = ({ username, password }) => {
    return axios.post('user/login', {
        username,
        password
    })
}

//退出登录
export const logout = () => {
    return axios.post('/user/logout')
}

//获取用户信息
export const getUserInfo = () => {
    return axios.get("/user")
}

//获取购物车数量
export const getCartCount = () => {
    return axios.get('/carts/products/sum')
}

// 获取购物车信息
export const getCartList = () => {
    return axios.get('/carts')
}

// 购物车取消/勾选全选
export const toggleAll = (url) => {
    return axios.put(url)
}

//更新购物车数量和购物车单选状态
export const updateCart = (productId, quantity, selected) => {
    return axios.put(`/carts/${productId}`, {
        quantity,
        selected
    }
    )
}

// 购物车删除商品
export const delProduct = (productId) => {
    return axios.delete(`/carts/${productId}`)
}

// 编辑收货地址
export const updateAddressXhr = (id, params) => {
    return axios.put(`/shippings/${id}`, params)
}

// 删除收货地址
export const deleteAddressXhr = (id) => {
    return axios.delete(`shippings/${id}`)
}

// 新增收货地址
export const addAddressXhr = (params) => {
    return axios.post("/shippings", params)
}

//获取收货地址列表
export const getAddressList = () => {
    return axios.get("/shippings")
}


// 订单提交，生成订单编号
export const orderSubmit = (shippingId) => {
    return axios.post("/orders",{
        shippingId
    })
}

//获取我的所有订单
export const getOrderList =(pageNum) => {
    return axios.get('/orders',{
        params:{
            pageNum
        }
    })
} 

// 获取订单详情
export const getOrderDetail = (orderNo) => {
    return axios.get(`/orders/${orderNo}`)
}

// 微信支付接口
export const wxPay = (orderId,orderName,amount,payType) => {
    return axios.post("/pay",{
        orderId,
        orderName,
        amount,
        payType
    })
}

//支付宝支付接口
export const paySubmit = ({ orderId, orderName, amount, payType }) => {
    return axios.post('/pay', {
        orderId,
        orderName,
        amount,
        payType
    })
}

// 查看订单支付情况
export const getOrderPay = (orderNo) => {
    return axios.get(`/orders/${orderNo}`)
}