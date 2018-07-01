<template>
  <aside class="main-nav">
    <el-menu>
      <sub-menu
        v-for="menu in menuList"
        :key="menu.id"
        :menu="menu">
      </sub-menu>
    </el-menu>
  </aside>
</template>
<script>
import SubMenu from '../menu/subMenu'
export default {
  name: 'mainNav',
  components: { SubMenu },
  data () {
    return {
      menuList: []
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
    }
  },
  created () {
    this.init(this.$route)
    console.log('menu route', this.$route)
  },
  methods: {
    init (router) {
      this.getCurrentMenu()
      this.routeHandle(router)
    },
    routeHandle (router) {
      if (router.meta.isTab) {
        const path = router.path
        const mainList = JSON.parse(sessionStorage.getItem('menuList'))
        this.getActiveMenu(mainList, path)
        this.mainTabsActiveName = router.path
        this.mainTabs.push(this.currentMainTabs)
      }
    },
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
    },
    getCurrentMenu () {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList'))[+this.$route.meta.navId || +this.$route.params.navId]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~scss/varibles.scss";
  .main-nav {
    position: fixed;
    top: 55px;
    left: 0;
    bottom: 0;
    width: $navWidth;
    z-index: 100;
    background-color: $blue2;
    overflow-x: hidden;
  }
</style>
