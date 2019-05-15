const getters = {   //实时监听state值的变化(最新状态)
  headerTitle: state => state.app.headerTitle,
  topTitle: state => state.app.topTitle,
};

export default getters;
