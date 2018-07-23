<template>
  <div class="body-layout">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'bodyLayout'
}
</script>

<style lang="scss" scoped>
.body-layout {
  padding-bottom: 10px;
}
</style>
