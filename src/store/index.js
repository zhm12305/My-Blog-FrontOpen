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
    isFirstVisit: true, // 是否首次访问
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
    SET_FIRST_VISIT(state, data) {
      state.isFirstVisit = data;
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
    }),
  ],
});
