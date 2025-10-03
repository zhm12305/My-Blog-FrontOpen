import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/home"),
    children: [
      {
        path: "/",
        name: "index",
        component: () => import("../views/index"),
      },
      {
        path: "/sort",
        name: "sort",
        component: () => import("../views/sort"),
      },
      {
        path: "/tags",
        name: "tags",
        component: () => import("../views/tags"),
      },
      {
        path: "/map",
        name: "map",
        component: () => import("../views/map"),
      },
      {
        path: "/article",
        name: "article",
        component: () => import("../views/article"),
      },
      {
        path: "/weiYan",
        name: "weiYan",
        component: () => import("../views/weiYan"),
      },
      {
        path: "/love",
        name: "love",
        component: () => import("../views/love"),
      },
      {
        path: "/travel",
        name: "travel",
        component: () => import("../views/travel"),
      },
      {
        path: "/tools",
        name: "tools",
        component: () => import("../views/tools"),
      },
      {
        path: "/message",
        name: "message",
        component: () => import("../views/message"),
      },
      {
        path: "/friend",
        name: "friend",
        component: () => import("../views/friend"),
      },
      {
        path: "/funny",
        name: "funny",
        component: () => import("../views/funny"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../views/about"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("../views/user"),
      },
    ],
  },
  {
    path: "/backend",
    redirect: "/backendMain",
    meta: { requiresAuth: true },
    component: () => import("../views/admin/admin"),
    children: [
      {
        path: "/backendMain",
        name: "main",
        component: () => import("../views/admin/main"),
      },
      {
        path: "/webEdit",
        name: "webEdit",
        component: () => import("../views/admin/webEdit"),
      },
      {
        path: "/userList",
        name: "userList",
        component: () => import("../views/admin/userList"),
      },
      {
        path: "/postList",
        name: "postList",
        component: () => import("../views/admin/postList"),
      },
      {
        path: "/postEdit",
        name: "postEdit",
        component: () => import("../views/admin/postEdit"),
      },
      {
        path: "/sortList",
        name: "sortList",
        component: () => import("../views/admin/sortList"),
      },
      {
        path: "/commentList",
        name: "commentList",
        component: () => import("../views/admin/commentList"),
      },
      {
        path: "/treeHoleList",
        name: "treeHoleList",
        component: () => import("../views/admin/treeHoleList"),
      },
      {
        path: "/resourceList",
        name: "resourceList",
        component: () => import("../views/admin/resourceList"),
      },
      {
        path: "/loveList",
        name: "loveList",
        component: () => import("../views/admin/loveList"),
      },
      {
        path: "/resourcePathList",
        name: "resourcePathList",
        component: () => import("../views/admin/resourcePathList"),
      },
      {
        path: "/prohibitedWordsList",
        name: "prohibitedWordsList",
        component: () => import("../views/admin/prohibitedWordsList"),
      },
    ],
  },
  {
    path: "/verifyLogin",
    name: "verify",
    component: () => import("../views/admin/verify"),
  },
];

// 如果是访客剔除后台用户列表路由
if (
  store.state.currentAdmin.userType === 3 ||
  store.state.currentUser.userType === 3
) {
  routes[1].children = routes[1].children.filter(
    (item) => item.name != "userList"
  );
}

const router = new VueRouter({
  mode: "hash",
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();
  store.commit("SET_SHOWLOADING", true);
  
  // 后台页面跳转的判断
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (
      !Boolean(localStorage.getItem("adminToken")) ||
      !JSON.parse(localStorage.getItem("vuex"))?.currentAdmin.id
    ) {
      localStorage.removeItem("adminToken");
      next({
        path: "/verifyLogin",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  const title = to.fullPath;
  
  // 检查用户登录状态并显示访客提示
  setTimeout(() => {
    checkAndNotifyGuestStatus(to);
  }, 1000); // 延迟1秒，确保页面加载完成
  
  if (
    to.fullPath == "/about" ||
    to.fullPath == "/user" ||
    title.indexOf("/verifyLogin?redirect") != -1
  ) {
    setTimeout(() => {
      store.commit("SET_SHOWLOADING", false);
    }, 500);
    return;
  }
  
  // 判断是否显示烟雾效果（和加载动画同时开始）
  if (to.path === '/' && store.state.isFirstMainPageVisit && (from.name === null || from.path === '/')) {
    console.log('✅ 开始显示烟雾效果（和加载动画同时）');
    
    // 立即显示烟雾效果（和加载动画同时显示）
    store.commit("SET_SHOW_SMOKE_EFFECT", true);
    
    // 3秒后隐藏烟雾效果和加载动画
    setTimeout(() => {
      console.log('🌫️ 烟雾动画结束，隐藏所有效果');
      store.commit("SET_SHOW_SMOKE_EFFECT", false);
      store.commit("SET_SHOWLOADING", false);
      store.commit("SET_FIRST_MAIN_PAGE_VISIT", false);
    }, 2500);
  } else {
    // 不显示烟雾效果，2.5秒后关闭加载动画
    setTimeout(() => {
      store.commit("SET_SHOWLOADING", false);
      console.log('✅ 普通加载动画结束（无烟雾效果）');
    }, 2500);
  }
});

// 检查并提示访客状态的函数
function checkAndNotifyGuestStatus(to) {
  // 跳过特定页面不显示提示
  const skipPages = ['/user', '/verifyLogin'];
  if (skipPages.some(page => to.path.includes(page))) {
    return;
  }
  
  // 判断是前台还是后台页面
  const isBackendPage = to.matched.some((record) => record.meta.requiresAuth);
  
  if (isBackendPage) {
    // 后台页面：只检查管理员登录状态
    const adminToken = localStorage.getItem("adminToken");
    const currentAdmin = store.state.currentAdmin;
    const hasValidAdmin = adminToken && currentAdmin && Object.keys(currentAdmin).length > 0;
    
    if (hasValidAdmin) {
      console.log(`页面加载 ${to.path} - 欢迎回来，管理员 ${currentAdmin.username}！`);
    } else {
      console.log(`页面加载 ${to.path} - 后台未登录（即将跳转登录页）`);
    }
  } else {
    // 前台页面：只检查前台用户登录状态
    const userToken = localStorage.getItem("userToken");
    const currentUser = store.state.currentUser;
    const hasValidUser = userToken && currentUser && Object.keys(currentUser).length > 0;
    
    if (!hasValidUser) {
      // 通过 store 触发访客状态通知
      store.commit("TRIGGER_GUEST_NOTIFICATION", {
        title: "访客模式 👋",
        message: "您当前以访客身份浏览，登录后可享受更多功能！",
        type: "info",
        path: to.path
      });
      console.log(`页面加载 ${to.path} - 当前为访客状态`);
    } else {
      console.log(`页面加载 ${to.path} - 欢迎回来，${currentUser.username}！`);
    }
  }
}
export default router;
