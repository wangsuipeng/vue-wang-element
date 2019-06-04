const getters = {
    updateUserInfo: state => state.app.userName,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    Authorization: state => state.user.Authorization
}
export default getters;