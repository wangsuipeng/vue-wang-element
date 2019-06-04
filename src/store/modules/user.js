const state = {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
}
const mutations = {
    // 修改token，并将token存入localStorage 
    CHANGE_LOGIN(state,user) {
        state.Authorization = user;
        localStorage.setItem('Authorization',user)
    }
}
const actions = {
    changeLogin({commit},user) {
        commit('CHANGE_LOGIN',user)
    }
}
export default {
    state,
    mutations,
    actions
}