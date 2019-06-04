const state = {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
}
const mutations = {
    // 修改token，并将token存入localStorage 
    CHANGE_LOGIN(state,token) {
        state.Authorization = token;
        localStorage.setItem('Authorization',token)
    }
}
const actions = {
    changeLogin({commit},token) {
        commit('CHANGE_LOGIN',token)
    }
}
export default {
    state,
    mutations,
    actions
}