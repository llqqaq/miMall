export default{
    // 保存用户名
    saveUsername(context,username){
        context.commit('saveUsername',username)
    },
    // 保存购物车数量
    saveCartCount(context,cartCount) {
        context.commit('saveCartCount',cartCount)
    }
}