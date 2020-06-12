<template>
  <div class="order-header">
    <div class="container clearfix">
      <div class="header-logo">
        <a href="/#/index"></a>
      </div>
      <div class="title">
        <h2>
          {{title}}
          <span> <slot name="tip"></slot></span>
        </h2>
      </div>
      <div class="username">
        <a href="javascript:;">{{name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-header",
  data() {
    return{
    }
  },
  computed:{
    name() {
      return this.$store.state.username
    }
  },
  props: {
    title: String
  }
};
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
.order-header {
  padding: 30px 0;
  border-bottom: 2px solid #ff6600;
  .header-logo {
    float: left;
    width: 55px;
    height: 55px;
    background-color: #ff6600;
    a {
      display: inline-block;
      width: 110px;
      height: 55px;
      &:before {
        content: " ";
        @include bgImg(55px, 55px, "/imgs/mi-logo.png");
        transition: margin 0.3s;
      }
      &:after {
        content: " ";
        @include bgImg(55px, 55px, "/imgs/mi-home.png");
      }
      // 动画效果
      &:hover:before {
        margin-left: -55px;
        transition: margin 0.3s;
      }
    }
  }
  .title,
  .username {
    display: inline-block;
    height: 55px;
    line-height: 55px;
  }
  .title {
    float: left;
    margin-left: 54px;
    h2 {
      font-size: 28px;
      color: #333333;
    }
    span {
      font-size: 14px;
      margin-left: 17px;
      color: #999999;
      font-weight: 200;
    }
  }
  .username {
    float: right;
    a {
      color: #666666;
      font-size: 16px;
    }
  }
}

</style>