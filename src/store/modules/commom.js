export default {
  namespaced: true,
  state: {
    // 全屏遮罩
    fullscreenLoading: false,
    // 遮罩颜色
    loadingBackground: 'rgba(0, 0, 0, 0.5)',
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 父菜单id
    parentNavId: 0,
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 侧边栏, 菜单
    menuList: [],
    menuActiveName: '',
    // 主入口标签页
    mainTabs: [],
    mainTabsActiveName: ''
  },
  mutations: {
    updateFullscreenLoading (state, val) {
      state.fullscreenLoading = val
    },
    updateDocumentClientHeight (state, height) {
      state.documentClientHeight = height
    },
    updateParentNavId (state, val) {
      state.parentNavId = val
    },
    updateSidebarFold (state, fold) {
      state.sidebarFold = fold
    },
    updateMenuList (state, list) {
      state.menuList = list
    },
    updateMenuActiveName (state, name) {
      state.menuActiveName = name
    },
    updateMainTabs (state, tabs) {
      state.mainTabs = tabs
    },
    updateMainTabsActiveName (state, name) {
      state.mainTabsActiveName = name
    }
  }
}
