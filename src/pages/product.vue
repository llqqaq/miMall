<template>
  <div class="product">
    <product-param>
      <template v-slot:buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-param>
    <div class="content">
      <!-- 动态设置背景图片 -->
      <div class="item-bg" :style="{background: 'url(' + product.mainImage + ') no-repeat center'}">
        <h2>{{product.name}}</h2>
        <h3>{{product.subtitle}}</h3>
        <p>
          <a href id>全球首款双频 GP</a>
          <span>|</span>
          <a href id>骁龙845</a>
          <span>|</span>
          <a href id>AI 变焦双摄</a>
          <span>|</span>
          <a href id>红外人脸识别</a>
        </p>
        <div class="price">
          <span>
            ￥
            <em>{{product.price}}</em>
          </span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <swiper :options="swiperOption">
          <swiper-slide>
            <img src="/imgs/product/gallery-2.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-3.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-4.png" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-5.jpg" alt />
          </swiper-slide>
          <swiper-slide>
            <img src="/imgs/product/gallery-6.jpg" alt />
          </swiper-slide>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>
          60帧超慢动作摄影
          <br />慢慢回味每一瞬间的精彩
        </h2>
        <p>
          后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！
          <br />更能AI 精准分析视频内容，15个场景智能匹配背景音效。
        </p>
        <div class="video-bg" @click="showSlide='slideDown'"></div>
        <transition name="slide">
          <div class="video-box">
            <div class="overlay" v-show="showSlide==='slideDown'"></div>
            <div class="video" :class="showSlide">
              <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
              <span class="icon-close" @click="showSlide = 'slideUp'"></span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParam from "../components/ProductParam";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { getProductInfo } from "@/api";
export default {
  name: "product",
  data() {
    return {
      showSlide: "", //控制动画效果
      product: {}, //商品信息
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
      }
    };
  },
  components: {
    ProductParam,
    Swiper,
    SwiperSlide
  },
  methods: {
    getProductInfo() {
      let id = this.$route.params.id;
      getProductInfo(id).then(res => {
        console.log(res);
        this.product = res;
      });
    },
    buy() {
      let id = this.$route.params.id;
      this.$router.push(`/detail/${id}`);
    }
  },
  mounted() {
    this.getProductInfo();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
.product {
  .content {
    .item-bg {
      // background: url("/imgs/product/product-bg-1.png") no-repeat center;
      background-repeat: "no-repeat";
      background-position: "center";
      height: 718px;
      color: skyblue;

      text-align: center;
      h2 {
        font-size: 80px;
        padding-top: 55px;
      }
      h3 {
        font-size: 24px;
        letter-spacing: 10px;
      }
      p {
        margin-top: 21px;
        margin-bottom: 40px;
        a {
          font-size: 16px;
          color: #fff;
        }
        span {
          margin: 0 15px;
        }
      }
      .price {
        font-size: 30px;
        color: #fff;
        em {
          font-style: normal;
          font-size: 38px;
        }
      }
    }
    .item-bg-2 {
      background: url(/imgs/product/product-bg-2.png) no-repeat center;
      height: 480px;
      background-size: 1226px 397px;
    }
    .item-bg-3 {
      background: url(/imgs/product/product-bg-3.png) no-repeat center;
      height: 638px;
      background-size: cover;
    }
    .item-swiper {
      // .swiper-container {
      //   width: 100%;
      //   height: 600px;
      // }
      margin: 36px auto 52px;
      .desc {
        font-size: 18px;
        color: #333333;
        text-align: center;
      }
      img {
        width: 100%;
      }
    }
    .item-video {
      height: 1044px;
      background-color: #070708;
      margin-bottom: 76px;
      color: #ffffff;
      text-align: center;
      h2 {
        font-size: 60px;
        padding-top: 82px;
        margin-bottom: 47px;
      }
      p {
        font-size: 24px;
        margin-bottom: 58px;
      }
      .video-bg {
        background: url("/imgs/product/gallery-1.png") no-repeat center;
        background-size: cover;
        width: 1226px;
        height: 540px;
        margin: 0 auto 120px;
        cursor: pointer;
      }
      .video-box {
        .overlay {
          z-index: 10;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-color: #333333;
          opacity: 0.4;
        }
        .video {
          // // 实现从上划出划入，用transition实现
          
          // z-index: 10;
          // width: 1000px;
          // height: 536px;
          // position: fixed;
          // top: -50%;
          // left: 50%;
          // transform: translate(-50%, -50%);
          // opacity: 0;
          // transition: all .5s;
          // &.slide{
          //   top: 50%;
          //   opacity: 1;
          // }
          // 实现从上划出划入，用animation实现
          position: relative;
          z-index: 10;
          width: 1000px;
          height: 536px;
          position: fixed;
          top: -100%;
          left: 50%;
          transform: translate(-50%, -50%);
          &.slideDown {
            // 动画只执行一次,之后还原成原来的效果
            animation: slideDown 0.6s;
            top: 50%;
          }
          &.slideUp {
            animation: slideUp 0.6s;
          }
          // 成双成对出现
          @keyframes slideDown {
            from {
              top: -50%;
              opacity: 0;
            }
            to {
              top: 50%;
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              top: 50%;
              opacity: 1;
            }
            to {
              top: -50%;
              opacity: 0;
            }
          }
          .icon-close {
            position: absolute;
            top: 20px;
            right: 20px;
            @include bgImg(20px, 20px, "/imgs/icon-close.png");
            cursor: pointer;
            z-index: 11;
          }
          video {
            width: 100%;
            height: 100%;
            // video组件有原生的阴影，类似input这些，这里让他覆盖
            object-fit: cover;
            outline: none;
          }
        }
      }
    }
  }
}
</style>