<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img src="/imgs/login-logo.png" alt />
      </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <div class="form-header">
            <span class="num-login" :class="type==='num'?'checked': ''" @click="numLogin">账号登录</span>
            <span class="line">|</span>
            <span class="code-login" :class="type==='code'?'checked': ''" @click="codeLogin">扫码登录</span>
          </div>
          <div v-if="type === 'num'">
            <div class="input-wrap">
              <input type="text" placeholder="邮箱/手机/小米账号" v-model.trim="username" />
              <input type="password" placeholder="密码" v-model.trim="password" />
            </div>
            <div class="btn-wrap">
              <a href="javascript:;" @click="login">登录</a>
            </div>
            <div class="form-footer">
              <span class="left">
                <a href="javascript:;">手机短信登录/注册</a>
              </span>
              <div class="right">
                <span>
                  <a href="javascript:;">立即注册&nbsp;</a>
                </span>
                <span>
                  <a href="javascript:;">忘记密码？</a>
                </span>
              </div>
            </div>
          </div>
          <div v-if="type === 'code'">
            <div class="code-wrap">
              <img src="/imgs/code.jpg" alt />
            </div>
            <div class="code-footer">
              <div>
                使用
                <span style="color:#ff6600;">&nbsp;使用小米&nbsp;</span>掃一掃
              </div>
              <div>小米手機可打開「設置」>「小米帳號」掃碼登入</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="https://www.imooc.com/u/1343480" target="_blank">小米主页</a>
        <span>|</span>
        <a href="https://coding.imooc.com/class/113.html" target="_blank">小米手机</a>
        <span>|</span>
        <a href="https://coding.imooc.com/class/236.html" target="_blank">小米智能机器人</a>
        <span>|</span>
        <a href="https://coding.imooc.com/class/343.html" target="_blank">小米家用设备</a>
      </div>
      <p class="copyright">小米公司版權所有-京ICP備10046444-京公網安備11010802020134號-京ICP證110507號</p>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api";
export default {
  name: "login",
  data() {
    return {
      type: "num",
      username: "",
      password: "",
      userId: ""
    };
  },
  methods: {
    codeLogin() {
      this.type = "code";
    },
    numLogin() {
      this.type = "num";
    },
    // 登录
    login() {
      //解构赋值
      let { username, password } = this;
      if (!username || !password) {
        this.$message.warning("账号/密码不能为空");
        return;
      }
      login({
        username,
        password
      })
        .then(res => {
          // 保存到cookie中，时间为一个月
          // 可以到npm官网查看vue-cookie的用法
          //SessionId是前端跟后端识别生成的,用来判断某个人的身份,自动携带在请求头
          // 保存跟SessionId一样的过期时间,会话级别,浏览器关闭掉就会过期,所以每次关闭后重新打开就得重新登录
          this.$cookie.set("userId", res.id, { expires: "Session" });
          this.$store.dispatch("saveUsername", res.username);
          // 使用params传参,参数不会显示在url上面,类似post传参,通过数据流传参
          // this.$router.push({
          //   name:'index', //这里对应路由的名称,不是路径
          //   params:{
          //     from: 'login'
          //   }
          // })
          this.$message.success('登录成功!')
          setTimeout(() => {
            // 使用query传参,类似get传参,明文
            this.$router.push({
              path: "/index",
              query: {
                from: "login"
              }
            });
          },1000);
        })
        .catch(res => {
          console.log(res);
        });
    },

    //注册(未实现)
    register() {
      register().then(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  & > .container {
    a {
      display: inline-block;
      height: 113px;
      img {
        height: 100%;
      }
    }
  }
  .wrapper {
    height: 576px;
    background: url("/imgs/login-bg.jpg") no-repeat center;
    background-size: 100% 576px;
    .container {
      position: relative;
      height: 100%;
      .login-form {
        box-sizing: border-box;
        width: 410px;
        height: 510px;
        background-color: #fff;
        padding: 0 31px;
        position: absolute;
        top: 29px;
        right: 0;
        .form-header {
          height: 23px;
          line-height: 23px;
          text-align: center;
          font-size: 24px;
          padding-top: 40px;
          padding-bottom: 49px;
          .num-login,
          .code-login {
            cursor: pointer;
          }
          .line {
            margin: 0 32px;
          }
          .checked {
            color: #ff6600;
          }
        }
        .input-wrap {
          margin: 0 15px;
          input {
            display: block;
            font-size: 14px;
            height: 45px;
            line-height: 45px;
            padding-left: 5px;
          }
        }
        .btn-wrap {
          margin: 15px 15px 10px;
          a {
            display: inline-block;
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            text-align: center;
            background-color: #ff6600;
            color: #fff;
          }
        }
        .form-footer {
          margin: 0 15px;
          display: flex;
          justify-content: space-between;
          a {
            color: #ff6600;
          }
          .right {
            a {
              color: #ccc;
            }
          }
        }
      }
      .code-wrap {
        text-align: center;
      }
      .code-footer {
        font-size: 14px;
        line-height: 20px;
        & > div {
          text-align: center;
          margin-top: 10px;
          margin-bottom: 5px;
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999999;
    font-size: 16px;
    text-align: center;
    .footer-link {
      a {
        color: #999999;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
}
</style>