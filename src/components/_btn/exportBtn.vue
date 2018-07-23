<!-- 导出按钮 -->
<template>
  <el-button @click="click" type="info" icon="el-icon-news">导入</el-button>
</template>
<script>
export default {
  name: 'exportBtn',
  methods: {
    click () {
      this.$emit('exportClick')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
