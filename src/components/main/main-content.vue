<template>
  <div class="main-content"></div>
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
  }
</style>
