<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <loading v-show="loading"></loading>
        <ul class="order-wrap">
          <li class="order-item" v-for="(item,index) in list" :key="index">
            <div class="item-header">
              <div class="order-info">
                <span>{{item.createTime}}</span>
                <span class="line">|</span>
                <span>{{item.receiverName}}</span>
                <span class="line">|</span>
                <span>订单号：{{item.orderNo}}</span>
                <span class="line">|</span>
                <span>在线支付</span>
              </div>
              <div class="order-price">
                <span>应付金额：</span>
                <span class="price">{{item.payment | fromalPrice}}</span>
              </div>
            </div>
            <div class="item-content">
              <div class="content-l">
                <ul>
                  <li v-for="product in item.orderItemVoList" :key="product.productId">
                    <img v-lazy="product.productImage" alt />
                    <div class="product-des">
                      <div>{{product.productName}}</div>
                      <div>{{product.currentUnitPrice}} ✖ {{product.quantity}}</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="order-status" v-if="item.status==10">
                <a
                  href="javascript:;"
                  :class="getStatusClass(item.status)"
                  @click="toPay(item.orderNo)"
                >{{item.statusDesc}}</a>
              </div>
              <div class="order-status" v-else>
                <a href="javascript:;" :class="getStatusClass(item.status)">{{item.statusDesc}}</a>
              </div>
            </div>
          </li>
        </ul>
        <no-data v-show="!loading && list.length===0"></no-data>
        <!-- 分页器 -->
        <div class="pagination-wrap" v-show="list.length>0">
          <el-pagination
            background
            layout="prev, pager, next"
            :pageSize="pageSize"
            :total="total"
            @current-change="currentChange"
          ></el-pagination>
        </div>
        <!-- 点击加载更多 -->
        <!-- <p class="more" v-show="list.length>0 && hasMore" @click="getMore">点击加载更多...</p> -->
        <!-- 滚动加载更多 -->
        <!-- <div
          class="scroll-more"
          v-show="list.length>0 && hasMore"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="410"
        >
          <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt />
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import infiniteScroll from "vue-infinite-scroll";
import { getOrderList } from "@/api";
// 局部引用ui组件
import { Pagination } from "element-ui";
export default {
  name: "order-list",
  data() {
    return {
      list: [], //订单列表
      loading: true,
      pageSize: 10, //一页数据量
      pageNum: 1, //当前页码
      total: 0, //总页码
      hasMore: true, //数据是否还有
      busy: false //是否繁忙
    };
  },
  directives: { infiniteScroll },
  filters: {
    fromalPrice(val) {
      if (!val) return "0.00元";
      // 返回两个小数位的数额
      return `${val.toFixed(2)}元`;
    }
  },
  components: {
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]: Pagination
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    // 获取订单详情
    getOrderList() {
      this.busy = true;
      getOrderList(this.pageNum).then(res => {
        // 判断是否仍有数据
        // if (this.list.length >= res.total) {
        //   this.hasMore = false;
        //   return;
        // }
        this.busy = false;
        this.loading = false;
        // this.list = this.list.concat(res.list);
        this.list = res.list;
        this.total = res.total;
      });
    },
    // 判断并返回class
    getStatusClass(val) {
      let styleClass = "";
      switch (val) {
        case 10:
          styleClass = "default";
          break;
        case 20:
          styleClass = "green";
          break;
      }
      return styleClass;
    },
    // 跳转到支付页面
    toPay(orderNO) {
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo: orderNO
        }
      });
    },
    //页码发生改变
    currentChange(e) {
      console.log(e);
      this.pageNum = e;
      this.getOrderList();
    },
    // 点击加载更多
    getMore() {
      if (this.hasMore) {
        this.pageNum++;
        this.getOrderList();
      }
    },
    // 滚动加载更多
    loadMore: function() {
      // 一触发就关闭，然后等请求后来后再打开
      this.busy = true;
      console.log("chufa");
      this.getList();
    },
    // 滚动专用获取订单详情
    getList() {
      this.axios
        .get("/orders", {
          params: {
            pageNum: this.pageNum
          }
        })
        .then(res => {
          if (this.list.length >= res.total) {
            this.hasMore = false;
            this.busy = true;
            return;
          }
          this.list = this.list.concat(res.list);
          this.busy = false;
        });
    }
  }
};
</script>

<style lang='scss'>
@import "./../assets/scss/config.scss";
.order-list {
  .wrapper {
    .container {
      .order-wrap {
        width: 100%;
        padding-top: 33px;
        padding-bottom: 20px;
        .order-item {
          border: 1px solid $colorF;
          background-color: $colorK;
          margin-bottom: 31px;
          padding-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
          .item-header {
            height: 74px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 16px;
            padding: 0 43px;
            .order-info {
              color: $colorC;
              .line {
                margin: 0 9px;
              }
            }
            .order-price {
              .price {
                font-size: 26px;
                color: $colorB;
              }
            }
          }
          .item-content {
            padding: 0 43px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            .content-l {
              ul {
                li {
                  display: flex;
                  align-items: center;
                  margin-bottom: 5px;
                  :last-child {
                    margin-bottom: 0;
                  }
                  img {
                    width: 112px;
                  }
                  .product-des {
                    font-size: 20px;
                    color: $colorB;
                  }
                }
              }
            }
            .order-status {
              position: absolute;
              top: 20px;
              right: 43px;
              font-size: 20px;
              color: $colorA;
              a {
                color: $colorA;
                &.green {
                  color: blue;
                }
              }
            }
          }
        }
      }
      .pagination-wrap {
        text-align: right;
      }
      .pagination-wrap {
        margin-bottom: 10px;
        .el-pagination.is-background .el-pager li:not(.disabled).active {
          background-color: #ff6600;
        }
      }
      // .more {
      //   font-size: 30px;
      //   text-align: center;
      //   color: #ff6600;
      //   cursor: pointer;
      // }
      // .scroll-more {
      //   text-align: center;
      // }
    }
  }
}
</style>