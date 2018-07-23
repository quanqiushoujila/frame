<!-- 添加按钮 -->
<template>
  <el-button type="primary" @click="click" icon="el-icon-plus">新增</el-button>
</template>
<script>
export default {
  name: 'addBtn',
  methods: {
    click () {
      this.$emit('addClick')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
