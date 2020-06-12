<template>
  <div class="index">
    <div class="container">
      <!-- 轮播图 -->
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item,index1) in menuList" :key="index1">
                  <li v-for="(sub,index2) in item" :key="index2">
                    <a :href="'/#/product/'+sub.id">
                      <img :src="sub.img" alt />
                      {{sub.name}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 配路由</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
              <div class="children"></div>
            </li>
          </ul>
        </div>
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="(item,index) in slideList" :key="index">
            <a :href="'/#/product/'+item.id">
              <img :src="item.img" alt />
            </a>
          </swiper-slide>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination" slot="pagination"></div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 广告 -->
      <div class="ads-box">
        <a :href="'/#/product/'+item.id" v-for="item in adsList" :key="item.id">
          <img v-lazy="item.img" alt />
        </a>
      </div>
      <!-- 横幅 -->
      <div class="banner">
        <a href="/#/product/30">
          <!-- 指令里面一定是变量，所以这里用单引号包裹起来 -->
          <img v-lazy="'/imgs/banner-1.png'" alt />
        </a>
      </div>
    </div>
    <!-- 商品 -->
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href>
              <img v-lazy="'/imgs/mix-alpha.jpg'" alt />
            </a>
          </div>
          <div class="list-box">
            <ul>
              <li v-for="item in phoneList" :key="item.id">
                <span
                  class="title"
                  :class="item.status===1?'new-pro':'kill-pro'"
                >{{item.status===1?'新品':'秒杀'}}</span>
                <img v-lazy="item.mainImage" alt />
                <span class="name">{{item.name}}</span>
                <span class="des">{{item.subtitle}}</span>
                <span class="price" @click="addCart(item.id)">{{item.price | formalPrice}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <model
      :showModel="showModel"
      title="提示"
      sureText="查看购物车"
      btnType="1"
      @confirm="confirm"
      modelType="middle"
      @cancel="showModel=false"
    >
      <!-- 指定插槽 -->
      <template v-slot:body>
        <p>商品添加成功!!!!</p>
      </template>
    </model>
  </div>
</template>

<script>
import ServiceBar from "../components/ServiceBar";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { getProductList,addCart } from "@/api";
import Model from "../components/Model";
import "swiper/css/swiper.css";
export default {
  name: "mall-index",
  data() {
    return {
      //轮播图配置
      swiperOptions: {
        autoplay: true,
        loop: true,
        effect: "cube",
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      // 轮播图
      slideList: [
        {
          id: "42",
          img: "/imgs/slider/slide-1.jpg"
        },
        {
          id: "45",
          img: "/imgs/slider/slide-2.jpg"
        },
        {
          id: "46",
          img: "/imgs/slider/slide-3.jpg"
        },
        {
          id: "42",
          img: "/imgs/slider/slide-4.jpg"
        },
        {
          id: "42",
          img: "/imgs/slider/slide-1.jpg"
        }
      ],
      // 菜单
      menuList: [
        [
          {
            id: 30,
            img: "/imgs/item-box-1.png",
            name: "小米CC9"
          },
          {
            id: 31,
            img: "/imgs/item-box-2.png",
            name: "小米8青春版 "
          },
          {
            id: 33,
            img: "/imgs/item-box-3.jpg",
            name: "Redmi K20 Pro"
          },
          {
            id: 34,
            img: "/imgs/item-box-4.jpg",
            name: "移动4G专区"
          }
        ],
        [
          {
            id: 30,
            img: "/imgs/item-box-1.png",
            name: "小米CC9"
          },
          {
            id: 31,
            img: "/imgs/item-box-2.png",
            name: "小米8青春版 "
          },
          {
            id: 33,
            img: "/imgs/item-box-3.jpg",
            name: "Redmi K20 Pro"
          },
          {
            id: 34,
            img: "/imgs/item-box-4.jpg",
            name: "移动4G专区"
          }
        ],
        [
          {
            id: 30,
            img: "/imgs/item-box-1.png",
            name: "小米CC9"
          },
          {
            id: 31,
            img: "/imgs/item-box-2.png",
            name: "小米8青春版 "
          },
          {
            id: 33,
            img: "/imgs/item-box-3.jpg",
            name: "Redmi K20 Pro"
          },
          {
            id: 34,
            img: "/imgs/item-box-4.jpg",
            name: "移动4G专区"
          }
        ],
        [
          {
            id: 30,
            img: "/imgs/item-box-1.png",
            name: "小米CC9"
          },
          {
            id: 31,
            img: "/imgs/item-box-2.png",
            name: "小米8青春版 "
          },
          {
            id: 33,
            img: "/imgs/item-box-3.jpg",
            name: "Redmi K20 Pro"
          },
          {
            id: 34,
            img: "/imgs/item-box-4.jpg",
            name: "移动4G专区"
          }
        ],
        [
          {
            id: 30,
            img: "/imgs/item-box-1.png",
            name: "小米CC9"
          },
          {
            id: 31,
            img: "/imgs/item-box-2.png",
            name: "小米8青春版 "
          },
          {
            id: 33,
            img: "/imgs/item-box-3.jpg",
            name: "Redmi K20 Pro"
          },
          {
            id: 34,
            img: "/imgs/item-box-4.jpg",
            name: "移动4G专区"
          }
        ],
        [
          {
            id: 30,
            img: "/imgs/item-box-1.png",
            name: "小米CC9"
          },
          {
            id: 31,
            img: "/imgs/item-box-2.png",
            name: "小米8青春版 "
          },
          {
            id: 33,
            img: "/imgs/item-box-3.jpg",
            name: "Redmi K20 Pro"
          },
          {
            id: 34,
            img: "/imgs/item-box-4.jpg",
            name: "移动4G专区"
          }
        ]
      ],
      // 广告
      adsList: [
        {
          id: 33,
          img: "/imgs/ads/ads-1.png"
        },
        {
          id: 48,
          img: "/imgs/ads/ads-2.jpg"
        },
        {
          id: 45,
          img: "/imgs/ads/ads-3.png"
        },
        {
          id: 47,
          img: "/imgs/ads/ads-4.jpg"
        }
      ],
      // 商品
      phoneList: [],
      showModel: false
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    ServiceBar,
    Model
  },
  filters: {
    formalPrice(val) {
      if (!val) return "￥0.00";
      return "￥" + val.toFixed(2) + "元";
    }
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    // 获取手机列表
    getProductList() {
      getProductList({ categoryId: 100012, pageSize: 14 }).then(res => {
        let list = res.list.splice(6, 14);
        list.forEach((item, index) => {
          if (index == 3 || index == 5 || index == 1) {
            item.status = 2;
          }
        });
        this.phoneList = list;
      });
    },
    // 添加购物车
    addCart(id) {
      if(!this.$store.state.username){
        this.$message.warning('请先登录...')
        setTimeout(() => {
          this.$router.push('/login')
        },1000)
        return
      }
        addCart({
           productId: id,
          selected: true
        }).then(res => {
          this.showModel = true;
          this.$store.dispatch("saveCartCount", res.cartTotalQuantity);
        })
    },
    // 确定
    confirm() {
      console.log("点击了确定");
      this.showModel = false;
      this.$router.push("/cart");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.index {
  .swiper-box {
    position: relative;
    // 根据手册直接覆盖
    .swiper-container {
      height: 451px;
      --swiper-pagination-color: blue;
      // 修改左箭头位置，直接12定位元素类
      // .swiper-button-prev:after{
      //   transform: translateX(264px);
      // }
      // 直接使用上面的类
      .swiper-button-prev {
        left: 274px;
      }
      a {
        display: inline-block;
        img {
          width: 100%;
          height: 451px;
        }
      }
    }
    .nav-menu {
      z-index: 10;
      width: 264px;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      // 如果使用opacity调透明度，字体也会透明，可以在谷歌上直接调
      background-color: #55595a85;
      .menu-wrap {
        padding: 26px 0;
        position: relative;
        .menu-item {
          height: 50px;
          line-height: 50px;
          padding-left: 26px;
          & > a {
            display: block;
            color: #fff;
            font-size: 16px;
            &:after {
              // 使用伪类加箭头
              content: " ";
              width: 10px;
              height: 15px;
              float: right;
              margin-right: 30px;
              margin-top: 26px;
              transform: translateY(-50%);
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
            }
          }
          &:hover {
            background-color: $colorA;
            .children {
              height: 451px;
              transition: all 0.5s;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            left: 264px;
            top: 0;
            width: 962px;
            height: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.5s;
            background-color: $colorG;
            border: 1px solid $colorH;
            box-sizing: border-box;
            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;
              li {
                height: 100%;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
                a {
                  color: $colorB;
                  font-size: 14px;
                  img {
                    width: 42px;
                    height: 35px;
                    margin-right: 15px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      background-color: #ccc;
      img {
        width: 296px;
        height: 167 px;
      }
    }
  }
  .banner {
    img {
      height: 130px;
      margin-bottom: 30px;
    }
  }
  .product-box {
    background-color: $colorJ;
    color: $colorB;
    padding-bottom: 50px;
    h2 {
      font-size: $fontF;
      height: 71px;
      line-height: 71px;
    }
    .wrapper {
      display: flex;
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        flex: 1;
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          li {
            width: 236px;
            height: 302px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: $colorG;
            cursor: pointer;
            &:nth-child(-n + 4) {
              margin-bottom: 14px;
            }
            .title {
              width: 67px;
              height: 24px;
              font-size: 14px;
              text-align: center;
              line-height: 24px;
              color: #fff;
              &.new-pro {
                background-color: #7ecf78;
              }
              &.kill-pro {
                background-color: #e82626;
              }
            }
            img {
              height: 195px;
              margin-bottom: 10px;
            }
            .name {
              font-size: $fontJ;
              color: $colorB;
              line-height: $fontJ;
              font-weight: bold;
            }
            .des {
              color: $colorD;
              line-height: 13px;
              margin: 6px auto;
            }
            .price {
              color: #f20a0a;
              font-weight: bold;
              font-size: $fontJ;
              cursor: pointer;
              &:after {
                content: " ";
                display: inline-block;
                margin-left: 5px;
                vertical-align: middle;
                @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
              }
            }
          }
        }
      }
    }
  }
}
</style>