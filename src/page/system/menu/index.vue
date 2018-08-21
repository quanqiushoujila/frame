<template>
  <div class="menu-manage" :style="{ 'min-height': (documentClientHeight - 115) + 'px' }">
    <header-layout>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchContent.name" placeholder="请输入菜单名称"></el-input>
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
        @detailHandle="detailHandle"
        @editHandle="editHandle"
        @deleteHandle="deleteHandle"
        @addChildHandle="addChildHandle"
        :table="tableTree"/>
    </body-layout>

    <!-- 新增修改详情 -->
    <menu-dialog
      ref="menuDialog"
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
import menuDialog from 'page/system/menu/menuDialog'
import {sysMenuList} from 'js/api/system/menu'
import common from 'js/mixin/common'
import {treeDataTranslate} from 'js/util/index'
import isBoolean from 'lodash/isBoolean'
export default {
  name: 'menuManage',
  components: {headerLayout, bodyLayout, kTable, addBtn, searchBtn, menuDialog},
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
            width: '400px'
          },
          {
            prop: 'sort',
            label: '排序'
          }
        ],
        hasSelect: true,
        tree: {
          hasTree: true,
          treeKey: 'name',
          expand: false,
          checkStrictly: true
        },
        // 操作
        operation: {
          label: '操作',
          width: 250,
          minWidth: '',
          // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
          data: [{
            label: '子级',
            id: 4,
            fn: 'addChildHandle',
            permission: ''
          }, {
            label: '详情',
            id: 1,
            fn: 'detailHandle',
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
          total: 20,
          limit: 10
        }
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
      this.$refs.menuDialog.open()
    },
    // 获取tabletree数据
    getTableData (data = {}) {
      this.tableTree.loading = true
      sysMenuList(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          const expand = this.tableTree.tree && isBoolean(this.tableTree.tree.expand) ? this.tableTree.tree.expand : false
          this.tableTree.data = treeDataTranslate(res.data, expand)
          this.tableTree.loading = false
        }
      })
    },
    searchHandle () {
      console.log('搜索', this.searchContent)
      const result = merge(this.pagination, this.searchContent)
      this.getTableData(result)
    },
    // 添加子级
    addChildHandle (index, row) {
      const data = clonedeep(row)
      const childData = {
        parentId: data.id,
        parentName: data.name
      }
      this.formData = childData
      this.title1 = '添加子级菜单'
      this.open()
      console.log('添加子级菜单', index, row)
    },
    // 删除接口方法
    deleteApiHandle (id) {}
  }
}
</script>

<style lang="scss" scoped>
</style>
