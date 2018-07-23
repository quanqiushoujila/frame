<template>
  <el-form
    :label-width="labelWidth"
    class="detail-form">
    <el-form-item :label="item.split(':')[0]" v-for="item in data" :key="item">
      <span class="ellipsis">
       {{item.split(':')[1] || '无'}}
      </span>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'logDetail',
  props: {
    labelWidth: {
      type: String,
      default: '100px'
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-form {
  span {
    display: block;
    border: 1px solid #dcdfe6;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
