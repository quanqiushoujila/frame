<template>
  <el-table-column
    :label="label"
    :min-width="minWidth ? minWidth : ''"
    :width="width ? width : ''"
    :prop="prop || ''">
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
    levelKey: {
      type: String,
      default: 'level'
    },
    childKey: {
      type: String,
      default: 'children'
    },
    expanded: {
      type: String,
      default: '_expanded'
    },
    show: {
      type: String,
      default: '_show'
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
      return !row[this.expanded] ? 'el-icon-caret-right' : 'el-icon-caret-bottom'
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
        let ids = []
        let data = this.data
        const children = row[this.childKey]
        const hasOpen = !row[this.expanded]
        ids.push({id: row.id, [this.expanded]: hasOpen})
        this.setTreeData(children, ids, hasOpen)
        for (let i = 0, len = data.length; i < len; i++) {
          for (let j = 0, len1 = ids.length; j < len1; j++) {
            if (data[i].id === ids[j].id) {
              for (let key in ids[j]) {
                if (data[i].hasOwnProperty(key)) {
                  data[i][key] = ids[j][key]
                }
              }
            }
          }
        }
      }
    },
    setTreeData (data, ids = [], status = false) {
      let obj = {}
      for (let i = 0, len = data.length; i < len; i++) {
        if (status) {
          obj = {id: data[i].id, [this.show]: status}
          ids.push(obj)
        } else {
          obj = {id: data[i].id, [this.show]: status, [this.expanded]: status}
          ids.push(obj)
          const children = data[i].children
          if (children && children.length > 0) {
            this.setTreeData(children, ids, status)
          }
        }
      }
    }
  }
}
</script>
