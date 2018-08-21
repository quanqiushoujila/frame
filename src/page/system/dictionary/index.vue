<template>
  <div class="menu-manage" :style="{ 'min-height': (documentClientHeight - 115) + 'px' }">
    <header-layout>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchContent.name" placeholder="请输入字典名称"></el-input>
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
        @dictionaryChildrenHandle="dictionaryChildrenHandle"
        :table="tableTree"/>
    </body-layout>

    <!-- 新增修改详情 -->
    <dictionary-dialog
      ref="dictionaryDialog"
      :formData="formData"
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
import dictionaryDialog from 'page/system/dictionary/dictionaryDialog'
import { sysDictionaryList } from 'js/api/system/dictionary'
import common from 'js/mixin/common'
import {treeDataTranslate} from 'js/util/index'
import isBoolean from 'lodash/isBoolean'
export default {
  name: 'dictionaryManage',
  components: {headerLayout, bodyLayout, kTable, addBtn, searchBtn, dictionaryDialog},
  mixins: [common],
  data () {
    return {
      searchContent: {
        name: ''
      },
      tableTree: {
        loading: false,
        // table数据
        data: [],
        // table 表头
        tr: [
          {
            prop: 'name',
            label: '菜单名称',
            width: 400
          },
          {
            prop: 'value',
            label: '字典值'
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
            label: '字典项',
            id: 1,
            fn: 'dictionaryChildrenHandle',
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
      this.getTableTreeData(this.pagination)
    },
    open () {
      this.$refs.dictionaryDialog.open()
    },
    // 获取tabletree数据
    getTableTreeData (data = {}) {
      this.tableTree.loading = true
      sysDictionaryList(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          const expand = this.tableTree.tree && isBoolean(this.tableTree.tree.expand) ? this.tableTree.tree.expand : false
          this.tableTree.data = treeDataTranslate(res.data, expand)
          this.tableTree.pagination.total = res.count
          this.tableTree.loading = false
        }
      })
    },
    searchHandle () {
      console.log('搜索', this.searchContent)
      this.getTableTreeData(this.searchContent)
    },
    // 添加子级
    dictionaryChildrenHandle (index, row) {
      const data = clonedeep(row)
      const childData = {
        parentId: data.id
      }
      this.formData = childData
      this.title1 = '添加字典项'
      this.open()
      console.log('字典项', index, row)
    },
    // 删除接口方法
    deleteApiHandle (id) {}
  }
}
</script>

<style lang="scss" scoped>
</style>
