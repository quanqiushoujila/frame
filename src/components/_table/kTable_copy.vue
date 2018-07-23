<template>
  <div class="table-and-pagination">
    <el-table
      :data="table.data"
      v-loading="table.loading ? table.loading : false"
      @selection-change="handleSelectionChange"
      :tableRowClassName="tableRowClassName"
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
      <el-table-column
        v-for="item in table.tr"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        v-if="item.show !== false ? true : false"
        :min-width="item.minWidth ? item.minWidth : ''"
        :width="item.width ? item.width : ''">
      </el-table-column>
      <el-table-column
        v-if="table.operation && table.operation.hasOperation ? table.operation.hasOperation : false"
        fixed="right"
        :label="table.operation.label"
        :width="table.operation.width ? table.operation.width : ''"
        :min-width="table.operation.minWidth ? table.operation.minWidth : ''">
        <template slot-scope="scope">
          <el-button
            v-for="item in table.operation.data"
            v-if="hasPermission(item.permission)"
            :key="item.label"
            size="mini"
            :type="item.type ? item.type : ''"
            @click="handleOperation(scope.$index, scope.row, item.id)">{{item.label}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-if="table.pagination.total !== 0 && table.pagination.hasPagination">
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
export default {
  name: 'kTable',
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
            label: '操作',
            width: 200,
            minWidth: '',
            clickName: 'editHanle',
            // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
            data: [{
              type: '',
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
    handleOperation (index, row, id) {
      let data = this.table.operation.data
      for (let i = 0, len = data.length; i < len; i++) {
        if (id === data[i].id) {
          this.$emit(data[i].fn, index, row)
        }
      }
    },
    handleSelectionChange (val) {
      this.$emit('selectionChangeHandle', val)
    },
    tableRowClassName ({row, rowIndex}) {
      this.$emit('tableRowClassNameHandle', rowIndex, row)
    },
    handleSizeChange (val) {
      this.$emit('sizeChangeHandle', val)
    },
    handleCurrentChange (val) {
      this.$emit('currentChangeHandle', val)
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
