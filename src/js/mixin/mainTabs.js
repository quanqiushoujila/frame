export default {
  methods: {
    getActiveMenu (mainList, path) {
      for (let i = 0, len = mainList.length; i < len; i++) {
        this.childrenMenu(mainList[i], path)
      }
    },
    childrenMenu (list, path) {
      for (let i = 0, len = list.length; i < len; i++) {
        if (list[i].children && list[i].children.length) {
          this.childrenMenu(list[i].children, path)
        } else {
          if (list[i].path === path) {
            this.currentMainTabs = list[i]
            break
          }
        }
      }
    }
  }
}
