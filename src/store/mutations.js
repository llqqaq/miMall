export default{
    // 保存用户名
    saveUsername(state,username){
        state.username = username
    },
    // 保存购物车数量
    saveCartCount(state,cartCount) {
        state.cartCount = cartCount
    }
}