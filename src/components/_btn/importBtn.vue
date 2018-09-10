<!-- 导入按钮 -->
<template>
  <el-button @click="click" type="warning" icon="el-icon-upload2">导入</el-button>
</template>
<script>
export default {
  name: 'importBtn',
  methods: {
    click () {
      this.$emit('importHandle')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
