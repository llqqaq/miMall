<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username" class="username">
            {{username}}
            <span class="sign-out" @click="logout">退出</span>
          </a>
          <a href="javascript:;" v-if="!username" @click="toLogin">登录</a>
          <a href="javascript:;" v-if="username" @click="toMyOrder">我的订单</a>
          <a href="javascript:;" v-if="!username">注册</a>
          <a href="javascript:;" class="my-cart" @click="toCart">
            <span class="icon-cart"></span>购物车
            <span v-show="username">({{cartCount}})</span>
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li v-for="item in phoneList" :key="item.id">
                  <!-- 注意这里的拼接跳转 -->
                  <a :href="'/#/product/'+item.id">
                    <div>
                      <img v-lazy="item.mainImage" alt />
                    </div>
                    <div class="name">{{item.name}}</div>
                    <!-- 这里使用过滤器 -->
                    <div class="price">{{item.price | fromalPrice}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li>
                  <a href target="_blank">
                    <div>
                      <img src="/imgs/nav-img/nav-3-1.jpg" alt />
                    </div>
                    <div class="name">小米壁画电视</div>
                    <div class="price">6999元</div>
                  </a>
                </li>
                <li>
                  <a href target="_blank">
                    <div>
                      <img src="/imgs/nav-img/nav-3-2.jpg" alt />
                    </div>
                    <div class="name">小米电视4A 32寸</div>
                    <div class="price">1799元</div>
                  </a>
                </li>
                <li>
                  <a href target="_blank">
                    <div>
                      <img src="/imgs/nav-img/nav-3-3.png" alt />
                    </div>
                    <div class="name">小米CC9</div>
                    <div class="price">1799元</div>
                  </a>
                </li>
                <li>
                  <a href target="_blank">
                    <div>
                      <img src="/imgs/nav-img/nav-3-4.jpg" alt />
                    </div>
                    <div class="name">小米CC9</div>
                    <div class="price">1799元</div>
                  </a>
                </li>
                <li>
                  <a href target="_blank">
                    <div>
                      <img src="/imgs/nav-img/nav-3-5.jpg" alt />
                    </div>
                    <div class="name">小米CC9</div>
                    <div class="price">1799元</div>
                  </a>
                </li>
                <li>
                  <a href target="_blank">
                    <div>
                      <img src="/imgs/nav-img/nav-3-6.png" alt />
                    </div>
                    <div class="name">小米CC9</div>
                    <div class="price">1799元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductList, logout,getCartCount } from "@/api";
export default {
  name: "nav-header",
  data() {
    return {
      phoneList: []
    };
  },
  mounted() {
    this.getProductList();
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    cartCount() {
      return this.$store.state.cartCount;
    }
  },
  filters: {
    fromalPrice(val) {
      if (!val) return "0.00元";
      // 返回两个小数位的数额
      return `￥${val.toFixed(2)}元`;
    }
  },
  methods: {
    // 获取手机列表
    getProductList() {
      getProductList({
        categoryId: "100012",
        pageSize: 6
      }).then(res => {
        this.phoneList = res.list.splice(0, 6);
      });
    },
    // 跳转到登录页面
    toLogin() {
      this.$router.push("/login");
    },
    // 跳转到购物车
    toCart() {
      this.$router.push("/cart");
    },
    // 退出登录
    logout() {
      logout().then(() => {
        this.$message.success("退出成功");
        // 这个插件可以用来保存token???
        // 不对呀,这里的id会自动携带过去
        this.$cookie.set("userId", "", { expires: "-1" });
        this.$store.dispatch("saveUsername", "");
        this.$store.dispatch("saveCartCount", 0);
      });
    },
    // 获取购物车数量
    getCartCount() {
      getCartCount().then(res => {
        this.$store.dispatch("saveCartCount", res);
      });
    },
    // 跳转到我的订单
    toMyOrder() {
      this.$router.push("/order/list");
    }
  },
  created() {
    // 判断是否从首页过来的(非第一次加载项目)
    if (this.$route.query.from === "login") {
      this.getCartCount();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.header {
  .nav-topbar {
    width: 100%;
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #b0b0b0;
    .container {
      height: 100%;
      @include flex();
      .username {
        position: relative;
        .sign-out {
          position: absolute;
          top: 100%;
          left: 0;
          width: 40px;
          display: none;
          z-index: 30;
        }
        &:hover {
          .sign-out {
            display: block;
          }
        }
      }
      a {
        color: #b0b0b0;
        display: inline-block;
        margin-right: 17px;
      }
      a:nth-child(3) {
        margin-right: 0;
      }
      .my-cart {
        width: 110px;
        background-color: #ff6600;
        color: #fff;
        text-align: center;
        .icon-cart {
          display: inline-block;
          height: 12px;
          width: 16px;
          // 设置背景图片
          background: url("/imgs/icon-cart-checked.png") no-repeat;
          background-size: contain;
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      height: 112px;
      position: relative;
      @include flex();
      .header-menu {
        width: 643px;
        padding-left: 209px;
        .item-menu {
          color: #333333;
          margin-right: 20px;
          font-weight: bold;
          font-size: 16px;
          line-height: 16px;
          display: inline-block;
          height: 112px;
          line-height: 112px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
              border-top: 1px solid #e5e5e5;
              box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              transition: all 0.5s;
            }
          }
          .children {
            z-index: 20;
            height: 0;
            opacity: 0;
            width: 1226px;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 112px;
            font-size: 12px;
            line-height: 12px;
            transition: all 0.5s;
            background-color: #fff;
            ul {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              li {
                width: 16.6%;
                height: 100%;
                position: relative;
                // 设置边框
                &:before {
                  content: " ";
                  position: absolute;
                  top: 20px;
                  right: 0;
                  border-left: 1px solid $colorF;
                  width: 1px;
                  height: 100px;
                }
                // 去掉最后一个
                &:last-child:before {
                  display: none;
                }
                a {
                  margin-top: 10px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  img {
                    width: auto;
                    height: 111px;
                  }
                  .price {
                    color: $colorA;
                  }
                  .name {
                    font-weight: bold;
                    margin-top: 19px;
                    margin-bottom: 8px;
                  }
                }
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          display: flex;
          align-items: center;
          input {
            box-sizing: border-box;
            border-right: 1px solid #e0e0e0;
            padding-left: 14px;
            height: 50px;
            width: 264px;
          }
          a {
            @include bgImg(18px, 18px, "/imgs/icon-search.png");
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>