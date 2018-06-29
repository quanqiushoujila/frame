<template>
  <div class="main-content">
    <div class="main-wrapper">
      <div style="height: 200px;width: 100%;background-color: #fff;"></div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mainContent'
}
</script>

<style lang="scss" scoped>
  @import "~scss/varibles.scss";
  .main-content {
    position: relative;
    margin-left: $navWidth;
    padding-top: $headerHeight;
    .main-wrapper {
      position: relative;
      padding: 15px;
      background-color: #f1f4f5;
      height: 100px;
    }
  }
</style>
