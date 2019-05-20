const state = {
    userName: 'wang'
}
const mutations = {
    updateUserInfo(state,userName) {
        return state.userName = userName
    }
}
const actions = {
    updateUserInfo({commit},userName) {
        commit('updateUserInfo',userName)
    }
}
export default{
    state,
    mutations,
    actions
}