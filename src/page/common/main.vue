<template>
  <div id="main-system"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中">
    <main-header
      :infoData="infoData"
      :username="username">
    </main-header>
    <main-menu></main-menu>
    <main-content :style="{ 'min-height': documentClientHeight + 'px' }" class="content-wrapper">
    </main-content>
  </div>
</template>
<script>
import mainHeader from 'components/main/main-header'
import mainContent from 'components/main/main-content'
import mainMenu from 'components/main/main-menu'
import { user, info } from 'js/api/common/index'

export default {
  name: 'main-system',
  components: { mainHeader, mainContent, mainMenu },
  data () {
    return {
      username: '', // 当前用户
      // 未审核数据
      infoData: {
        all: 0,
        count: 0
      }
    }
  },
  computed: {
    fullscreenLoading: {
      get () { return this.$store.state.common.fullscreenLoading },
      set (val) { this.$store.commit('common/updateFullscreenLoading', val) }
    },
    documentClientHeight: {
      get () { return this.$store.state.common.documentClientHeight },
      set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
    },
    parentNavId: {
      get () { return this.$store.state.common.parentNavId },
      set (val) { this.$store.commit('common/updateParentNavId', val) }
    },
    mainTabs: {
      get () { return this.$store.state.common.mainTabs },
      set (val) { this.$store.commit('common/updateMainTabs', val) }
    },
    menuList: {
      get () { return this.$store.state.common.menuList },
      set (val) { this.$store.commit('common/updateMenuList', val) }
    },
    sidebarFold: {
      get () { return this.$store.state.common.sidebarFold },
      set (val) { this.$store.commit('common/updateSidebarFold', val) }
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.meta.isMain) {
      const navId = to.params.navId || to.meta.navId
      this.menuList = JSON.parse(sessionStorage.getItem('menuList'))[navId]
      this.sidebarFold = false
    }
    next()
  },
  created () {
    // this.fullscreenLoading = true
    this.init()
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     vm.parentNavId = to.params.navId
  //   })
  // },
  methods: {
    init () {
      this.getUser()
      this.getInfo()
      this.resetDocumentClientHeight()
    },
    // 获取当前用户信息
    getUser () {
      user().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.username = res.data.username
        }
      })
    },
    // 当前代办事项
    getInfo () {
      info().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.infoData.all = res.count
          this.infoData.count = res.count
        }
      })
    },
    // 重置窗口可视高度
    resetDocumentClientHeight () {
      this.documentClientHeight = document.documentElement['clientHeight'] - 55
      window.onresize = () => {
        this.documentClientHeight = document.documentElement['clientHeight'] - 55
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
}
</style>
