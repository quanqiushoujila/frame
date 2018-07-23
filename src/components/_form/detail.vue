<template>
  <el-form
    :label-width="labelWidth"
    class="detail-form">
    <el-form-item :label="item.label" v-for="item in props" :key="item.prop">
      <span class="ellipsis">
        {{data[data[item.prop + 'ForShow'] != null ? item.prop + 'ForShow' : item.prop]}}
      </span>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'kDetail',
  props: {
    labelWidth: {
      type: String,
      default: '100px'
    },
    props: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Object,
      default () {
        return {}
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
