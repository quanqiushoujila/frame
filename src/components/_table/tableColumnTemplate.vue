<template>
  <el-table-column
    align="center"
    show-overflow-tooltip
    :prop="data.prop"
    :label="data.label"
    :min-width="data.minWidth ? data.minWidth : ''"
    :width="data.width ? data.width : ''">
    <template slot-scope="scope">
      <slot :name="data.prop" :data="scope"></slot>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: 'tableColumnTemplate',
  props: {
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
</style>
