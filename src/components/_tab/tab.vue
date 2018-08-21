<template>
  <el-tabs type="border-card" class="tab">
    <el-tab-pane :label="item.label" v-for="item in data" :key="item.label">
      <el-row :gutter="10">
        <el-col
          :span="8"
          v-for="item1 in item.data"
          :key="item1.id"
          class="item ellipsis"
          >
          <span @click="click(item1)">{{`${item1[name]}${count(item1.count)}`}}</span>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'kTab',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    name: {
      type: String,
      default: 'name'
    }
  },
  methods: {
    count (val) {
      if (!val) {
        return ''
      }
      return `(${val})`
    },
    click (item) {
      this.$emit('openTable', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  .item {
    padding: 15px 0;
    span {
      cursor: pointer;
    }
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
