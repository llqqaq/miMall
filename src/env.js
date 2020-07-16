// 如果使用的是CROS跨域或者jsonp跨域
let baseURL
console.log(`运行环境${process.env.NODE_ENV}`)
// 在package.json配置好，然后判断环境从而更改url
switch (process.env.NODE_ENV) {
    case 'development':
        baseURL = 'http://dev-mall-pre.springboot.cn/api'
        break;
    case 'test':
        baseURL = 'http://test-mall-pre.springboot.cn/api'
        break;
    case 'prod':
        baseURL = 'http://mall-pre.springboot.cn/api'
        break;
    default:
        baseURL = 'http://mall-pre.springboot.cn/api'
        break;
}

export default {
    baseURL
}


