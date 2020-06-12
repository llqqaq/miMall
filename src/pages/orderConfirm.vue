<template>
  <div class="order-confirm">
    <order-header title="订单确认">
      <template v-slot:tip>
        <span>请认真填写收货地址</span>
      </template>
    </order-header>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="position: absolute; width: 0px; height: 0px; overflow: hidden;"
    >
      <defs>
        <symbol id="icon-add" viewBox="0 0 31 32">
          <title>add</title>
          <path
            d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z"
            class="path1"
          />
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path
            d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"
            class="path1"
          />
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path
            d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"
            class="path1"
          />
          <path
            d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path2"
          />
          <path
            d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path3"
          />
          <path
            d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path4"
          />
        </symbol>
      </defs>
    </svg>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clearfix">
              <div
                class="addr-info"
                :class="searchIndex==index?'checked': ''"
                v-for="(item,index) in addressList"
                :key="item.id"
                @click="searchIndex = index"
              >
                <h2>{{item.receiverName}}</h2>
                <div class="phone">{{item.receiverMobile}}</div>
                <div class="street">
                  {{item.receiverProvince}} {{item.receiverCity}}市 {{item.receiverDistrict}}
                  <br />
                  {{item.receiverAddress}}
                </div>
                <div class="action">
                  <a href="javascript:;" style="float: left" @click.stop="operateUrl(item,0)">
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del" />
                    </svg>
                  </a>
                  <a href="javascript:;" style="float:right" @click.stop="operateUrl(item,1)">
                    <svg class="icon icon-edit">
                      <use xlink:href="#icon-edit" />
                    </svg>
                  </a>
                </div>
              </div>
              <div class="addr-add" @click="operateUrl">
                <div class="icon-add"></div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <li v-for="item in productList" :key="item.productId">
                <div class="good-name">
                  <img v-lazy="item.productMainImage" alt />
                  <span>{{item.productName + ' ' + item.productSubtitle}}</span>
                </div>
                <div class="good-price">{{item.productPrice}}元x{{item.quantity}}</div>
                <div class="good-total">{{item.productTotalPrice}}元</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{productNum}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <!-- model -->
    <model
      :title="title"
      :showModel="showModel"
      :btnType="btnType"
      @cancel="showModel=false"
      @confirm="confirm"
      class="model"
    >
      <template v-slot:body>
        <p v-show="type==0">确认删除该地址？</p>
        <div v-show="type==1 || type==2" class="model-body">
          <div class="user-info">
            <input type="text" placeholder="收件人" v-model.trim="name" />
            <input type="text" placeholder="手机号" v-model.trim="phone" />
          </div>
          <div class="picker-wrap">
            <v-distpicker :province="province" :city="city" :area="area" @selected="selected"></v-distpicker>
          </div>
          <div class="detail-address">
            <input type="textarea" placeholder="详细地址" v-model.trim="detailAddress" />
          </div>
          <div class="code">
            <input type="邮政编码" placeholder="邮政编码" v-model.trim="code" />
          </div>
        </div>
      </template>
    </model>
  </div>
</template>
<script>
import OrderHeader from "../components/OrderHeader";
import VDistpicker from "v-distpicker";
import Model from "../components/Model";
import {
  getAddressList,
  getCartList,
  deleteAddressXhr,
  updateAddressXhr,
  addAddressXhr,
  orderSubmit
} from "@/api";
export default {
  name: "order-confirm",
  data() {
    return {
      province: "",
      city: "",
      area: "",
      addressList: [], //收货地址列表
      productList: [], //商品列表
      cartTotalPrice: 0, //总价格
      productNum: 0, //商品总件数
      title: "",
      showModel: false,
      btnType: "",
      type: 0, //删除0，编辑1，新增2
      urlObj: {}, //正在操作的对象
      detailAddress: "", //详细地址
      code: "", //邮政编码
      name: "", //收件人
      phone: "", //号码
      searchIndex: 0
    };
  },
  components: {
    OrderHeader,
    Model,
    VDistpicker
  },
  mounted() {
    this.getAddressList();
    this.getCartList();
  },
  methods: {
    // 获取收货地址
    getAddressList() {
      getAddressList().then(res => {
        this.addressList = res.list;
      });
    },
    // 获取购物车列表
    getCartList() {
      getCartList().then(res => {
        this.productList = res.cartProductVoList.filter(
          item => item.productSelected
        );
        this.cartTotalPrice = res.cartTotalPrice;
        res.cartProductVoList.forEach(item => {
          if (item.productSelected) {
            this.productNum += item.quantity;
          }
        });
      });
    },
    operateUrl(item, type) {
      this.urlObj = item || {};
      this.showModel = true;
      this.type = type;
      if (type === 0) {
        this.title = "删除";
        this.btnType = "3";
      } else if (type === 1) {
        this.title = "编辑地址";
        this.btnType = "1";
        this.name = item.receiverName;
        this.phone = item.receiverPhone;
        this.province = item.receiverProvince;
        this.city = item.receiverCity;
        this.area = item.receiverDistrict;
        this.detailAddress = item.receiverAddress;
        this.code = item.receiverZip;
      } else {
        this.title = "新增地址";
        this.btnType = "3";
        this.type = 2;
      }
    },
    // 发送删除地址请求
    deleteAddressXhr(id) {
      deleteAddressXhr(id).then(() => {
        // 重新拉取地址
        this.getAddressList();
        this.$message.success("删除成功");
        this.urlObj = {};
      });
    },
    //发送编辑地址请求
    updateAddressXhr(id) {
      let errMsg = this.publicLogic();
      if (errMsg) {
        this.$message.error(errMsg);
        return;
      }
      let params = this.publicCopy();
      updateAddressXhr(id, params).then(() => {
        this.getAddressList();
        this.$message.success("修改成功");
        // 记住要置空
        this.renderCode();
      });
    },
    //发送新增地址请求
    addAddressXhr() {
      let errMsg = this.publicLogic();
      if (errMsg) {
        this.$message.error(errMsg);
        return;
      }
      let params = this.publicCopy();
      addAddressXhr(params).then(() => {
        this.$message.success("新建地址成功");
        // 重新调用地址
        this.getAddressList();
        // 清空
        this.renderCode();
      });
    },
    // 点击确定后
    confirm() {
      if (this.type === 0) {
        // 删除操作
        this.deleteAddressXhr(this.urlObj.id);
        this.showModel = false;
      } else if (this.type === 1) {
        // 编辑操作
        this.showModel = false;
        this.updateAddressXhr(this.urlObj.id);
      } else {
        //新增操作
        this.showModel = false;
        this.addAddressXhr();
      }
    },
    //结算订单
    orderSubmit() {
      let item = this.addressList[this.searchIndex];
      if (!item) {
        this.$message.warning("请选择地址");
        return;
      }
      orderSubmit(item.id).then(res => {
        this.$router.push({
          path: "/order/pay",
          query: {
            orderNo: res.orderNo
          }
        });
      });
    },
    // 省市区联动选择后触发
    selected(e) {
      this.province = e.province.value;
      this.city = e.city.value;
      this.area = e.area.value;
    },
    // 置空公共代码
    renderCode() {
      this.name = "";
      this.phone = "";
      this.province = "";
      this.city = "";
      this.area = "";
      this.detailAddress = "";
      this.code = "";
      this.urlObj = {};
    },
    // 公共判断逻辑
    publicLogic() {
      let errMsg;
      let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/; //手机正则
      var pattern = /^[0-9]{6}$/; //邮政编码正则
      if (!this.name) {
        errMsg = "收件人不能为空";
      } else if (!this.phone || !myreg.test(this.phone)) {
        errMsg = "手机号格式不正确";
      } else if (!this.city) {
        errMsg = "省市区不正确";
      } else if (!this.detailAddress) {
        errMsg = "详细地址不能为空";
      } else if (!this.code || !pattern.test(this.code)) {
        errMsg = "邮政编码格式出错";
      }
      return errMsg;
    },
    // 公共赋值逻辑
    publicCopy() {
      let params = {
        receiverName: this.name,
        receiverPhone: this.phone,
        receiverProvince: this.province,
        receiverCity: this.city,
        receiverDistrict: this.area,
        receiverAddress: this.detailAddress,
        receiverZip: this.code
      };
      return params;
    }
  }
};
</script>
<style lang="scss">
.order-confirm {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 84px;
    .order-box {
      background-color: #ffffff;
      padding-left: 40px;
      padding-bottom: 40px;
      .addr-title {
        font-size: 20px;
        color: #333333;
        font-weight: 200;
        margin-bottom: 21px;
      }
      .item-address {
        padding-top: 38px;
        .addr-list {
          .addr-info,
          .addr-add {
            box-sizing: border-box;
            float: left;
            width: 271px;
            height: 180px;
            border: 1px solid #e5e5e5;
            margin-right: 15px;
            padding: 15px 24px;
            font-size: 14px;
            color: #757575;
          }
          .addr-info {
            cursor: pointer;
            margin-bottom: 8px;
            h2 {
              height: 27px;
              font-size: 18px;
              font-weight: 300;
              color: #333;
              margin-bottom: 10px;
            }
            .street {
              height: 50px;
            }
            .action {
              height: 50px;
              line-height: 50px;
              .icon {
                width: 20px;
                height: 20px;
                fill: #666666;
                vertical-align: middle;
                &:hover {
                  fill: #ff6700;
                }
              }
            }
            &.checked {
              border: 1px solid #ff6700;
            }
          }
          .addr-add {
            text-align: center;
            color: #999999;
            cursor: pointer;
            .icon-add {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: url("/imgs/icon-add.png") #e0e0e0 no-repeat center;
              background-size: 14px;
              margin: 0 auto;
              margin-top: 45px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .item-good {
        margin-top: 34px;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 12px;
        h2 {
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 5px;
        }
        li {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          font-size: 16px;
          color: #333333;
          .good-name {
            flex: 5;
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
          .good-price {
            flex: 2;
          }
          .good-total {
            padding-right: 44px;
            color: #ff6600;
          }
        }
      }
      .item-shipping,
      .item-invoice {
        margin-top: 31px;
        line-height: 20px;
        h2 {
          display: inline-block;
          margin-right: 71px;
          font-size: 20px;
          width: 80px;
        }
        span,
        a {
          font-size: 16px;
          color: #ff6700;
          margin-right: 23px;
        }
      }
      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid #f5f5f5;
        text-align: right;
        font-size: 16px;
        color: #666666;
        .item-val {
          color: #ff6700;
        }
        .item {
          line-height: 15px;
          margin-bottom: 12px;
        }
        .item-val {
          display: inline-block;
          width: 100px;
        }
        .item-total {
          .item-val {
            font-size: 22px;
          }
        }
      }
      .btn-group {
        margin-top: 37px;
        text-align: right;
      }
    }
  }
  .edit-wrap {
    font-size: 14px;
    .item {
      margin-bottom: 15px;
      .input {
        display: inline-block;
        width: 283px;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border: 1px solid #e5e5e5;
        & + .input {
          margin-left: 14px;
        }
      }
      select {
        height: 40px;
        line-height: 40px;
        border: 1px solid #e5e5e5;
        margin-right: 15px;
      }
      textarea {
        height: 62px;
        width: 100%;
        padding: 13px 15px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
      }
    }
  }
  .model {
    .model-body {
      > div {
        margin-bottom: 15px;
        font-size: 14px;
      }
      .user-info {
        input {
          box-sizing: border-box;
          display: inline-block;
          width: 283px;
          height: 40px;
          line-height: 40px;
          padding-left: 15px;
          border: 1px solid #e5e5e5;
          &:first-child {
            margin-right: 14px;
          }
        }
      }
      .detail-address {
        height: 62px;
        width: 100%;
        padding: 13px 15px;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        input {
          width: 100%;
          height: 100%;
        }
      }
      .code {
        width: 100%;
        height: 40px;
        padding: 13px 15px;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        input {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>