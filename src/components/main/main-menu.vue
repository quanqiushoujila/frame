<template>
  <aside class="main-nav">
    <el-menu v-if="!sidebarFold">
      <sub-menu
        v-for="menu in menuList"
        :key="menu.id"
        :menu="menu">
      </sub-menu>
    </el-menu>
    <nav class="mini-nav-wrapper" v-else>
      <router-link v-for="item in mainIndexList" :to="`/${item.filename}`" :key="item.id" class="mini-nav-item">
        <i class="iconfont" :class="item.remarks"></i>
      </router-link>
    </nav>
  </aside>
</template>
<script>
import SubMenu from '../_menu/subMenu'
import mainMenu from 'js/mixin/mainMenu'
export default {
  name: 'mainNav',
  components: { SubMenu },
  mixins: [mainMenu],
  data () {
    return {
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
    },
    sidebarFold: {
      get () { return this.$store.state.common.sidebarFold },
      set (val) { this.$store.commit('common/updateSidebarFold', val) }
    },
    mainIndexList () {
      return JSON.parse(sessionStorage.getItem('menuIndexList'))
    },
    menuList: {
      get () { return this.$store.state.common.menuList },
      set (val) { this.$store.commit('common/updateMenuList', val) }
    }
  },
  created () {
    this.sidebarFold = false
    this.init(this.$route)
  },
  methods: {
    init (router) {
      this.getCurrentMenu()
      this.routeHandle(router)
    },
    routeHandle (router) {
      if (router.meta.isTab) {
        const path = router.path
        const mainList = this.menuList
        this.childrenMenu(mainList, path)
        this.mainTabsActiveName = router.name
        this.menuActiveName = router.name
        const same = this.mainTabs.filter((item) => {
          return item.id === this.currentMainTabs.id
        })
        if (same.length === 0) {
          this.mainTabs.push(this.currentMainTabs)
        }
      }
    },
    getCurrentMenu () {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList'))[this.$route.meta.navId || this.$route.params.navId]
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
    .mini-nav-wrapper {
      width: $navMiniWidth;
      .mini-nav-item {
        display: block;
        height: $navMiniWidth;
        color: #c9d1db;
        line-height: $navMiniWidth;
        text-align: center;
        &:hover {
          background-color: $blue3;
        }
        .iconfont {
          font-size: 20px;
        }
      }
    }
  }
</style>
