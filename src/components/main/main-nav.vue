<template>
  <aside class="main-nav"></aside>
</template>
<script>
export default {
  name: 'mainNav'
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
    background-color: #ffff00;
    z-index: 100;
  }
</style>
