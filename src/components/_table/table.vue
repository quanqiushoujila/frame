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
      :tableRowClassName="tableRowClassName"
      @cell-click="cellClickHandle"
      border
      :stripe="table.stripe ? table.stripe : true"
      :size="table.size ? table.size : 'medium'"
      :show-header="table.showHeader ? table.showHeader : true"
      style="width: 100%">
      <el-table-column
        v-if="table.hasSelect"
        type="selection"
        width="55">
      </el-table-column>
      <template v-for="item in table.tr">
        <template v-if="(table.hasTreeTable ? table.hasTreeTable : false) && (table.treeTableKey === item.prop)">
          <table-tree-column
            treeKey="id"
            :selectAllData="selectAllData"
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
        v-if="table.pagination && table.operation.hasOperation ? table.operation.hasOperation : false"
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
    <div class="block" v-if="table.pagination && table.pagination.total !== 0 && table.pagination.hasPagination">
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
import isArray from 'lodash/isArray'
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
          // 是否开启tabletree
          hasTreeTable: false,
          // 折叠prop
          treeTableKey: '',
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
      selectAllData: [],
      // 仅在treetable有效 选择当前及其子集的数据
      currentSelects: []
    }
  },
  computed: {
    permissions () {
      return JSON.parse(sessionStorage.getItem('permissions'))
    }
  },
  methods: {
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
      console.log('handleSelectionChange')
      if (this.table.hasTreeTable && this.table.hasSelect) {
        this.selectAllData = val
      }
      this.$emit('selectionChangeHandle', val)
    },
    // 当全选时发生变化时会触发该事件
    handleSelectAll (val) {
      if (this.table.hasTreeTable && this.table.hasSelect) {
        if (val.length > 0) {
        } else {
          setTimeout(() => {
          }, 20)
          console.log('all', this.selectAllData)
        }
      } else {
        this.$emit('selectAllHandle', val)
      }
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    handleSelect (val) {
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
    // 为 Table 中的某一行添加 class
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
      if (this.table.hasTreeTable && this.table.hasSelect) {
        setTimeout(() => {
          for (let i = 0, len = selectData.length; i < len; i++) {
            this.$refs.kTable.toggleRowSelection(selectData[i])
          }
        }, 10)
      }
      this.$emit('resultData', data)
    },
    // 选中tabletree
    selectdTreeTable (data) {
      for (let i = 0, len = data.length; i < len; i++) {
        this.$refs.kTable.toggleRowSelection(data)
      }
    },
    getSelects (row) {
      for (let i = 0, len = row.length; i < len; i++) {
        this.currentSelects.push(row[i])
        if (isArray(row[i].children) && row[i].children.length > 0) {
          this.getSelects(row[i].children)
        }
      }
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
