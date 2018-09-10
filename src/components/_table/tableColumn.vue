<template>
  <el-table-column
    show-overflow-tooltip
    :prop="data.prop || ''"
    :key="data.prop"
    :label="data.label"
    v-if="data.show !== false ? true : false"
    :min-width="data.minWidth ? data.minWidth : ''"
    :width="data.width ? data.width : ''">
    <template slot-scope="scope">
      <template v-if="!data.click">{{scope.row[data.prop]}}</template>
      <template v-else>
        <span class="pointer underline" @click="tableCellHandle(data.prop, scope.row)">{{scope.row[data.prop]}}</span>
      </template>
    </template>
    <table-column
      @tableCellHandle="tableCellHandle"
      v-if="data.children && data.children.length > 0"
      v-for="(item, index) in data.children"
      :key="index"
      :data="item">
    </table-column>
  </el-table-column>
</template>
<script>
export default {
  name: 'tableColumn',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    tableCellHandle (prop, row) {
      this.$emit('tableCellHandle', prop, row)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
