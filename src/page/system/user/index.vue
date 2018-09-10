<template>
  <div class="user-manage" :style="{ 'min-height': (documentClientHeight - 115) + 'px' }">
    <header-layout>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchContent.realname" placeholder="请输入登录名"></el-input>
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
        <el-form-item>
          <export-btn @exportHandle="exportHandle" v-dbClick/>
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
        :table="table">
        <template slot-scope="props" slot="username">
          <div style="color: red;">{{props.data.row.username}}</div>
        </template>
        <template slot-scope="props" slot="email">
          <div style="color: blue;">{{props.data.row.email}}</div>
        </template>
      </k-table>
    </body-layout>

    <!-- 新增修改详情 -->
    <user-dialog
      ref="userDialog"
      :formData="formData"
      :title="title1"
    />
    <!-- 导入 -->
    <export-dialog
      @exportClick="exportHandle"
      ref="export"/>
  </div>
</template>
<script>
// import clonedeep from 'lodash/clonedeep'
import merge from 'lodash/merge'
import { sysUserList } from 'js/api/system/user'
import common from 'js/mixin/common'
import {getRealData} from 'js/util/index'
import headerLayout from 'components/_layout/headerLayout'
import bodyLayout from 'components/_layout/bodyLayout'
import addBtn from 'components/_btn/addBtn'
import deleteQueryBtn from 'components/_btn/deleteQueryBtn'
import exportBtn from 'components/_btn/exportBtn'
import kTable from 'components/_table/table'
import searchBtn from 'components/_btn/searchBtn'
import userDialog from 'page/system/user/userDialog'
import exportDialog from 'components/_dialog/exportDialog'

export default {
  name: 'userManage',
  mixins: [common],
  components: {headerLayout, bodyLayout, addBtn, deleteQueryBtn, exportBtn, searchBtn, kTable, userDialog, exportDialog},
  data () {
    return {
      searchContent: {
        realname: ''
      },
      table: {
        loading: false,
        // table数据
        data: [],
        // table 表头
        tr: [
          {
            prop: 'realname',
            label: '登录名',
            show: false
          },
          {
            prop: 'username',
            label: '姓名',
            template: true
          },
          {
            prop: 'email',
            label: '邮箱',
            template: true
          },
          {
            prop: 'roleIdForShow',
            label: '角色'
          }
        ],
        hasSelect: true,
        // 操作
        operation: {
          hasOperation: true,
          label: '操作',
          width: 200,
          type: 'text',
          minWidth: '',
          // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
          data: [
            {
              type: '',
              label: '详情',
              id: 1,
              fn: 'detailHandle',
              permission: 'sys:user:info'
            },
            {
              type: 'warning',
              label: '编辑',
              id: 2,
              fn: 'editHandle',
              permission: 'sys:user:update'
            },
            {
              type: 'danger',
              label: '删除',
              id: 3,
              fn: 'deleteHandle',
              permission: 'sys:user:delete'
            },
            {
              type: '',
              label: '重置密码',
              id: 4,
              fn: 'repeatPasswordHandle'
            }
          ]
        },
        pagination: {
          hasPagination: true,
          total: 144
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
  computed: {
    documentClientHeight: {
      get () { return this.$store.state.common.documentClientHeight },
      set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
    }
  },
  methods: {
    init () {
      this.getTableData()
    },
    open () {
      this.$refs.userDialog.open()
    },
    // 获取table数据
    getTableData (data = {}) {
      this.table.loading = true
      sysUserList(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.table.data = res.data
          this.table.data = getRealData({name: 'roleId', data: res.data, dicName: 'is_require'})
          this.table.pagination.total = res.count
          this.table.loading = false
        }
      })
    },
    // 搜索
    searchHandle () {
      console.log('搜索', this.searchContent)
      const result = merge(this.pagination, this.searchContent)
      this.getTableData(result)
    },
    // 添加操作
    addHandle () {
      this.title1 = this.GLOBAL.ADD
      this.open()
    },
    // 导入
    exportHandle () {
      this.$refs.export.open()
    },
    // 删除接口方法
    deleteApiHandle (id) {},
    // 重置密码
    repeatPasswordHandle (index, row) {
      this.$confirm('确定重置密码吗？').then(() => {
        console.log('重置密码成功', index, row)
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
