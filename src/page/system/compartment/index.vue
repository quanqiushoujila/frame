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
          <search-btn @searchHandle="searchHandle"/>
        </el-form-item>
        <el-form-item>
          <add-btn @addHandle="addHandle"/>
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
        :table="tableTree"/>
    </body-layout>

    <!-- 新增修改详情 -->
    <compartment-dialog
      ref="compartmentDialog"
      :formData="formData"
      :title="title1"
    />
  </div>
</template>
<script>
import clonedeep from 'lodash/clonedeep'
import merge from 'lodash/merge'
import headerLayout from 'components/_layout/headerLayout'
import bodyLayout from 'components/_layout/bodyLayout'
import kTable from 'components/_table/table'
import addBtn from 'components/_btn/addBtn'
import searchBtn from 'components/_btn/searchBtn'
import compartmentDialog from 'page/system/compartment/compartmentDialog'
import { sysCompartmentList } from 'js/api/system/compartment'
import common from 'js/mixin/common'
import {treeDataTranslate} from 'js/util/index'
import isBoolean from 'lodash/isBoolean'

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
        tree: {
          treeKey: 'name'
        },
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
      this.getTableData(this.pagination)
    },
    open () {
      this.$refs.compartmentDialog.open()
    },
    // 获取tabletree数据
    getTableData (data = {}) {
      const result = merge(this.pagination, this.searchContent, data)
      this.tableTree.loading = true
      sysCompartmentList(result).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          const expand = this.tableTree.tree && isBoolean(this.tableTree.tree.expand) ? this.tableTree.tree.expand : false
          this.tableTree.data = treeDataTranslate(res.data, expand)
          this.tableTree.pagination.total = res.count
          this.tableTree.loading = false
        }
      })
    },
    // 搜索
    searchHandle () {
      this.getTableData()
    },
    // 添加子级
    childrenHandle (index, row) {
      const data = clonedeep(row)
      const childData = {
        parentId: data.id,
        parentName: data.name
      }
      this.formData = childData
      this.title1 = '添加子级行政区划'
      this.open()
      console.log('子级', index, row)
    },
    // 删除接口方法
    deleteApiHandle (id) {}
  }
}
</script>

<style lang="scss" scoped>
</style>
