<template>
  <div class="user-manage" :style="{ 'min-height': (documentClientHeight - 115) + 'px' }">
    <header-layout>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchContent.beanName" placeholder="bean名称"></el-input>
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
          <el-button
            @click="stopHandle"
            type="info"
            icon="el-icon-bell">
            暂停
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="replyHandle"
            type="warning"
            icon="el-icon-news">
            回复
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="implementHandle"
            type="success"
            icon="el-icon-phone">
            立即执行
          </el-button>
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
    <time-dialog
      ref="timeDialog"
      :formData="formData"
      :title="title1"
    />
  </div>
</template>
<script>
// import clonedeep from 'lodash/clonedeep'
import merge from 'lodash/merge'
import { sysTimeList } from 'js/api/system/time'
import common from 'js/mixin/common'
import headerLayout from 'components/_layout/headerLayout'
import bodyLayout from 'components/_layout/bodyLayout'
import addBtn from 'components/_btn/addBtn'
import deleteQueryBtn from 'components/_btn/deleteQueryBtn'
import kTable from 'components/_table/table'
import searchBtn from 'components/_btn/searchBtn'
import timeDialog from 'page/system/time/timeDialog'

export default {
  name: 'timeManage',
  mixins: [common],
  components: {headerLayout, bodyLayout, addBtn, deleteQueryBtn, searchBtn, kTable, timeDialog},
  data () {
    return {
      searchContent: {
        beanName: ''
      },
      table: {
        loading: false,
        // table数据
        data: [],
        // table 表头
        tr: [
          {
            prop: 'beanName',
            label: 'bean名称'
          },
          {
            prop: 'methodName',
            label: '方法名称'
          },
          {
            prop: 'params',
            label: '参数'
          },
          {
            prop: 'cronExpression',
            label: 'cron表达式'
          },
          {
            prop: 'statusForShow',
            label: '状态'
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
  methods: {
    init () {
      this.getTableData(this.pagination)
    },
    open () {
      this.$refs.timeDialog.open()
    },
    // 获取table数据
    getTableData (data = {}) {
      this.table.loading = true
      sysTimeList(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.table.data = res.data
          this.table.pagination.total = res.count
          this.table.loading = false
        }
      })
    },
    searchHandle () {
      const result = merge(this.pagination, this.searchContent)
      this.getTableData(result)
    },
    // 添加操作
    addHandle () {
      this.title1 = this.GLOBAL.ADD
      this.$refs.timeDialog.open()
    },
    // 删除接口方法
    deleteApiHandle (id) {},
    // 立即执行
    implementHandle () {
      if (this.queryData.length > 0) {
        this.$confirm('确定要立即执行吗').then(() => {
          console.log('立即执行成功！！', this.queryData)
        }).catch(() => {})
      } else {
        this.warningHandle('未选择不能立即执行,请选择后操作')
      }
    },
    // 回复
    replyHandle () {
      if (this.queryData.length > 0) {
        this.$confirm('确定要回复吗').then(() => {
          console.log('回复成功！！', this.queryData)
        }).catch(() => {})
      } else {
        this.warningHandle('未选择不能回复,请选择后操作')
      }
    },
    // 暂停
    stopHandle () {
      if (this.queryData.length > 0) {
        this.$confirm('确定要暂停吗').then(() => {
          console.log('暂停成功！！', this.queryData)
        }).catch(() => {})
      } else {
        this.warningHandle('未选择不能暂停,请选择后操作')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
