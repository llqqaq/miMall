<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>
                请在
                <span>30分</span>内完成支付, 超时后将取消订单
              </p>
              <p>{{addressInfo.receiverName+' '}}{{addressInfo.receiverMobile}} {{addressInfo.receiverProvince+' '+addressInfo.receiverCity+' '+addressInfo.receiverDistrict+' '+addressInfo.receiverAddress}}</p>
            </div>
            <div class="order-total">
              <p>
                应付总额：
                <span>{{totalPrice}}</span>元
              </p>
              <p>
                订单详情
                <em
                  class="icon-down"
                  :class="{'up':showDetail}"
                  @click="showDetail = !showDetail"
                ></em>
              </p>
            </div>
          </div>
          <div class="item-detail" v-show="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderNo}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div
                class="detail-info"
              >{{addressInfo.receiverName+' '}}{{addressInfo.receiverMobile}} {{addressInfo.receiverProvince+' '+addressInfo.receiverCity+' '+addressInfo.receiverDistrict+' '+addressInfo.receiverAddress}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="item in productList" :key="item.productId">
                    <img v-lazy="item.productImage" alt />
                    {{item.productName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked':payType==1}" @click="toPay(1)"></div>
            <div class="pay pay-wechat" :class="{'checked':payType==2}" @click="toPay(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code v-show="isShow" :wxCode="wxCode" @close="close"></scan-pay-code>
    <model
      :showModel="showModel"
      title="确定支付"
      btnType="3"
      sureText="我的订单"
      cancelText="未支付"
      @confirm="confirm"
      @cancel="showModel=false"
    >
      <template v-slot:body>
        <p>请问您是否已经完成支付？</p>
      </template>
    </model>
  </div>
</template>
<script>
import OrderHeader from "../components/OrderHeader";
import ScanPayCode from "../components/ScanPayCode";
import Model from "../components/Model";
import { getOrderDetail, wxPay, getOrderPay } from "@/api";
import QRCode from "qrcode";
export default {
  name: "order-pay",
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      totalPrice: 0, //总价格
      productList: [], //商品
      addressInfo: {}, //地址信息
      showDetail: false, //是否显示
      payType: "", //支付类型
      isShow: false, //微信支付显示
      wxCode: "", //微信支付二维码
      showModel: false, //确认是否支付弹框层
      T: ""
    };
  },
  filters: {
    formalPhone(val) {
      val.forEach((item, index) => {
        if (index >= 3 || index <= 6) {
          item = "*";
        }
      });
      return val;
    }
  },
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    // 获取订单详情
    getOrderDetail() {
      getOrderDetail(this.orderNo).then(res => {
        console.log(res);
        let price = 0;
        res.orderItemVoList.forEach(item => {
          price += item.totalPrice;
        });
        this.totalPrice = price;
        this.productList = res.orderItemVoList;
        this.addressInfo = res.shippingVo;
      });
    },
    //支付类型
    toPay(type) {
      if (type === 1) {
        this.payType = 1;
        window.open(`/#/order/alipay?orderId=${this.orderNo}`, "_blank");
      } else {
        this.payType = 2;
        wxPay(this.orderNo, "Vue高仿小米商城", 0.01, 2).then(res => {
          //利用插件将返回的微信支付字符转换成二维码
          QRCode.toDataURL(res.content)
            .then(url => {
              this.isShow = true;
              this.wxCode = url;
              this.loop();
            })
            .catch(() => {
              this.$message.error("未能支付，可能是网络原因");
            });
        });
      }
    },
    // 关闭支付二维码
    close() {
      this.isShow = false;
      this.showModel = true;
      clearInterval(this.T);
    },
    // 完成支付，跳转到订单界面
    confirm() {
      this.$router.push("/order/list");
    },
    // 循环查看是否完成支付
    loop() {
      this.T = setInterval(() => {
        getOrderPay(this.orderNo).then(res => {
          // 状态码为20就是已完成支付
          if (res.status == 20) {
            this.$message.success("已完成支付，正跳转到我的订单页面...");
            clearInterval(this.T);
            setTimeout(() => {
              this.confirm();
            }, 2000);
          }
        });
      }, 1000);
    }
  },
  components: {
    OrderHeader,
    ScanPayCode,
    Model
  }
};
</script>
<style lang="scss">
.order-pay {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 61px;
    .order-wrap {
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 30px;
      .item-order {
        display: flex;
        align-items: center;
        .icon-succ {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: url("/imgs/icon-gou.png") #80c58a no-repeat center;
          background-size: 60px;
          margin-right: 40px;
        }
        .order-info {
          margin-right: 248px;
          h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
          }
          p {
            color: #666666;
            span {
              color: #ff6700;
            }
          }
        }
        .order-total {
          & > p:first-child {
            margin-bottom: 30px;
          }
          span {
            font-size: 28px;
            color: #ff6700;
          }
          .icon-down {
            display: inline-block;
            width: 14px;
            height: 10px;
            background: url("/imgs/icon-down.png") no-repeat center;
            background-size: contain;
            margin-left: 9px;
            transition: all 0.5s;
            cursor: pointer;
            &.up {
              transform: rotate(180deg);
            }
          }
          .up {
            transform: rotate(180deg);
          }
        }
      }
      .item-detail {
        border-top: 1px solid #d7d7d7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;
        transition: all 0.3s;
        .item {
          margin-bottom: 19px;
          .detail-title {
            float: left;
            width: 100px;
          }
          .detail-info {
            display: inline-block;
            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .item-pay {
      padding: 26px 50px 72px;
      background-color: #ffffff;
      color: #333333;
      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #333333;
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;
      }
      .pay-way {
        font-size: 18px;
        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid #d7d7d7;
          cursor: pointer;
          &:last-child {
            margin-left: 20px;
          }
          &.checked {
            border: 1px solid #ff6700;
          }
        }
        .pay-ali {
          background: url("/imgs/pay/icon-ali.png") no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }
        .pay-wechat {
          background: url("/imgs/pay/icon-wechat.png") no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>