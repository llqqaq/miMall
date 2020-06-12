<template>
  <!-- 动画效果需要自己尝试 -->
  <transition name="slide">
    <div class="model" v-show="showModel">
      <div class="mask"></div>
      <div class="model-dialog">
        <div class="model-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="cancel"></a>
        </div>
        <div class="model-body">
          <slot name="body"></slot>
        </div>
        <div class="model-footer">
          <a href="javascipt:;" class="btn" v-if="btnType==='1'" @click="confirm">{{sureText}}</a>
          <a href="javascipt:;" class="btn" v-if="btnType==='2'" @click="cancel">{{cancelText}}</a>
          <div class="btn-groud" v-if="btnType==='3'">
            <a href="javascipt:;" class="btn" @click="confirm">{{sureText}}</a>
            <a href="javascipt:;" class="btn btn-default" @click="cancel">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "model",
  data() {
    return{
      type:0
    }
  },
  props: {
    // 为了控制显示跟隐藏的动画效果，所以把showmoel放这里面
    showModel: Boolean,
    // 弹框大小: 小small，中middle，大large，表单form
    modelType: {
      type: String,
      default: "form"
    },
    // 标题
    title: {
      type: String,
      default: "这里是标题"
    },
    // 按钮类型，1确定按钮，2取消按钮，3确定取消
    btnType: String,
    // 确定按钮的文本
    sureText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    }
  },
  methods:{
    confirm() {
      this.$emit('confirm')
    },
    cancel() {
      this.$emit('cancel')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/config.scss";

.model {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  &.slide-enter-active,&.slide-leave-active{
    transition: all .5s;
  }
  // 刚进来跟离开后的样式
  &.slide-enter,&.slide-leave-to{
    top: -100%;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $colorI;
    opacity: 0.5;
  }
  .model-dialog {
    width: 660px;
    background-color: #fff;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    .model-header {
      height: 60px;
      line-height: 60px;
      font-size: $fontI;
      padding-left: 25px;
      background-color: $colorJ;
      .icon-close {
        position: absolute;
        top: 23px;
        right: 25px;
        width: 14px;
        height: 14px;
        background: url("/imgs/icon-close.png") no-repeat center;
        background-size: contain;
        transition: transform 0.3s;
        &:hover {
          transform: scale(1.5);
        }
      }
    }
    .model-body {
      padding: 42px 40px 54px;
      font-size: 14px;
    }
    .model-footer {
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>