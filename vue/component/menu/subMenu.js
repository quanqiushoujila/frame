var subMenu = Vue.extend({
  template:
    '<el-submenu' +
    '  v-if="menu.children && menu.children.length >= 1"' +
    '  :index="menu.id">' +
    '  <template slot="title">' +
    '    <i class="iconfont" :class="menu.icon"></i>' +
    '    <span>{{ menu.name }}</span>' +
    '  </template>' +
    '  <sub-menu @current-menu="currentMenu"' +
    '    v-for="subMenu in menu.children"' +
    '    :key="subMenu.id"' +
    '    :menu="subMenu">' +
    '  </sub-menu>' +
    '</el-submenu>' +
    '<el-menu-item v-else :index="menu.id" @click="gotoRouteHandle(menu)">' +
    '  <i class="iconfont" :class="menu.icon"></i>' +
    '  <span>{{ menu.name }}</span>' +
    '</el-menu-item>',

  props: {
    menu: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 菜单切换
    gotoRouteHandle (menu) {
      var name = menu.name
      var path = menu.path
      var id = menu.id
      if (isArray(tabList)) {
        if (tabList.length > 0) {
          if (this.hasTab(id)) {
            this.$emit('current-menu', tabList, id, true)
          } else {
            tabList.push(menu)
            this.$emit('current-menu', tabList, id)
          }
        } else {
          this.$emit('current-menu', [menu], id)
        }
      }
    },
    hasTab (id) {
      var isTab = false
      for (var i = 0, len = tabList.length; i < len; i++) {
        if (tabList[i].id === id) {
          isTab = true
          break
        }
      }
      return isTab
    },
    currentMenu (tabList, id, status) {
      this.$emit('current-menu', tabList, id, status)
    }
  }
})

Vue.component('subMenu', subMenu)
