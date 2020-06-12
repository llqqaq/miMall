<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href>米家</a>
      <span>|</span>
      <a href>政策服务</a>
      <span>|</span>
      <a href>小米天猫店</a>
      <span>|</span>
      <a href>游戏</a>
      <span>|</span>
      <a href>用户协议</a>
      <span>|</span>
    </div>
    <div class="footer-statement">
      违法和不良信息举报电话:
      <span class="phone">185-0130-1238</span> 知识产权侵权投诉 本网站所列数据，除特殊说明，所有数据均出自我司实验室测试
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-footer"
};
</script>

<style lang="scss" scoped>
.footer {
  height: 234px;
  background-color: #333333;
  border-top: 4px solid #ff6600;
  color: #999999;
  font-size: 16px;
  text-align: center;
  .footer-logo {
    margin-top: 46px;
    margin-bottom: 30px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    margin-bottom: 10px;
    a {
      color: #999999;
    }
    span {
      margin: 0 10px;
    }
  }
  .footer-statement {
    .phone {
      color: #ff6600;
    }
  }
}
</style>