<template>
  <div class="product-param" :class="{'fix':isFix}">
    <div class="container">
      <div class="pro-title">{{title}}</div>
      <div class="pro-param">
        <a href>概述</a>
        <span class="line">|</span>
        <a href>参数</a>
        <span class="line">|</span>
        <a href class="evaluate">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-param",
  data() {
    return {
      isFix: false
    }
  },
  props:{
    title:{
      type:String,
      default: '小米8'
    }
  },
  mounted() {
    //设置吸顶，给window绑定一个scroll事件,为heightTop事件
    window.addEventListener("scroll", this.heightTop);
  },
  methods: {
    heightTop() {
      //document.documentElement.scrollTop: 谷歌获取滚动高度
      //document.body.scrollTop: IE获取
      let top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFix = top >= 162 ? true : false;
    }
  },
//页面销毁的时候要干掉滚动事件，因为绑定在window上，所有页面都会滚动
  destroyed() {
      window.removeEventListener('scroll',this.heightTop,false)
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/config.scss";
.product-param {
  z-index: 30;
    background-color: #fff;
  &.fix {
      width: 100%;
      position: fixed;
      top: 0;
      box-shadow: 0 5px 5px #ccc;
  }
  .container {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid $colorH;
    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param {
      font-size: $fontJ;
      a {
        color: $colorC;
      }
      .line {
        margin: 0 10px;
      }
      .evaluate {
        margin-right: 11px;
      }
    }
  }
}
</style>