<template>
  <el-table-column
    :label="label"
    :min-width="minWidth ? minWidth : ''"
    :width="width ? width : ''"
    :prop="prop">
    <template slot-scope="scope">
      <span
        @click.prevent="toggleHandle(scope.$index, scope.row)"
        :style="childStyles(scope.row)">
        <i
          :class="iconClasses(scope.row)"
          :style="iconStyles(scope.row)"></i>
        {{ scope.row[prop] }}
      </span>
    </template>
  </el-table-column>
</template>
<script>
import isArray from 'lodash/isArray'

export default {
  name: 'tableTreeColumn',
  props: {
    minWidth: {
      type: [String, Number],
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    prop: String,
    label: String,
    data: {
      type: Array,
      default () {
        return []
      }
    },
    selectAllData: {
      type: Array,
      default () {
        return []
      }
    },
    levelKey: {
      type: String,
      default: 'level'
    },
    childKey: {
      type: String,
      default: 'children'
    },
    treeKey: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {
      ids: []
    }
  },
  methods: {
    childStyles (row) {
      return { 'padding-left': (row[this.levelKey] > 1 ? row[this.levelKey] * 7 : 0) + 'px' }
    },
    iconClasses (row) {
      return !row._expanded ? 'el-icon-caret-right' : 'el-icon-caret-bottom'
    },
    iconStyles (row) {
      return { 'visibility': this.hasChild(row) ? 'visible' : 'hidden' }
    },
    hasChild (row) {
      return (isArray(row[this.childKey]) && row[this.childKey].length >= 1) || false
    },
    // 切换处理
    toggleHandle (index, row) {
      if (this.hasChild(row)) {
        let data = this.data.slice(0)
        let selectData = this.selectAllData.slice(0)
        data[index]._expanded = !(data[index]._expanded ? data[index]._expanded : false)
        if (data[index]._expanded) {
          data = data.splice(0, index + 1).concat(row[this.childKey]).concat(data)
        } else {
          data = this.removeChildNode(data, row)
        }
        this.$emit('resultData', data, selectData)
      }
      this.ids = []
    },
    // 移除子节点
    removeChildNode (data, row) {
      this.getIds(row[this.childKey])
      return data.filter((item) => {
        return this.ids.findIndex((val) => {
          return val === item[this.treeKey]
        }) === -1
      })
    },
    getIds (row) {
      for (let i = 0, len = row.length; i < len; i++) {
        this.ids.push(row[i][this.treeKey])
        delete row[i]._expanded
        const childrenData = row[i][this.childKey]
        if (isArray(childrenData) && childrenData.length > 0) {
          this.getIds(childrenData)
        }
      }
    }
  }
}
</script>
