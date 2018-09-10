<template>
  <div class="main-content" :class="{'mini-show': sidebarFold}">
    <div class="main-wrapper" :class="{'has-tab': $route.meta.isTab}">
      <el-tabs
        v-if="$route.meta.isTab"
        v-model="mainTabsActiveName"
        :closable="true"
        type="card"
        class="main-tab"
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
          :key="item.path"
          v-for="item in mainTabs"
          :label="item.name"
          :name="item.filename"
        >
          <el-card class="box-card">
            <iframe
              v-if="item.type === 'iframe'"
              :src="item.iframeUrl"
              width="100%" height="100%" frameborder="0" scrolling="yes">
            </iframe>
            <keep-alive v-else>
              <router-view v-if="item.filename === mainTabsActiveName"></router-view>
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
import {mainMenu} from '@/router/mainMenu'
import clonedeep from 'lodash/clonedeep'

const headerHeight = 55
const tabHeight = 40
const paddingHeight = 15

export default {
  name: 'mainContent',
  data () {
    return {
      maxLengthTabMenu: 5
    }
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
    },
    menuActiveName: {
      get () { return this.$store.state.common.menuActiveName },
      set (val) { this.$store.commit('common/updateMenuActiveName', val) }
    },
    sidebarFold: {
      get () { return this.$store.state.common.sidebarFold }
    }
  },
  watch: {
    mainTabs: {
      handler (newVal) {
        if (newVal.length > this.maxLengthTabMenu) {
          newVal.shift()
          this.mainTabs = newVal
        }
      },
      deep: true
    }
  },
  methods: {
    // tabs, 选中tab
    selectedTabHandle (tab) {
      tab = this.mainTabs.filter(item => item.filename === tab.name)
      if (tab.length >= 1) {
        this.$router.push({ name: tab[0].filename })
      }
    },
    // tabs, 删除tab
    removeTabHandle (tabName) {
      this.mainTabs = this.mainTabs.filter(item => item.filename !== tabName)
      if (this.mainTabs.length > 0) {
        this.mainTabsActiveName = this.mainTabs[this.mainTabs.length - 1].filename
        this.menuActiveName = this.mainTabs[this.mainTabs.length - 1].filename
        this.$router.push({name: this.mainTabs[this.mainTabs.length - 1].filename})
      } else {
        const navId = this.$route.meta.navId
        this.mainTabsActiveName = ''
        this.menuActiveName = ''
        this.$router.push({name: mainMenu[navId].name})
      }
    },
    // 关闭当前tab
    tabsCloseCurrentHandle () {
      this.removeTabHandle(this.mainTabsActiveName)
    },
    // 关闭其他tab
    tabsCloseOtherHandle () {
      this.mainTabs = this.mainTabs.filter(item => item.filename === this.mainTabsActiveName)
    },
    // 关闭所有tab
    tabsCloseAllHandle () {
      const navId = this.$route.meta.navId
      this.mainTabsActiveName = ''
      this.menuActiveName = ''
      this.mainTabs = []
      this.$router.push({name: mainMenu[navId].name})
    },
    // 刷新当前tab
    tabsRefreshCurrentHandle () {
      const tempTabName = this.mainTabsActiveName
      const refreshMenu = this.mainTabs.filter(item => item.filename === this.mainTabsActiveName)
      this.removeTabHandle(tempTabName)
      const menu = clonedeep(this.mainTabs)
      menu.push(refreshMenu[0])
      this.$nextTick(() => {
        this.mainTabsActiveName = tempTabName
        this.menuActiveName = tempTabName
        this.mainTabs = menu
        this.$router.push({ name: tempTabName })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~scss/varibles.scss";
  .main-content {
    &.mini-show {
      margin-left: $navMiniWidth;
    }
    position: relative;
    margin-left: $navWidth;
    padding-top: $headerHeight;
    background-color: $mainContentColor;
    .main-wrapper {
      position: relative;
      padding: 15px 15px 15px;
      height: 100px;
      &.has-tab {
        padding-top: 55px;
      }
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
