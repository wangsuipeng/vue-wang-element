//要设置的全局访问的state对象
const state = {
  headerTitle: '1111',
  topTitle: '',
};

const mutations = {
  headerTitle(state, title) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.headerTitle = title;
  },
  topTitle(state, title) {
    state.topTitle = title;
  },
};

const actions = {
  setHeaderTitle({commit}, title) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    commit('headerTitle', title);
  },
  topTitle({commit}, title) {
    commit('topTitle', title)
  },
};

export default {
  state,
  mutations,
  actions
}
