<template>
  <div class="user-manage" :style="{ 'min-height': (documentClientHeight - 115) + 'px' }">
    <header-layout>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchContent.name" placeholder="请输入信息资源名称"></el-input>
        </el-form-item>
        <el-form-item>
          <search-btn @searchHandle="searchHandle" v-dbClick/>
        </el-form-item>
        <el-form-item>
          <add-btn @addHandle="addHandle"/>
        </el-form-item>
        <el-form-item>
          <export-btn @exportHandle="exportHandle"/>
        </el-form-item>
        <el-form-item>
          <import-btn @importHandle="importHandle"/>
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
        @nameCellHandle="nameCellHandle"
        @fromForShowCellHandle="fromForShowCellHandle"
        :table="table">
        <template slot-scope="props" slot="status">
          <div :class="statusStyle(props.data.row.status)" @click="statusCellHandle(props.data.row)">{{props.data.row.statusForShow}}</div>
        </template>
      </k-table>
    </body-layout>

    <!-- 新增修改详情 -->
    <dialog-two
      width="middle"
      ref="dialogTwo"
      :formData="dataElementFormData"
      :title="title2">
    </dialog-two>

    <dialog-one
      @addDataElement="addDataElement"
      @dataElementEditHandle="dataElementEditHandle"
      @dataElementDetailHandle="dataElementDetailHandle"
      width="large"
      ref="dialogOne"
      :formData="formData"
      :title="title1">
    </dialog-one>
  </div>
</template>
<script>
import clonedeep from 'lodash/clonedeep'
import merge from 'lodash/merge'
import {tableData} from 'js/api/test/test1'
import common from 'js/mixin/common'
import headerLayout from 'components/_layout/headerLayout'
import bodyLayout from 'components/_layout/bodyLayout'
import addBtn from 'components/_btn/addBtn'
import deleteQueryBtn from 'components/_btn/deleteQueryBtn'
import exportBtn from 'components/_btn/exportBtn'
import importBtn from 'components/_btn/importBtn'
import kTable from 'components/_table/table'
import searchBtn from 'components/_btn/searchBtn'
import dialogOne from 'page/test/test1/dialogOne'
import dialogTwo from 'page/test/test1/dialogTwo'

export default {
  name: 'userManage',
  mixins: [common],
  components: {
    headerLayout, // 头部布局
    bodyLayout, // 内容布局
    addBtn, // 新增按钮
    importBtn, // 导入按钮
    deleteQueryBtn, // 批量删除按钮
    exportBtn, // 导出按钮
    searchBtn, // 搜索按钮
    kTable, // 表格
    dialogOne, // 弹窗
    dialogTwo // 信息项弹窗
  },
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
            prop: '',
            label: '信息资源',
            children: [
              {
                prop: '',
                label: '名称',
                children: [
                  {
                    prop: 'name',
                    label: '中文',
                    click: true
                  },
                  {
                    prop: 'englishName',
                    label: '英文'
                  }
                ]
              },
              {
                prop: 'code',
                label: '代码'
              }
            ]
          },
          {
            prop: 'fromForShow',
            label: '资源提供方',
            click: true
          },
          {
            prop: 'status',
            label: '状态',
            template: true
          }
        ],
        hasSelect: true,
        btnGroupFn: function (data, row) {
          return (row.isDelete === 1 && data.name === 'delete') ? false : (row.isDelete == null) ? true : !!row.isDelete
        },
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
              name: 'detail',
              type: '',
              label: '详情',
              id: 1,
              fn: 'detailHandle',
              permission: 'sys:user:info'
            },
            {
              name: 'edit',
              type: 'warning',
              label: '编辑',
              id: 2,
              fn: 'editHandle',
              permission: 'sys:user:update'
            },
            {
              name: 'delete',
              type: 'danger',
              label: '删除',
              id: 3,
              fn: 'deleteHandle'
            }
          ]
        },
        pagination: {
          total: 144
        }
      },
      pagination: {
        page: 1,
        limit: 10
      },
      formData: {},
      dataElementFormData: {}
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
      this.$refs.dialogOne.open()
    },
    openDataElement () {
      this.$refs.dialogTwo.open()
    },
    // 获取table数据
    getTableData (data = {}) {
      this.table.loading = true
      const result = merge(this.pagination, this.searchContent, data)
      tableData(result).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.table.data = res.data
          this.table.pagination.total = res.count
        }
        this.table.loading = false
      })
    },
    // 状态颜色
    statusStyle (status) {
      var color = ''
      if (status === 1) {
        color = 'blue pointer underline'
      } else if (status === 2) {
        color = 'red'
      }
      return color
    },
    // 搜索
    searchHandle () {
      console.log('搜索', this.searchContent)
      this.getTableData()
    },
    // 添加操作
    addHandle () {
      this.title1 = this.GLOBAL.ADD
      this.open()
    },
    // 导出
    exportHandle () {
    },
    // 导入
    importHandle () {

    },
    // 删除接口方法
    deleteApiHandle (id) {},
    // 状态单元格点击
    statusCellHandle (row) {
      if (row.status === 1) {
        this.$alert(row, '数据', {
          confirmButtonText: '确定',
          callback: () => {}
        })
      }
    },
    // 资源提供方单元格点击
    nameCellHandle (row) {
      this.$alert(row, '数据', {
        confirmButtonText: '确定',
        callback: () => {}
      })
    },
    fromForShowCellHandle (row) {
      this.$alert(row, '数据', {
        confirmButtonText: '确定',
        callback: () => {}
      })
    },
    // 信息项新增
    addDataElement () {
      console.log('信息项新增')
      this.title2 = '信息项新增'
      this.openDataElement()
    },
    // 信息项修改
    dataElementEditHandle (row) {
      console.log('信息项编辑', row)
      this.title2 = '信息项编辑'
      this.dataElementFormData = clonedeep(row)
      this.openDataElement()
    },
    // 信息项详情
    dataElementDetailHandle (row) {
      console.log('信息项详情', row)
      this.title2 = '信息项详情'
      this.dataElementFormData = clonedeep(row)
      this.openDataElement()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
