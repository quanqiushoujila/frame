<!-- 搜索按钮 -->
<template>
  <div class="search-btn">
    <el-button @click="click" icon="el-icon-search" v-dbClick>搜索</el-button>
    <el-button
      v-if="isMore"
      class="is-more"
      @click="more"
      icon="el-icon-caret-bottom">
    </el-button>
  </div>
</template>
<script>
export default {
  name: 'searchBtn',
  props: {
    isMore: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click () {
      this.$emit('searchHandle')
    },
    more () {
      this.$emit('more')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-btn {
  display: inline-block;
  .is-more {
    width: 15px;
    height: 40px;
    vertical-align: top;
    padding: 12px 5px;
    margin-left: -5px;
  }
}
</style>
