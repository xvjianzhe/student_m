import { createStore } from 'vuex'

const store = createStore({
  state: {
    isLogin: false,
    token: undefined,
    dictType: undefined
  },
  getters: {
    isLogin(state) {
      return state.isLogin;
    },
    getToken(state) {
      return state.token;
    }
  },
  mutations: {
    setLogin(state, token) {
      state.isLogin = true;
      state.token = token;
    },
    setLogout(state) {
      state.isLogin = false;
      state.token = undefined;
    }
  },
  actions: {

  },
  modules: {
  }
});

export function getStore() {
  return store;
}
export default store;
