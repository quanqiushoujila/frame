<template>
  <div class="main-header" :class="{'mini-show': sidebarFold}">
    <h1 class="logo-wrapper pull-left">
      <router-link to="/mainIndex" class="logo-brand-lg">
        <img src="~img/logo.png" alt="logo">
        <span>数据基因</span>
      </router-link>
      <router-link to="/mainIndex" class="logo-brand-mini">
        <img src="~img/logo.png" alt="logo">
      </router-link>
    </h1>
    <div class="header-body">
      <div class="menu-bar" @click="sidebarFold = !sidebarFold">
        <i class="iconfont" :class="menuIcon"></i>
      </div>
      <ul class="header-nav pull-right">
        <li class="item avatar pull-left">
          <el-dropdown>
            <span class="el-dropdown-link">
              <span class="avatar-img"><img src="~img/logo1.png" alt="avatar"></span>
              <span class="name">{{username}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="addMenu('menu')">修改密码</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="item pull-left count">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-badge :value="infoData.all" class="item-badge">
                <i class="iconfont icon-youjian3"></i>
              </el-badge>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="">
                  目录共<span class="red">{{infoData.count}}</span>条代办
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="item pull-left">
          <router-link to="">
            <i class="iconfont icon-shezhi1"></i>
          </router-link>
        </li>
        <li class="item pull-left" @click="logout">
          <i class="iconfont icon-icon1"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { logout } from 'js/api/common/index'
import {getCurrentMenu} from 'js/util/index'
export default {
  name: 'mainHeader',
  props: {
    username: {
      type: String,
      default: 'username'
    },
    infoData: {
      type: Object,
      default: () => {
        return {
          all: 0,
          count: 0
        }
      }
    }
  },
  computed: {
    sidebarFold: {
      get () { return this.$store.state.common.sidebarFold },
      set (val) { this.$store.commit('common/updateSidebarFold', val) }
    },
    menuIcon () {
      return this.sidebarFold ? 'icon-liebiaozhankai' : 'icon-liebiaoshouqi'
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
    }
  },
  methods: {
    addMenu (name) {
      getCurrentMenu(name)
      // const list = this.mainTabs.filter((item) => {
      //   return item.id === menu.id
      // })
      // if (list.length === 0) {
      //   this.mainTabs.push(menu)
      // }
      // this.mainTabsActiveName = name
      // this.menuActiveName = name
      // this.$router.push({name: menu.filename})
    },
    logout () {
      this.$confirm(`确定进行[退出]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logout().then((res) => {
          if (res.code === this.GLOBAL.SUCCESS) {
            this.$cookie.delete('token')
            this.$router.push({name: 'login'})
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~scss/varibles.scss";
  .main-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $headerHeight;
    background-color: #fff;
    z-index: 1000;
    border-bottom: 1px solid #d7d7d7;
    box-sizing: border-box;
    &.mini-show {
      .logo-wrapper {
        width: $navMiniWidth;
        .logo-brand-mini {
          display: block;
        }
        .logo-brand-lg {
          display: none;
        }
      }
      .header-body {
        margin-left: $navMiniWidth;
      }
    }
    .logo-wrapper {
      margin: 0;
      width: $navWidth;
      background-color: $blue1;
      color: #fff;
      font-size: 22px;
      height: 55px;
      text-align: center;
      line-height: 55px;
      img {
        width: 36px;
        height: 26px;
      }
      span {
        color: #fff;
        font-weight: 500;
      }
      .logo-brand-mini {
        display: none;
        width: $navMiniWidth;
      }
    }
    .header-body {
      position: relative;
      margin-left: $navWidth;
      height: $headerHeight;
      line-height: $headerHeight;
      position: relative;
      .menu-bar {
        cursor: pointer;
        position: absolute;
        top: 12px;
        left: 0;
        padding-left: 10px;
        line-height: 1;
        .iconfont {
          font-size: 30px;
        }
      }
      .header-nav {
        height: $headerHeight;
        .avatar {
          .el-dropdown {
            height: 42px;
          }
          .name {
            display: inline-block;
            margin-left: 10px;
          }
          .avatar-img {
            vertical-align: middle;
            height: 38px;
            width: 38px;
            border-radius: 50%;
            border: solid 1px #e4e4e4;
            display: inline-block;
            overflow: hidden;
            img {
              height: 38px;
              width: 38px;
            }
          }
        }
        li {
          &:first-child {
            border-right: 1px solid #d7d7d7;
          }
          height: $headerHeight;
          padding: 0px 10px;
          cursor: pointer;
          .iconfont {
            color: #333;
            font-size: 22px;
          }
        }
        .count {
          padding-right: 20px;
          line-height: 1;
          height: auto;
          margin-top: 19px;
          .item-badge {
            margin-top: 0px;
            margin-right: 0px;
          }
          .red {
            font-weight: 700;
          }
        }
      }
    }
  }
</style>
