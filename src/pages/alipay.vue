<template>
  <!-- 这个页面是中间页 -->
  <div class="ali-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="form" v-html="content"></div>
    <loading v-if="loading"></loading>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader";
import Loading from "../components/Loading";
import { paySubmit } from "@/api";
export default {
  name: "alipay",
  data() {
    return {
      content: "",
      orderId: this.$route.query.orderId,
      loading: true
    };
  },
  components: {
    OrderHeader,
    Loading
  },
  mounted() {
    this.paySubmit();
  },
  methods: {
    // 支付宝支付
    paySubmit() {
      paySubmit({
        orderId: this.orderId,
        orderName: "Vue高仿小米商城",
        amount: 0.01,
        payType: 1
      }).then(res => {
        // 返回一段html源码，调用api后， v-html渲染
        this.content = res.content;
        //缓冲时间
        setTimeout(() => {
          // 定位到第一个form元素，调用它的api
          document.forms[0].submit();
        }, 100);
      });
    }
  }
};
</script>

<style>
</style>