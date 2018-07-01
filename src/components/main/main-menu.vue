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
import mainTabsMixin from 'js/mixin/mainTabs'

export default {
  name: 'mainNav',
  components: { SubMenu },
  mixins: [mainTabsMixin],
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
    },
    menuActiveName: {
      get () { return this.$store.state.common.menuActiveName },
      set (val) { this.$store.commit('common/updateMenuActiveName', val) }
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
        this.mainTabsActiveName = router.name
        const same = this.mainTabs.filter((item) => {
          return item.id === this.currentMainTabs.id
        })
        if (same.length === 0) {
          this.mainTabs.push(this.currentMainTabs)
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
