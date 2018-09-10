<!-- 导出按钮 -->
<template>
  <el-button @click="click" type="info" icon="el-icon-news">导出</el-button>
</template>
<script>
export default {
  name: 'exportBtn',
  methods: {
    click () {
      this.$emit('exportHandle')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
