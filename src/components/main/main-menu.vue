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
export default {
  name: 'mainNav',
  components: { SubMenu },
  props: {
    menuList: {
      type: Array
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
