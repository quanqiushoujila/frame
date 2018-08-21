<template>
  <div class="table-and-pagination">
    <el-table
      ref="kTable"
      :data="table.data"
      v-loading="table.loading ? table.loading : false"
      @row-click="handleRowClick"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @cell-click="cellClickHandle"
      border
      :row-class-name="tableRowClassName"
      :stripe="table.stripe ? table.stripe : true"
      :size="table.size ? table.size : 'medium'"
      :show-header="table.showHeader ? table.showHeader : true"
      style="width: 100%">
      <el-table-column
        v-if="isSelect(table.hasSelect)"
        type="selection"
        width="55">
      </el-table-column>
      <template v-for="item in table.tr">
        <template v-if="isTreeTable(table.tree, item.prop)">
          <table-tree-column
            treeKey="id"
            :selectTreeData="selectTreeData"
            @resultData="resultData"
            :data="table.data"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :minWidth="item.minWidth ? item.minWidth : ''"
            :width="item.width ? item.width : ''"
          />
        </template>
        <template v-else>
          <el-table-column
            show-overflow-tooltip
            :prop="item.prop"
            :key="item.prop"
            :label="item.label"
            v-if="item.show !== false ? true : false"
            :min-width="item.minWidth ? item.minWidth : ''"
            :width="item.width ? item.width : ''"
          />
        </template>
      </template>
      <el-table-column
        v-if="isOperation(table.operation)"
        fixed="right"
        :label="table.operation.label"
        :width="table.operation.width ? table.operation.width : ''"
        :min-width="table.operation.minWidth ? table.operation.minWidth : ''">
        <template slot-scope="scope">
          <el-button
            v-for="item in table.operation.data"
            v-if="hasPermission(item.permission)"
            :key="item.label"
            size="small"
            :type="table.operation.type ? table.operation.type : 'text'"
            @click="handleOperation(scope.$index, scope.row, item.id)">
            {{item.label}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block" v-if="isPagination(table.pagination)">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="table.pagination.currentPage ? table.pagination.currentPage : 1"
        :page-sizes="table.pagination.pageSizes ? table.pagination.pageSizes : [10, 20, 30, 50]"
        :page-size="table.pagination.pageSize ? table.pagination.pageSize : 10"
        :layout="table.pagination.layout ? table.pagination.layout : 'total, sizes, prev, pager, next, jumper'"
        background
        :total="table.pagination.total ? table.pagination.total : 0">
      </el-pagination>
    </div>
  </div>
</template>
<script>
// import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import tableTreeColumn from './tableTree'

export default {
  name: 'kTable',
  components: {tableTreeColumn},
  props: {
    table: {
      type: Object,
      default () {
        return {
          // 是否为斑马纹
          stripe: true,
          // Table 的尺寸
          size: 'medium',
          // 是否显示表头
          showHeader: true,
          // table数据
          data: [],
          // 加载效果
          loading: false,
          // 选择框
          hasSelect: true,
          // 折叠prop
          // 树
          tree: {
            // 是否开启tabletree
            hasTree: false,
            treeKey: '',
            expand: false,
            checkStrictly: false
          },
          // table 名称
          tr: [{
            id: '1',
            label: 'label',
            prop: 'prop',
            className: 'classname',
            width: '100',
            minWidth: '80'
          }],
          // 操作
          operation: {
            hasOperation: true,
            // 按钮类型
            type: 'text',
            label: '操作',
            width: 200,
            minWidth: '',
            clickName: 'editHanle',
            // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
            data: [{
              label: '详情',
              id: 1,
              fn: 'detailHandle',
              permission: 'sys:user:info'
            }]
          },
          // 分页
          pagination: {
            hasPagination: true,
            total: 0,
            currentPage: 1,
            pageSize: 10,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageSizes: [10, 20, 30, 50]
          }
        }
      }
    }
  },
  data () {
    return {
      // 仅在treetable有效 被选中的select
      selectTreeData: []
    }
  },
  computed: {
    permissions () {
      return JSON.parse(sessionStorage.getItem('permissions'))
    }
  },
  methods: {
    // 是否有选择框
    isSelect (select) {
      return isBoolean(select) ? (select ? 1 : 0) : 0
    },
    // 是否是树形
    isTreeTable (tree, prop) {
      if (!tree) {
        return false
      } else {
        if (isBoolean(tree.hasTree) && !tree.hasTree) {
          return false
        }
        if (tree.treeKey) {
          if (tree.treeKey === prop) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      }
    },
    // 是否显示操作
    isOperation (operation) {
      if (!operation) {
        return false
      } else {
        if (isBoolean(operation.hasOperation) && !operation.hasOperation) {
          return false
        } else if (isBoolean(operation.hasOperation) && operation.hasOperation) {
          if (operation.data && operation.data.length > 0) {
            return true
          }
          return false
        } else {
          if (operation.data && operation.data.length > 0) {
            return true
          }
          return false
        }
      }
    },
    // 是否显示分页
    isPagination (pagination) {
      if (!pagination) {
        return false
      } else {
        if (isBoolean(pagination.hasPagination) && !pagination.hasPagination) {
          return false
        }
        if (pagination.total > 0) {
          return true
        } else {
          return false
        }
      }
    },
    // 按钮是否拥有权限
    hasPermission (val) {
      if (val && this.permissions && this.permissions.length) {
        return this.permissions.findIndex(item => item === val) > -1
      }
      return true
    },
    // 按钮事件
    handleOperation (index, row, id) {
      let data = this.table.operation.data
      for (let i = 0, len = data.length; i < len; i++) {
        if (id === data[i].id) {
          this.$emit(data[i].fn, index, row)
        }
      }
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange (val) {
      console.log('handleSelectionChange', val)
      let ids = []
      console.log()
      if (this.table.tree && this.table.tree.hasTree && this.table.hasSelect) {
        this.selectTreeData = val
        let ids = []
        let data = []
        for (let i = 0, len = val.length; i < len; i++) {
          if (data.length > 0) {
            for (let j = 0, len = data.length; j < len; j++) {

            }
          } else {
            data.push(val[i])
          }
        }
        ids = data.map((item) => {
          return item.id
        })
        this.$emit('selectionChangeHandle', ids, val)
      } else {
        ids = val.map((item) => {
          return item.id
        })
        this.$emit('selectionChangeHandle', ids, val)
      }
    },
    // 当全选时发生变化时会触发该事件
    handleSelectAll (val) {
      // console.log('handleSelectAll', val)
      this.$emit('selectAllHandle', val)
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    handleSelect (val) {
      // console.log('handleSelect', val)
      this.$emit('selectHandle', val)
    },
    // 当某个单元格被点击时会触发该事件
    cellClickHandle (row, column, cell, event) {
      this.$emit('cellClickHandle', row, column, cell, event)
    },
    // 当某一行被点击时会触发该事件
    handleRowClick (row, event, column) {
      this.$emit('rowClickHandle', row, event, column)
    },
    // 为 Table 中的某一行添加 classname
    tableRowClassName ({row, rowIndex}) {
      this.$emit('tableRowClassNameHandle', rowIndex, row)
    },
    // 每页条数改变时会触发
    handleSizeChange (val) {
      this.$emit('sizeChangeHandle', val)
    },
    // 当前页改变时会触发
    handleCurrentChange (val) {
      this.$emit('currentChangeHandle', val)
    },
    // 接收treetabledata改变后的数据
    resultData (data, selectData) {
      if (this.table.tree && this.table.tree.hasTree && this.table.hasSelect) {
        setTimeout(() => {
          this.selectdTreeTable(data, selectData)
        }, 10)
      }
      this.$emit('resultData', data)
    },
    // 选中tabletree
    selectdTreeTable (data, selectData) {
      for (let i = 0, len = data.length; i < len; i++) {
        for (let j = 0, len1 = selectData.length; j < len1; j++) {
          if (data[i].id === selectData[j].id) {
            this.$refs.kTable.toggleRowSelection(selectData[j])
            break
          }
        }
      }
    },
    // tree数据处理
    treeDataHandle (data) {

    }
  }
}
</script>

<style lang="scss" scoped>
.table-and-pagination {
  .block {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
