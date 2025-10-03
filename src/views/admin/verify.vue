<template>
  <div class="content">
    <div class="left">
      <img
        src="https://zhi-blog.inter-trade.top/people.png"
        class="people p-animtion"
        alt="people"
      />
      <img
        src="https://zhi-blog.inter-trade.top/sphere.jpg"
        class="sphere s-animtion"
        alt="sphere"
      />
    </div>
    <div class="right">
      <div class="top">
        <div class="top-item">
          <span class="top-text" @click="$router.push({ path: '/' })"
            >首页</span
          >
        </div>
        <div class="top-item">
          <span class="top-text" @click="$router.push({ path: '/user' })"
            >前台用户登录</span
          >
        </div>
      </div>
      <div class="form-wrappepr">
        <h1 style="color: var(--black5)">私生活后台</h1>
        <input
          type="text"
          class="inputs user"
          v-model="account"
          placeholder="请输入账号"
        />
        <input
          type="password"
          class="inputs pwd"
          v-model="password"
          @keyup.enter.prevent="login()"
          placeholder="请输入密码"
        />
        <proButton
          :info="'提交'"
          @click.native.prevent="login()"
          :before="$constant.before_color_1"
          :after="$constant.after_color_1"
        >
        </proButton>
      </div>
    </div>
  </div>
</template>
<script>
const proButton = () => import("../common/proButton");
export default {
  components: {
    proButton,
  },
  data() {
    return {
      redirect: this.$route.query.redirect || '/backendMain',
      account: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("[后台登录] 开始登录流程");
      
      if (
        this.$common.isEmpty(this.account) ||
        this.$common.isEmpty(this.password)
      ) {
        console.log("[后台登录] 账号或密码为空");
        this.$notify({
          type: "error",
          title: "可恶🤬",
          message: "请输入账号或密码！",
          position: "top-left",
          offset: 50,
        });
        return;
      }
      
      console.log("[后台登录] 准备加密密码");
      let encryptedPassword;
      try {
        encryptedPassword = this.$common.encrypt(this.password.trim());
        console.log("[后台登录] 密码加密成功");
      } catch (error) {
        console.error("[后台登录] 密码加密失败:", error);
        this.$notify({
          type: "error",
          title: "可恶🤬",
          message: "密码加密失败，请刷新页面重试！",
          position: "top-left",
          offset: 50,
        });
        return;
      }
      
      let user = {
        account: this.account.trim(),
        password: encryptedPassword,
        isAdmin: true,
      };
      
      console.log("[后台登录] 发送登录请求:", {
        account: user.account,
        isAdmin: user.isAdmin,
        url: this.$constant.baseURL + "/user/login/"
      });
      
      this.$http
        .post(this.$constant.baseURL + "/user/login/", user, true, false)
        .then((res) => {
          console.log("[后台登录] 收到响应:", res);
          
          if (!this.$common.isEmpty(res.data)) {
            console.log("[后台登录] 登录成功，用户信息:", {
              username: res.data.username,
              userType: res.data.userType,
              id: res.data.id
            });
            
            // 清除可能存在的其他登录状态
            this.$store.commit("loadCurrentUser", {});
            localStorage.removeItem("userToken");
            // 设置新的后台管理状态
            localStorage.setItem("adminToken", res.data.accessToken);
            this.$store.commit("loadCurrentAdmin", res.data);
            
            console.log("[后台登录] 准备跳转到:", this.redirect);
            
            this.account = "";
            this.password = "";
            
            this.$notify({
              type: "success",
              title: "成功 🎉",
              message: `欢迎回来，${res.data.username}！`,
              position: "top-left",
              offset: 50,
            });
            
            setTimeout(() => {
              this.$router.push({ path: this.redirect });
            }, 500);
          } else {
            console.warn("[后台登录] 响应数据为空:", res);
            this.$notify({
              type: "error",
              title: "可恶🤬",
              message: "登录响应异常，请重试！",
              position: "top-left",
              offset: 50,
            });
          }
        })
        .catch((error) => {
          console.error("[后台登录] 登录失败:", error);
          console.error("[后台登录] 错误详情:", {
            message: error.message,
            response: error.response,
            stack: error.stack
          });
          
          let errorMessage = "账号异常，可能由于您不是管理员或者是账号密码错误，请重新输入！";
          
          // 尝试解析后端返回的具体错误信息
          if (error.message) {
            errorMessage = error.message;
          }
          
          this.$notify({
            type: "error",
            title: "可恶🤬",
            message: errorMessage,
            position: "top-left",
            offset: 50,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
  background-image: url('https://zhi-blog.inter-trade.top/yinlang.jpg');
  background-size: cover;
  background-attachment: local;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content > div {
  position: relative;
  z-index: 1;
}

.content > .left,
.content > .right {
  height: 90vh;
}

.content > .left {
  width: 50%;
  position: relative;
}

.content > .right {
  width: 50%;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 0 30px 30px 0;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.left {
  flex: 1;
  position: relative;
  .sphere {
    position: absolute;
    left: 30%;
    width: 90%;
    z-index: 1;
    animation: sphereAnimation 2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
  }
  .people {
    position: absolute;
    left: -50%;
    top: 20%;
    width: 70%;
    z-index: 2;
  }
  .p-animtion {
    animation: peopleAnimation 2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
  }
  .p-other-animtion {
    animation-name: pOtherAnimation;
    animation-direction: alternate;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: 3s;
  }
  .s-animtion {
    animation: sphereAnimation 2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
  }
  .s-other-animtion {
    animation-name: sOtherAnimation;
    animation-direction: alternate;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: 3s;
  }
}

.right {
  flex: 1;
  position: relative;
  z-index: 12;
  .top {
    width: 80%;
    margin-left: 38px;
    color: rgb(51, 52, 124);
    font-size: 20px;
    font-weight: 600;
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%, 0);
    .top-item {
      color: var(--blue2);
      float: left;
      width: 150px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-right: 10px;
      transition: 0.5s;
      border-radius: 50px;
      border: 2px solid var(--red);
      cursor: pointer;
      &:hover {
        border: 0;
        background-color: #fff;
        border-radius: 50px;
        box-shadow: -20px 10px 32px 1px rgba(182, 183, 185, 0.57);
      }
    }
  }
  .form-wrappepr {
    width: 60%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: right;
    h1 {
      float: left;
      margin: 30px 0;
    }
    .inputs {
      display: block;
      width: 100%;
      height: 70px;
      margin: 30px 0;
      border-radius: 10px;
      border: 0;
      background-color: rgb(210, 223, 237);
      color: rgb(80, 82, 84);
      outline: none;
      padding: 20px;
      box-sizing: border-box;
      font-size: 20px;
    }
    .tips {
      display: block;
      margin-top: -15px;
      color: rgb(160, 170, 182);
    }
    button {
      width: 100%;
      height: 50px;
      background-color: rgb(68, 96, 241);
      border-radius: 10px;
      font-size: 15px;
      color: #fff;
      border: 0;
      font-weight: 600;
      margin: 30px 0;
      box-shadow: -20px 28px 42px 0 rgba(62, 145, 255, 0.37);
    }
  }
}

@keyframes sphereAnimation {
  0% {
    width: 10%;
  }
  100% {
    width: 90%;
    transform: translate(-30%, 5%);
  }
}
@keyframes peopleAnimation {
  0% {
    width: 40%;
  }
  100% {
    width: 70%;
    transform: translate(90%, -10%);
  }
}
@keyframes pOtherAnimation {
  0% {
    transform: translate(90%, -10%);
  }
  100% {
    transform: translate(90%, -15%);
  }
}
@keyframes sOtherAnimation {
  0% {
    transform: translate(-30%, 5%);
  }
  100% {
    transform: translate(-30%, 10%);
  }
}
</style>
