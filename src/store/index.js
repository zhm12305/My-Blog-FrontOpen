import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toolbar: {
      visible: false,
      enter: true,
    },
    sortInfo: [],
    currentUser: {},
    currentAdmin: {},
    webInfo: {
      webName: "",
      webTitle: [],
      notices: [],
      footer: "",
      backgroundImage: "",
      avatar: "",
      randomCover: [],
    },
    changeBg: "url(https://zhi-blog.inter-trade.top/yinlang.jpg)",
    isShowLoading: false,
    isShowSmokeEffect: false, // 是否显示烟雾消散效果（只在主页面首次访问）
    isFirstMainPageVisit: true, // 是否首次访问主页面（刷新会重置）
    top: 0,
    pageView: {},
    newArticles: [],
    articleTotal: 0,
    userList: [],
    // 访客状态通知
    guestNotification: null,
  },
  getters: {
    // 访客禁用按钮权限
    permissions: (state) => {
      return state.currentAdmin.userType === 3 ? [] : ["user:visit:read"];
    },
    articleTotal: (state) => {
      if (state.sortInfo !== null && state.sortInfo.length !== 0) {
        if (state.sortInfo.length === 1) {
          return state.sortInfo[0].countOfSort;
        } else {
          return state.sortInfo.reduce((prev, curr) => {
            if (typeof prev === "number") {
              return prev + curr.countOfSort;
            } else {
              return prev.countOfSort + curr.countOfSort;
            }
          });
        }
      } else {
        return 0;
      }
    },
    navigationBar: (state) => {
      if (state.sortInfo !== null && state.sortInfo.length !== 0) {
        return state.sortInfo.filter((f) => f.sortType === 0);
      } else {
        return [];
      }
    },
    labelInfo: (state) => {
      let labels = [];
      for (let index = 0; index < state.sortInfo.length; index++) {
        labels = labels.concat(state.sortInfo[index].labels);
      }
      return labels;
    },
  },
  mutations: {
    userList(state, userList) {
      state.userList = userList;
    },
    articleTotal(state, articleTotal) {
      state.articleTotal = articleTotal;
    },
    newArticles(state, newArticles) {
      state.newArticles = newArticles;
    },
    pageView(state, pageView) {
      state.pageView = pageView;
    },
    changeToolbarStatus(state, toolbarState) {
      state.toolbar = toolbarState;
    },
    loadSortInfo(state, sortInfo) {
      if (sortInfo !== null && sortInfo.length !== 0) {
        state.sortInfo = sortInfo.sort((s1, s2) => s1.priority - s2.priority);
      }
    },
    loadCurrentUser(state, user) {
      state.currentUser = user;
    },
    loadCurrentAdmin(state, user) {
      state.currentAdmin = user;
    },
    loadWebInfo(state, webInfo) {
      webInfo.webTitle = webInfo.webTitle.split("");
      webInfo.notices = JSON.parse(webInfo.notices);
      webInfo.randomCover = JSON.parse(webInfo.randomCover);
      state.webInfo = webInfo;
    },
    changeBgBox(state, changeBg) {
      state.changeBg = changeBg;
    },
    SET_SHOWLOADING(state, data) {
      state.isShowLoading = data;
    },
    SET_SHOW_SMOKE_EFFECT(state, data) {
      state.isShowSmokeEffect = data;
    },
    SET_FIRST_MAIN_PAGE_VISIT(state, data) {
      state.isFirstMainPageVisit = data;
    },
    topPercentage(state, top) {
      state.top = top;
    },
    // 触发访客状态通知
    TRIGGER_GUEST_NOTIFICATION(state, notificationData) {
      state.guestNotification = {
        ...notificationData,
        timestamp: Date.now()
      };
    },
    // 清除访客状态通知
    CLEAR_GUEST_NOTIFICATION(state) {
      state.guestNotification = null;
    },
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      // 排除不需要持久化的状态（刷新时需要重置的状态）
      reducer: (state) => {
        const stateCopy = { ...state };
        // 删除刷新时需要重置为初始值的状态
        delete stateCopy.isFirstMainPageVisit;
        delete stateCopy.isShowSmokeEffect;
        delete stateCopy.isShowLoading;
        return stateCopy;
      }
    }),
  ],
});
