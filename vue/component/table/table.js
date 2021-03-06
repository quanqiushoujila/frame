var kTable = Vue.extend({
  template:
   ' <div class="table-and-pagination">' +
   '   <el-table' +
   '     ref="kTable"' +
   '     :data="table.data"' +
   '     v-loading="table.loading ? table.loading : false"' +
   '     @row-click="handleRowClick"' +
   '     @select="handleSelect"' +
   '     @select-all="handleSelectAll"' +
   '     @selection-change="handleSelectionChange"' +
   '     @cell-click="cellClickHandle"' +
   '     border' +
   '     :row-style="tableRowStyle"' +
   '     :row-class-name="tableRowClassName"' +
   '     :stripe="table.stripe ? table.stripe : true"' +
   '     :size="table.size ? table.size : \'medium\'"' +
   '     :show-header="table.showHeader ? table.showHeader : true"' +
   '     style="width: 100%">' +
   '     <el-table-column' +
   '       v-if="isSelect(table.hasSelect)"' +
   '       type="selection"' +
   '       width="55">' +
   '     </el-table-column>' +
   '     <template v-for="item in table.tr">' +
   '       <template v-if="isTreeTable(table.tree, item.prop)">' +
   '         <table-tree-column' +
   '           :levelKey="levelKey"' +
   '           :childKey="childKey"' +
   '           :expanded="expanded"' +
   '           :show="show"' +
   '           :data="table.data"' +
   '           :key="item.prop"' +
   '           :prop="item.prop"' +
   '           :label="item.label"' +
   '           :minWidth="item.minWidth ? item.minWidth : \'\'"' +
   '           :width="item.width ? item.width : \'\'"' +
   '         />' +
   '       </template>' +
   '       <template v-else-if="item.other">' +
   '         <el-table-column' +
   '           show-overflow-tooltip' +
   '           :prop="item.prop"' +
   '           :key="item.prop"' +
   '           :label="item.label"' +
   '           v-if="item.show !== false ? true : false"' +
   '           :min-width="item.minWidth ? item.minWidth : \'\'"' +
   '           :width="item.width ? item.width : \'\'"' +
   '         >' +
   '           <!-- <slot :name="item.prop + \'Table\'"></slot> -->' +
   '           <template slot-scope="scope">' +
   '             <i class="el-icon-time"></i>' +
   '             <span style="margin-left: 10px">{{ scope.row.email }}</span>' +
   '           </template>' +
   '         </el-table-column>' +
   '       </template>' +
   '       <template v-else>' +
   '         <el-table-column' +
   '           show-overflow-tooltip' +
   '           :prop="item.prop"' +
   '           :key="item.prop"' +
   '           :label="item.label"' +
   '           v-if="item.show !== false ? true : false"' +
   '           :min-width="item.minWidth ? item.minWidth : \'\'"' +
   '           :width="item.width ? item.width : \'\'"' +
   '         />' +
   '       </template>' +
   '     </template>' +
   '     <el-table-column' +
   '       v-if="isOperation(table.operation)"' +
   '       fixed="left"' +
   '       :label="table.operation.label"' +
   '       :width="table.operation.width ? table.operation.width : \'\'"' +
   '       :min-width="table.operation.minWidth ? table.operation.minWidth : \'\'">' +
   '       <template slot-scope="scope">' +
   '         <el-button' +
   '           v-for="item in table.operation.data"' +
   '           v-if="isPermission(item.permission) && isShow(item.show)"' +
   '           :key="item.label"' +
   '           size="small"' +
   '           :type="table.operation.type ? table.operation.type : \'text\'"' +
   '           @click="handleOperation(scope.$index, scope.row, item.id)">' +
   '           {{item.label}}' +
   '         </el-button>' +
   '       </template>' +
   '     </el-table-column>' +
   '   </el-table>' +
   '   <!-- 分页 -->' +
   '   <div class="block" v-if="isPagination(table.pagination)">' +
   '     <el-pagination' +
   '       @size-change="handleSizeChange"' +
   '       @current-change="handleCurrentChange"' +
   '       :current-page="table.pagination.currentPage ? table.pagination.currentPage : 1"' +
   '       :page-sizes="table.pagination.pageSizes ? table.pagination.pageSizes : [10, 20, 30, 50]"' +
   '       :page-size="table.pagination.pageSize ? table.pagination.pageSize : 10"' +
   '       :layout="table.pagination.layout ? table.pagination.layout : \'total, sizes, prev, pager, next, jumper\'"' +
   '       background' +
   '       :total="table.pagination.total ? table.pagination.total : 0">' +
   '     </el-pagination>' +
   '   </div>' +
   ' </div>',

  props: {
    table: {
      type: Object,
      default: function () {
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
          // 树
          tree: {
            // 是否开启tabletree 有选择框必加
            hasTree: false,
            treeKey: '',
            // 折叠prop
            expand: true,
            // 是否跟父级相关联
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
  computed: {
    permissions: function () {
      return JSON.parse(sessionStorage.getItem('permissions'))
    }
  },
  methods: {
    // 按钮是否显示
    isShow (status = true) {
      if (isBoolean(status) && status) {
        return true
      } else {
        return false
      }
    },
    // 是否有选择框
    isSelect: function (select) {
      return isBoolean(select) ? (select ? 1 : 0) : 0
    },
    // 是否是树形
    isTreeTable: function (tree, prop) {
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
    isOperation: function (operation) {
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
    isPagination: function (pagination) {
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
    isPermission: function (val) {
      if (val && this.permissions && this.permissions.length) {
        return this.permissions.findIndex(function (item) {
          return item === val
        }) > -1
      }
      return true
    },
    // 按钮事件
    handleOperation: function (index, row, id) {
      var self = this
      var data = this.table.operation.data
      for (var i = 0, len = data.length; i < len; i++) {
        if (id === data[i].id) {
          self.$emit(data[i].fn, index, row)
        }
      }
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange: function (val) {
      // console.log('handleSelectionChange', val)
      var ids = val.map(function (item) {
        return item.id
      })
      this.$emit('selection-change-handle', ids, val)
    },
    // 当全选时发生变化时会触发该事件
    handleSelectAll: function (val) {
      // console.log('handleSelectAll', val)
      this.$emit('select-all-handle', val)
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    handleSelect: function (val, row) {
      // console.log('handleSelect', val, row)
      var self = this
      if (this.table.tree && isBoolean(this.table.tree.checkStrictly) && this.table.tree.checkStrictly && row.children && row.children.length > 0) {
        var index = val.findIndex(function (item) {
          return item.id === row.id
        })

        var data = []
        // -1 移除选中; 大于-1 选中
        this.$nextTick(function () {
          if (index === -1) {
            self.getDataChildren(row.children, data)
            data.forEach(function (row) {
              self.$refs.kTable.toggleRowSelection(row, false)
            })
          } else {
            self.getDataChildren(row.children, data)
            data.forEach(function (row) {
              self.$refs.kTable.toggleRowSelection(row, true)
            })
          }
        })
      }
      this.$emit('select-handle', val)
    },
    // 当某个单元格被点击时会触发该事件
    cellClickHandle: function (row, column, cell, event) {
      this.$emit('cell-click-handle', row, column, cell, event)
    },
    // 当某一行被点击时会触发该事件
    handleRowClick: function (row, event, column) {
      this.$emit('row-click-handle', row, event, column)
    },
    // 为 Table 中的某一行添加 classname
    tableRowClassName: function (rows) {
      this.$emit('table-row-class-name-handle', rows.rowIndex, rows.row)
    },
    // 行的 style 的回调方法，
    tableRowStyle: function (rows) {
      if (this.table.tree || (this.table.tree && this.table.tree.hasTree)) {
        var show = !(isBoolean(rows.row[this.show])) ? 1 : (rows.row[this.show] ? 1 : 0)
        rows.row[this.show] = !!show
        return show ? '' : 'display:none;'
      }
    },
    // 每页条数改变时会触发
    handleSizeChange: function (val) {
      this.$emit('size-change-handle', val)
    },
    // 当前页改变时会触发
    handleCurrentChange: function (val) {
      this.$emit('current-change-handle', val)
    },
    getDataChildren: function (row, data) {
      for (var i = 0, len = row.length; i < len; i++) {
        data.push(row[i])
        var children = row[i].children
        if (children && children.length > 0) {
          this.getDataChildren(children, data)
        }
      }
    }
  }
})
