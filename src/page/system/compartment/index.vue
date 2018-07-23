<template>
  <div class="menu-manage" :style="{ 'min-height': (documentClientHeight - 115) + 'px' }">
    <header-layout>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchContent.name" placeholder="请输入行政区划名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchContent.code" placeholder="请输入行政区划代码"></el-input>
        </el-form-item>
        <el-form-item>
          <search-btn @searchClick="searchHandle"/>
        </el-form-item>
        <el-form-item>
          <add-btn @addClick="addHandle"/>
        </el-form-item>
      </el-form>
    </header-layout>
    <body-layout>
      <k-table
        @sizeChangeHandle="sizeChangeHandle"
        @currentChangeHandle="currentChangeHandle"
        @editHandle="editHandle"
        @deleteHandle="deleteHandle"
        @childrenHandle="childrenHandle"
        @resultData="resultData"
        :table="tableTree"/>
    </body-layout>

    <!-- 新增修改详情 -->
    <compartment-dialog
      ref="menuDialog"
      :form="formData"
      :title="title1"
    />
  </div>
</template>
<script>
import clonedeep from 'lodash/clonedeep'
import headerLayout from 'components/_layout/headerLayout'
import bodyLayout from 'components/_layout/bodyLayout'
import kTable from 'components/_table/table'
import addBtn from 'components/_btn/addBtn'
import searchBtn from 'components/_btn/searchBtn'
import compartmentDialog from 'page/system/compartment/compartmentDialog'
import { sysCompartmentList } from 'js/api/system/compartment'
import common from 'js/mixin/common'

export default {
  name: 'compartmentManage',
  components: {headerLayout, bodyLayout, kTable, addBtn, searchBtn, compartmentDialog},
  mixins: [common],
  data () {
    return {
      searchContent: {
        name: '',
        code: ''
      },
      tableTree: {
        loading: false,
        // table数据
        data: [],
        // table 表头
        tr: [
          {
            prop: 'name',
            label: '区划名称',
            width: 400
          },
          {
            prop: 'code',
            label: '区划代码'
          },
          {
            prop: 'sort',
            label: '排序'
          }
        ],
        hasSelect: false,
        hasTreeTable: true,
        treeTableKey: 'name',
        // 操作
        operation: {
          hasOperation: true,
          label: '操作',
          width: 150,
          minWidth: '',
          // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
          data: [{
            label: '子级',
            id: 1,
            fn: 'childrenHandle',
            permission: ''
          }, {
            label: '编辑',
            id: 2,
            fn: 'editHandle',
            permission: ''
          }, {
            label: '删除',
            id: 3,
            fn: 'deleteHandle',
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
      this.getTableTreeData()
    },
    // 搜索
    searchHandle () {
      const data = {name: this.searchContent.text}
      this.getTableTreeData({data})
    },
    // 新增
    addHandle () {
      this.title1 = '新增'
      this.$refs.menuDialog.open()
    },
    // 添加子级
    childrenHandle (index, row) {
      this.formData = clonedeep(row)
      this.title1 = '添加子级行政区划'
      this.$refs.menuDialog.open()
      console.log('子级', index, row)
    },
    // 编辑
    editHandle (index, row) {
      this.formData = clonedeep(row)
      this.title1 = '编辑'
      this.$refs.menuDialog.open()
      setTimeout(() => {
        this.$refs.menuDialog.validate()
      }, 10)
      console.log('编辑', index, row)
    },
    // 删除
    deleteHandle (index, row) {
      this.confirmHandle('确定删除吗？').then(() => {
        console.log('删除', index, row)
      })
    },
    // 获取tabletree数据
    getTableTreeData () {
      this.tableTree.loading = true
      sysCompartmentList().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.tableTree.data = res.data
          this.tableTree.pagination.total = res.count
          this.tableTree.loading = false
        }
      })
    },
    // 接收treetabledata改变后的数据
    resultData (data) {
      this.tableTree.data = data
    },
    currentChangeHandle (val) {
      this.pagination.page = val
      this.getTableTreeData(this.pagination)
      console.log('currentChangeHandle', val)
    },
    sizeChangeHandle (val) {
      this.pagination.limit = val
      this.getTableTreeData(this.pagination)
      console.log('sizeChangeHandle', val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
