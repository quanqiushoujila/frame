<template>
  <div class="user-manage" :style="{ 'min-height': (documentClientHeight - 115) + 'px' }">
    <header-layout>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchContent.title" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item>
          <search-btn @searchClick="searchHandle"/>
        </el-form-item>
      </el-form>
    </header-layout>
    <body-layout>
      <k-table
        @sizeChangeHandle="sizeChangeHandle"
        @currentChangeHandle="currentChangeHandle"
        @detailHandle="detailHandle"
        :table="table"/>
    </body-layout>

    <!-- 新增修改详情 -->
    <log-dialog
      ref="logDialog"
      :form="formData"
      :title="title1"
    />
  </div>
</template>
<script>
import {sysLogList} from 'js/api/system/log'
import common from 'js/mixin/common'
import headerLayout from 'components/_layout/headerLayout'
import bodyLayout from 'components/_layout/bodyLayout'
import kTable from 'components/_table/table'
import searchBtn from 'components/_btn/searchBtn'
import logDialog from 'page/system/log/logDialog'

export default {
  name: 'logManage',
  mixins: [common],
  components: {headerLayout, bodyLayout, searchBtn, kTable, logDialog},
  data () {
    return {
      queryData: [],
      searchContent: {
        title: ''
      },
      table: {
        loading: false,
        // table数据
        data: [],
        // table 表头
        tr: [
          {
            label: '模块',
            prop: 'module'
          },
          {
            label: '菜单',
            prop: 'menu'
          },
          {
            label: '操作人',
            prop: 'username'
          },
          {
            label: '操作时间',
            prop: 'createDate'
          },
          {
            label: '日志类型',
            prop: 'operation'
          }
        ],
        hasSelect: true,
        // 操作
        operation: {
          hasOperation: true,
          label: '操作',
          width: 50,
          type: 'text',
          minWidth: '',
          // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
          data: [{
            type: '',
            label: '详情',
            id: 1,
            fn: 'detailHandle',
            permission: ''
          }]
        },
        pagination: {
          hasPagination: true,
          total: 0
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
    // 获取table数据
    getTableData (data = {}) {
      data = this.pagination
      this.table.loading = true
      sysLogList(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          console.log(res)
          this.table.data = res.data
          this.table.pagination.total = res.count
          this.table.loading = false
        }
      })
    },
    // 详情
    detailHandle (index, row) {
      const newDate = row.newValues.split(';')
      const oldDate = row.oldValues.split(';')
      this.formData.new = newDate
      this.formData.old = oldDate
      console.log(this.formData)
      this.title1 = '详情'
      this.$refs.logDialog.open()
      console.log('详情', index, row)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.input-width {
  width: 150px;
}
</style>
