<template>
  <div class="main-index main-container"
    v-loading.fullscreen.lock="fullscreenLoading"
    :element-loading-background="loadingBackground">
    <div class="main-wrapper">
      <h1 class="main-logo login-logo">
        <img src="~img/logo-login.png" alt="logo">
      </h1>
      <div class="main-slogan">
        <h2>
          <span>为数据管理赋权</span><span>数据应用赋能</span><span>数据资产赋值</span>
        </h2>
        <p>规范编辑  智能管理  关联应用  共享开放</p>
      </div>
      <div class="main-index-content">
        <ul class="clearfix">
          <li v-for="(item, index) in menuIndexList" :key="item.id" class="pull-left">
            <router-link :to="{name: 'main', params: {navId: index}}" @click.native="setParentNavId(item.id)">
              <span><i class="iconfont" :class="item.remarks"></i>{{item.name}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mainAll } from 'js/api/common/nav'
export default {
  name: 'main-index',
  data () {
    return {
      menuIndexList: []
    }
  },
  computed: {
    fullscreenLoading: {
      get () { return this.$store.state.common.fullscreenLoading },
      set (val) { this.$store.commit('common/updateFullscreenLoading', val) }
    },
    loadingBackground () {
      return this.$store.state.common.loadingBackground
    },
    parentNavId: {
      get () { return this.$store.state.common.parentNavId },
      set (val) { this.$store.commit('common/updateParentNavId', val) }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.fullscreenLoading = true
      this.getSessionOrApi()
    },
    getSessionOrApi () {
      const list = sessionStorage.getItem('menuIndexList')
      if (list && list.length) {
        this.menuIndexList = JSON.parse(list)
        if (this.menuIndexList && this.menuIndexList.length > 0) {
          this.fullscreenLoading = false
        } else {
          this.getMainAll()
        }
      } else {
        this.getMainAll()
      }
    },
    getMainAll () {
      mainAll().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          const data = res.data
          const menuIndexList = data.mainIndex
          const permissions = data.permissions
          const menuList = data.main
          sessionStorage.setItem('menuIndexList', JSON.stringify(menuIndexList) || '[]')
          sessionStorage.setItem('permissions', JSON.stringify(permissions) || '{}')
          sessionStorage.setItem('menuList', JSON.stringify(menuList) || '[]')
          this.menuIndexList = menuIndexList
        }
        this.fullscreenLoading = false
      })
    },
    setParentNavId (val) {
      this.parentNavId = val
    }
  }
}
</script>

<style lang="scss" scoped>
.main-index {
  background: url('../../assets/img/bg-index.jpg') top no-repeat;
  .main-wrapper {
    width: auto;
    height: auto;
  }
  .main-slogan {
    padding-top: 120px;
  }
  .main-index-content {
    width: 1050px;
    margin: 40px auto 10px;
    ul {
      li:first-child {
        padding-left: 0;
      }
      li {
        padding-left: 20px;
        margin-bottom: 20px;
        a {
          color: #fff;
          font-size: 16px;
          display: block;
          height: 100%;
          padding: 2px 10px 7px;
          border: 1px solid rgba(0, 0, 0, 0);
          text-align: center;
          &:hover {
            border: 1px solid #43dcea;
            border-radius: 5px;
            color: #43dcea;
          }
          i {
            font-size: 35px;
            display: block;
          }
        }
      }
    }
  }
}
</style>
