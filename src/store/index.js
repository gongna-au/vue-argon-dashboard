import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    userId: 0, // 添加这行
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default"
  },
  mutations: {
    resetState(state) {
      // 重置到初始状态
      state.userId = 0;
      // 重置其他需要在登出时清除的状态...
    },
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    setUserId(state, userId) { // 已有的mutation
      state.userId = userId;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");

      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    }
  },
  actions: {
    logout({ commit }) {
      commit('resetState'); // 调用重置状态的 mutation
      // 这里可以添加其他登出逻辑，如清除 auth token
    },
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    // 其他actions
    updateUserId({ commit }, userId) { // 添加updateUserId
      commit('setUserId', userId);
    },
  },
  plugins: [
    createPersistedState({
      paths: ['userId'] // 仅持久化userId状态
    }),
  ],
  getters: {}
});
