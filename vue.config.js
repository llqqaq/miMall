module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: "http://mall-pre.springboot.cn",
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''    //将api置空
                }
            }
        }
    },
    productionSourceMap: false,  //关闭map文件，打包后别人看不到我们的源码。也可以加快打包速度
    // 合并webpack的打包配置
    // configureWebpack: {
    //     // 忽略那些模块
    //     externals: {
    //         // 左边 模块的名字
    //         // 右边 模块暴露给开发者使用的名字
    //         vue: 'Vue',
    //         axios: 'axios',
    //         'element-ui': 'ELEMENT' //ElementUI Element  ELEMENT
    //     }
    // }
} 