<template>
  <div class="resourcesCatalog" :style="{ 'min-height': (documentClientHeight - 115) + 'px' }">
    <k-tab
      v-show="visibility"
      name="nameCn"
      :data="data"
      @openTable="openTable"
    />
    <div v-show="!visibility">
      <el-button @click="back" class="back-btn">返回</el-button>
      <k-table
        @sizeChangeHandle="sizeChangeHandle"
        @currentChangeHandle="currentChangeHandle"
        @detailHandle="detailHandle"
        :table="table"/>
    </div>
    <!-- 信息资源 -->
    <resource-dialog
      ref="resourcesDialog"
      @dataElementData="getDataElementData"
      :formData="formData"
      :title="title1"
    />
    <!-- 信息项 -->
    <data-element-dialog
      ref="dataElementDialog"
      :formData="dataElementData"
      :title="title2"
    />
  </div>
</template>
<script>
import merge from 'lodash/merge'
import kTab from 'components/_tab/tab'
import kTable from 'components/_table/table'
import common from 'js/mixin/common'
import resourceDialog from './resourceDialog'
import dataElementDialog from './dataElementDialog'
import {depart, classify, topicClassify, tableList} from 'js/api/catalog/resourceCatalog'
export default {
  name: 'resourcesCatalog',
  mixins: [common],
  components: {kTab, kTable, resourceDialog, dataElementDialog},
  data () {
    return {
      dataElementData: {},
      visibility: true,
      data: [
        {
          label: '部门类',
          data: []
        },
        {
          label: '基础资源分类',
          data: []
        },
        {
          label: '主题资源分类',
          data: []
        }
      ],
      table: {
        loading: false,
        // table数据
        data: [],
        // table 表头
        tr: [
          {
            prop: 'code',
            label: '信息资源编码'
          },
          {
            prop: 'nameCn',
            label: '信息资源名称'
          }
        ],
        // 操作
        operation: {
          hasOperation: true,
          label: '操作',
          width: 100,
          minWidth: '',
          // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
          data: [{
            label: '详情',
            id: 1,
            fn: 'detailHandle',
            permission: ''
          }]
        },
        pagination: {
          total: 0,
          limit: 10,
          page: 1
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
      this.getDepart()
      this.getClassify()
      this.getTopicClassify()
    },
    open () {
      this.$refs.resourcesDialog.open()
    },
    // 部门类
    getDepart () {
      depart().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.data[0].data = res.data
        }
      })
    },
    // 基础资源分类
    getClassify () {
      classify().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.data[1].data = res.data
        }
      })
    },
    // 主题资源分类
    getTopicClassify () {
      topicClassify().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.data[2].data = res.data
        }
      })
    },
    getTableData (data) {
      tableList(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.table.data = res.data
        }
      })
    },
    openTable (item) {
      if (item.count) {
        const data = {id: item.id}
        const result = merge(this.pagination, data)
        this.getTableData(result)
      }
      this.visibility = !this.visibility
    },
    // 返回
    back () {
      this.visibility = !this.visibility
    },
    detailHandle (index, row) {
      this.formData = row
      this.title1 = this.GLOBAL.DETAIL
      this.open()
      console.log('detail', index, row)
    },
    getDataElementData (row) {
      this.dataElementData = row
      this.$refs.dataElementDialog.open()
      this.title2 = this.GLOBAL.DETAIL
      console.log('getChildDetailData', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.back-btn {
  margin-bottom: 10px;
}
</style>
