<template>
  <div class="user-manage" :style="{ 'min-height': (documentClientHeight - 115) + 'px' }">
    <header-layout>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchContent.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <search-btn @searchClick="searchHandle"/>
        </el-form-item>
        <el-form-item>
          <add-btn @addClick="addHandle"/>
        </el-form-item>
        <el-form-item>
          <delete-query-btn @deleteQueryClick="deleteQueryHandle"/>
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
        @repeatPasswordHandle="repeatPasswordHandle"
        :table="table"/>
    </body-layout>
    <!-- 新增修改详情 -->
    <role-dialog
      ref="roleDialog"
      :form="formData"
      :title="title1"
    />
  </div>
</template>
<script>
import clonedeep from 'lodash/clonedeep'
import {resetObject} from 'js/util'
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
    // 添加操作
    addHandle () {
      this.resetFormData()
      this.title1 = '新增'
      this.$refs.roleDialog.open()
    },
    // 获取table数据
    getTableData (data = {}) {
      data = this.pagination
      this.table.loading = true
      sysRoleList(data).then((res) => {
        console.log(res)
        if (res.code === this.GLOBAL.SUCCESS) {
          this.table.data = res.data
          this.table.pagination.total = res.count
          this.table.loading = false
        }
      })
    },
    // 详情
    detailHandle (index, row) {
      this.formData = clonedeep(row)
      this.title1 = '详情'
      this.$refs.roleDialog.open()
      console.log('详情', index, row)
    },
    // 编辑
    editHandle (index, row) {
      this.formData = clonedeep(row)
      this.title1 = '编辑'
      this.$refs.roleDialog.open()
      setTimeout(() => {
        this.$refs.roleDialog.validate()
      }, 10)
      console.log('编辑', index, row)
    },
    // 删除
    deleteHandle (index, row) {
      console.log('删除', index, row)
    },
    // 重置密码
    repeatPasswordHandle (index, row) {
      console.log('重置密码', index, row)
    },
    // table checkbox选择
    selectionChangeHandle (val) {
      const ids = val.map((item) => {
        return item.id
      })
      this.deleteQueryData = ids
    },
    currentChangeHandle (val) {
      this.pagination.page = val
      this.getTableData(this.pagination)
      console.log('currentChangeHandle', val)
    },
    sizeChangeHandle (val) {
      this.pagination.limit = val
      this.getTableData(this.pagination)
      console.log('sizeChangeHandle', val)
    },
    // 初始化数据
    resetFormData () {
      this.formData = resetObject(this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
