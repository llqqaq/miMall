<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
  }, 
  mounted() {
    this.axios.get('/user/login').then(res => {
      console.log(res)
    })
  }
};
</script>

<style>
</style>
