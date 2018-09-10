<template>
  <div class="user-manage" :style="{ 'min-height': (documentClientHeight - 115) + 'px' }">
    <header-layout>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchContent.name" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item prop="type">
          <el-select
            filterable
            v-model="searchContent.type"
            placeholder="机构类别"
            class="input-width">
            <el-option label="" value=""></el-option>
            <el-option
              v-for="item in typeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  prop="areaId">
          <el-select
            filterable
            v-model="searchContent.areaId"
            class="input-width"
            placeholder="所属行政区划">
            <el-option label="" value=""></el-option>
            <el-option
              v-for="item in areaIdOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="comLevel">
          <el-select
            filterable
            v-model="searchContent.comLevel"
            class="input-width"
            placeholder="区划级别">
            <el-option label="" value=""></el-option>
            <el-option
              v-for="item in comLevelOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
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
        @selectionChangeHandle="selectionChangeHandle"
        @sizeChangeHandle="sizeChangeHandle"
        @currentChangeHandle="currentChangeHandle"
        @detailHandle="detailHandle"
        @editHandle="editHandle"
        @deleteHandle="deleteHandle"
        :table="table"/>
    </body-layout>

    <!-- 新增修改详情 -->
    <department-dialog
      :parentIdOptions="table.data"
      ref="compartmentDialog"
      :formData="formData"
      :title="title1"
    />
  </div>
</template>
<script>
// import clonedeep from 'lodash/clonedeep'
import merge from 'lodash/merge'
import {sysCompartmentComLevel, sysCompartmentAreaName} from 'js/api/system/compartment'
import {sysDepartmentList} from 'js/api/system/department'
import common from 'js/mixin/common'
import headerLayout from 'components/_layout/headerLayout'
import bodyLayout from 'components/_layout/bodyLayout'
import addBtn from 'components/_btn/addBtn'
import kTable from 'components/_table/table'
import searchBtn from 'components/_btn/searchBtn'
import departmentDialog from 'page/system/department/departmentDialog'

export default {
  name: 'departmentManage',
  mixins: [common],
  components: {headerLayout, bodyLayout, addBtn, searchBtn, kTable, departmentDialog},
  data () {
    return {
      searchContent: {
        name: '',
        type: '',
        areaId: '',
        comLevel: ''
      },
      table: {
        loading: false,
        // table数据
        data: [],
        // table 表头
        tr: [
          {
            label: '名称',
            prop: 'name'
          },
          {
            label: '机构类别',
            prop: 'type'
          },
          {
            label: '机构编码',
            prop: 'code'
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
            permission: ''
          }, {
            type: 'warning',
            label: '编辑',
            id: 2,
            fn: 'editHandle',
            permission: ''
          }, {
            type: 'danger',
            label: '删除',
            id: 3,
            fn: 'deleteHandle',
            permission: ''
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
      formData: {},
      // 机构类别
      typeOptions: [],
      // 所属行政区划
      areaIdOptions: [],
      // 区划级别
      comLevelOptions: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getTableData()
      this.getType()
      this.getAreaName()
      this.getComLevel()
    },
    searchHandle () {
      console.log('搜索', this.searchContent)
      this.getTableData()
    },
    open () {
      this.$refs.compartmentDialog.open()
    },
    // 获取table数据
    getTableData (data = {}) {
      const result = merge(this.pagination, this.searchContent, data)
      this.table.loading = true
      sysDepartmentList(result).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.table.data = res.data
          this.table.pagination.total = res.count
          this.table.loading = false
        }
      })
    },
    // 机构类别
    getType (data = {}) {
      sysDepartmentList(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.typeOptions = res.data
        }
      })
    },
    // 区划级别
    getComLevel (data = {}) {
      // /sys/compartment/comLevel
      sysCompartmentComLevel(data).then((res) => {
        console.log(res)
        if (res.code === this.GLOBAL.SUCCESS) {
          this.comLevelOptions = res.data
        }
      })
    },
    // 所属行政区划
    getAreaName (data = {}) {
      // /sys/compartment/areaName
      sysCompartmentAreaName(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.areaIdOptions = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.input-width {
  width: 150px;
}
</style>
