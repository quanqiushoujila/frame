<template>
  <div class="user-manage" :style="{ 'min-height': (documentClientHeight - 115) + 'px' }">
    <header-layout>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchContent.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <search-btn @searchHandle="searchHandle"/>
        </el-form-item>
        <el-form-item>
          <add-btn @addHandle="addHandle"/>
        </el-form-item>
        <el-form-item>
          <delete-query-btn @deleteQueryHandle="deleteQueryHandle"/>
        </el-form-item>
      </el-form>
    </header-layout>
    <body-layout>
      <k-table
        @selectionChangeHandle="selectionChangeHandle"
        @sizeChangeHandle="sizeChangeHandle"
        @currentChangeHandle="currentChangeHandle"
        @detailHandle="detailHandle"
        @editHandle="editHandle"
        @deleteHandle="deleteHandle"
        :table="table"/>
    </body-layout>
    <!-- 新增修改详情 -->
    <role-dialog
      ref="roleDialog"
      :formData="formData"
      :title="title1"
    />
  </div>
</template>
<script>
// import clonedeep from 'lodash/clonedeep'
import merge from 'lodash/merge'
import { sysRoleList } from 'js/api/system/role'
import common from 'js/mixin/common'
import headerLayout from 'components/_layout/headerLayout'
import bodyLayout from 'components/_layout/bodyLayout'
import addBtn from 'components/_btn/addBtn'
import deleteQueryBtn from 'components/_btn/deleteQueryBtn'
import kTable from 'components/_table/table'
import searchBtn from 'components/_btn/searchBtn'
import roleDialog from 'page/system/role/roleDialog'

export default {
  name: 'roleManage',
  mixins: [common],
  components: {headerLayout, bodyLayout, addBtn, deleteQueryBtn, searchBtn, kTable, roleDialog},
  data () {
    return {
      searchContent: {
        name: ''
      },
      table: {
        loading: false,
        // table数据
        data: [],
        // table 表头
        tr: [
          {
            prop: 'name',
            label: '角色名称'
          },
          {
            prop: 'remark',
            label: '描述'
          }
        ],
        hasSelect: true,
        // 操作
        operation: {
          hasOperation: true,
          label: '操作',
          width: 150,
          type: 'text',
          minWidth: '',
          // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
          data: [{
            type: '',
            label: '详情',
            id: 1,
            fn: 'detailHandle',
            permission: 'sys:user:info'
          }, {
            type: 'warning',
            label: '编辑',
            id: 2,
            fn: 'editHandle',
            permission: 'sys:user:update'
          }, {
            type: 'danger',
            label: '删除',
            id: 3,
            fn: 'deleteHandle',
            permission: 'sys:user:delete'
          }]
        },
        pagination: {
          hasPagination: true
        }
      },
      pagination: {
        page: 1,
        limit: 10
      },
      formData: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getTableData()
    },
    open () {
      this.$refs.roleDialog.open()
    },
    // 获取table数据
    getTableData (data = {}) {
      this.table.loading = true
      sysRoleList(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.table.data = res.data
          this.table.pagination.total = res.count
          this.table.loading = false
        }
      })
    },
    // 搜索
    searchHandle () {
      const result = merge(this.pagination, this.searchContent)
      this.getTableData(result)
    },
    // 删除接口方法
    deleteApiHandle (id) {}
  }
}
</script>

<style lang="scss" scoped>
</style>
