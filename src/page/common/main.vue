<template>
  <div id="main-system"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中">
    <main-header></main-header>
    <main-nav></main-nav>
    <main-content :style="{ 'min-height': documentClientHeight + 'px' }" class="content-wrapper">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </main-content>
  </div>
</template>
<script>
import mainHeader from 'components/main/main-header'
import mainContent from 'components/main/main-content'
import mainNav from 'components/main/main-nav'
import { main } from 'js/api'

export default {
  name: 'main-system',
  components: { mainHeader, mainContent, mainNav },
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
    }
  },
  created () {
    this.fullscreenLoading = true
    this.init()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.parentNavId = to.params.navId
    })
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.getNavList()
      })
      this.resetDocumentClientHeight()
    },
    getNavList () {
      main({navId: this.parentNavId}).then((data) => {
        this.fullscreenLoading = false
        console.log(data)
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
  background: #f1f4f5;
}
</style>
