<template>
  <div class="main-content">
    <div class="main-wrapper">
      <el-tabs
        v-if="$route.meta.isTab"
        v-model="mainTabsActiveName"
        :closable="true"
        @tab-click="selectedTabHandle"
        @tab-remove="removeTabHandle">
        <el-dropdown class="site-tabs__tools" :show-timeout="0" :body-style="siteContentViewHeight">
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签页</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签页</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签页</el-dropdown-item>
            <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签页</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tab-pane
          :key="item.name"
          v-for="item in mainTabs"
          :label="item.title"
          :name="item.name"
        >
          <el-card class="box-card">
            <iframe
              v-if="item.type === 'iframe'"
              :src="item.iframeUrl"
              width="100%" height="100%" frameborder="0" scrolling="yes">
            </iframe>
            <keep-alive v-else>
              <router-view></router-view>
            </keep-alive>
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <el-card class="box-card" v-else :body-style="siteContentViewHeight">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-card>
    </div>
  </div>
</template>
<script>
const headerHeight = 55
const tabHeight = 40
const paddingHeight = 30

export default {
  name: 'mainContent',
  data () {
    return {}
  },
  computed: {
    documentClientHeight: {
      get () { return this.$store.state.common.documentClientHeight }
    },
    siteContentViewHeight () {
      let height = this.documentClientHeight - headerHeight - paddingHeight - 2
      if (this.$route.meta.isTab) {
        height -= tabHeight
      }
      return { minHeight: height + 'px' }
    },
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
    console.log('mainIndex route', this.$route)
  },
  methods: {
    // tabs, 选中tab
    selectedTabHandle () {},
    // tabs, 删除tab
    removeTabHandle () {},
    tabsCloseCurrentHandle () {},
    tabsCloseOtherHandle () {},
    tabsCloseAllHandle () {},
    tabsRefreshCurrentHandle () {}
  }
}
</script>

<style lang="scss" scoped>
  @import "~scss/varibles.scss";
  .main-content {
    position: relative;
    margin-left: $navWidth;
    padding-top: $headerHeight;
    background-color: $mainContentColor;
    .main-wrapper {
      position: relative;
      padding: 15px 15px 15px;
      height: 100px;
      .site-tabs__tools{
        position: fixed;
        top: $headerHeight;
        right: 0;
        z-index: 931;
        height: 40px;
        padding: 0 12px;
        font-size: 16px;
        line-height: 40px;
        background-color: $grey;
        cursor: pointer;
      }
    }
  }
</style>
