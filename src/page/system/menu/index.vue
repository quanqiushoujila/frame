<template>
  <div class="menu-manage" :style="{ 'min-height': (documentClientHeight - 115) + 'px' }">
    <header-layout>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchContent.name" placeholder="请输入菜单名称"></el-input>
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
        @detailHandle="detailHandle"
        @editHandle="editHandle"
        @deleteHandle="deleteHandle"
        @addChildHandle="addChildHandle"
        @resultData="resultData"
        :table="tableTree"/>
    </body-layout>

    <!-- 新增修改详情 -->
    <menu-dialog
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
import menuDialog from 'page/system/menu/menuDialog'
import { sysMenuList } from 'js/api/system/menu'
import common from 'js/mixin/common'

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
            width: 400
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
          hasPagination: false
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
      this.getTableTreeData()
    },
    // 新增
    addHandle () {
      this.title1 = '新增'
      this.$refs.menuDialog.open()
    },
    // 详情
    detailHandle (index, row) {
      this.formData = clonedeep(row)
      this.title1 = '详情'
      this.$refs.menuDialog.open()
      console.log('详情', index, row)
    },
    // 添加子级
    addChildHandle (index, row) {
      this.formData = clonedeep(row)
      this.title1 = '添加子级菜单'
      this.$refs.menuDialog.open()
      console.log('添加子级菜单', index, row)
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
      sysMenuList().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.tableTree.data = res.data
          this.tableTree.loading = false
        }
      })
    },
    // 接收treetabledata改变后的数据
    resultData (data) {
      this.tableTree.data = data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
