<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getUserInfo, getCartCount } from "@/api";
export default {
  name: "App",
  components: {},
  mounted() {
    // 判断是否登录状态
    if (this.$cookie.get("userId")) {
      this.getUserInfo();
      this.getCartCount();
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      getUserInfo().then(res => {
        console.log("我还是执行了");
        this.$store.dispatch("saveUsername", res.username);
      });
    },
    getCartCount() {
      getCartCount().then(res => {
        console.log(res);
        this.$store.dispatch("saveCartCount", res);
      });
    }
  }
};
</script>

<style>
</style>
