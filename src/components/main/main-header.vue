<template>
  <div class="main-header">
    <h1 class="logo-wrapper pull-left">
      <router-link to="/mainIndex">
        <img src="~img/logo.png" alt="logo">
        <span>数据基因</span>
      </router-link>
    </h1>
    <div class="header-body pull-left">
      <div class="menu-bar">
        <i class="iconfont icon-liebiaoshouqi"></i>
      </div>
      <ul class="header-nav pull-right">
        <li class="item avatar pull-left">
          11
        </li>
        <li class="item pull-left count">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-badge :value="12" class="item">
                <i class="iconfont icon-youjian3"></i>
              </el-badge>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="item pull-left">
          <router-link to="">
            <i class="iconfont icon-shezhi1"></i>
          </router-link>
        </li>
        <li class="item pull-left">
          <i class="iconfont icon-icon1"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mainHeader'
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
    z-index: 100;
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
    }
    .header-body {
      width: calc(100% - 200px);
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
        li {
          height: $headerHeight;
          padding: 0px 10px;
          .iconfont {
            color: #333;
            font-size: 22px;
          }
        }
        .count {
          padding-right: 20px;
          .item {
            margin-top: 0px;
            margin-right: 0px;
          }
        }
      }
    }
  }
</style>
