import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import http from "./utils/request";
import common from "./utils/common";
import constant from "./utils/constant";
import mavonEditor from "mavon-editor";
NProgress.configure({ showSpinner: false });
NProgress.configure({ minimum: 0 });
NProgress.configure({ ease: "linear", speed: 100 });
import "./utils/title";
//引入css
import "./assets/css/index.css";
import "./assets/css/tocbot.css";
import "./assets/css/color.css";
import "./assets/css/markdown-highlight.css";
import "mavon-editor/dist/css/index.css";
import "./assets/css/icon.css";
//图标引入
import "./assets/css/font-awesome.min.css";
//图片跳动
import "./assets/css/animation.css";
//树洞
import { vueBaberrage } from "vue-baberrage";
//樱花
import "./utils/sakura.js";
//权限
import directive from "./directive"; // directive
Vue.use(directive);
Vue.use(ElementUI);
Vue.use(vueBaberrage);
Vue.use(mavonEditor);
Vue.prototype.$http = http;
Vue.prototype.$common = common;
Vue.prototype.$constant = constant;
Vue.config.productionTip = false;
// 修改 el-dialog 默认点击遮照不关闭
ElementUI.Dialog.props.closeOnClickModal.default = false;

// 在Vue实例创建前，清理无效的登录状态
(function cleanupInvalidLoginState() {
  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");
  const vuexData = localStorage.getItem("vuex");
  
  if (vuexData) {
    try {
      const data = JSON.parse(vuexData);
      let needUpdate = false;
      
      // 如果没有token但有用户信息，清除用户信息
      if (!userToken && data.currentUser && Object.keys(data.currentUser).length > 0) {
        console.log('🔧 清理残留的用户信息（无token）');
        data.currentUser = {};
        needUpdate = true;
      }
      
      if (!adminToken && data.currentAdmin && Object.keys(data.currentAdmin).length > 0) {
        console.log('🔧 清理残留的管理员信息（无token）');
        data.currentAdmin = {};
        needUpdate = true;
      }
      
      // 如果需要更新，写回localStorage
      if (needUpdate) {
        localStorage.setItem("vuex", JSON.stringify(data));
      }
    } catch (e) {
      console.error('清理登录状态时出错:', e);
    }
  }
})();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
