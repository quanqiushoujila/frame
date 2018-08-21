<!-- 批量删除按钮 -->
<template>
  <el-button type="danger" @click="click" icon="el-icon-delete">批量删除</el-button>
</template>
<script>
export default {
  name: 'deleteQueryBtn',
  methods: {
    click () {
      this.$emit('deleteQueryHandle')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
