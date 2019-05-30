const getters = {
    updateUserInfo: state => state.app.userName,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews
}
export default getters;