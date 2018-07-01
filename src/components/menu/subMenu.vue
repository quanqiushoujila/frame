<template>
  <el-submenu
    v-if="menu.children && menu.children.length >= 1"
    :index="menu.id + ''">
    <template slot="title">
      <i class="iconfont" :class="menu.icon"></i>
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu
      v-for="subMenu in menu.children"
      :key="subMenu.id"
      :menu="subMenu">
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.id + ''" @click="gotoRouteHandle(menu)">
    <i class="iconfont" :class="menu.icon"></i>
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
import SubMenu from './subMenu'

export default {
  name: 'sub-menu',
  props: {
    menu: {
      type: Object
    }
  },
  computed: {
    mainTabs: {
      get () { return this.$store.state.common.mainTabs },
      set (val) { this.$store.commit('common/updateMainTabs', val) }
    },
    mainTabsActiveName: {
      get () { return this.$store.state.common.mainTabsActiveName },
      set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
    },
    menuActiveName: {
      get () { return this.$store.state.common.menuActiveName },
      set (val) { this.$store.commit('common/updateMenuActiveName', val) }
    }
  },
  components: { SubMenu },
  methods: {
    // 菜单切换
    gotoRouteHandle (menu) {
      console.log(menu, this.mainTabs, this.mainTabsActiveName)
      const name = menu.filename
      const list = this.mainTabs.filter((item) => {
        return item.id === menu.id
      })
      if (list.length === 0) {
        this.mainTabs.push(menu)
      }
      this.mainTabsActiveName = name
      this.$router.push({name: menu.filename})
    }
  }
}
</script>
