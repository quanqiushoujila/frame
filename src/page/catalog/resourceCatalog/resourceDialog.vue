<template>
  <k-dialog
    ref="resourcesDia"
    :dialogVisible="dialogVisible"
    :title="title"
    :width="width"
    :isBtnGroup="isBtnGroup"
    @closeDialogHandle="closeDialogHandle"
    @openDialogHandle="openDialogHandle"
    >
    <k-detail
      labelWidth="110px"
      class="detail"
      :props="props"
      :data="formData"
      />
    <k-table
      @detailHandle="detailHandle"
      :table="table"/>
  </k-dialog>
</template>
<script>
// import clonedeep from 'lodash/clonedeep'
import kDialog from 'components/_dialog/dialog'
import kDetail from 'components/_form/detail'
import kTable from 'components/_table/table'
import formMixin from 'js/mixin/form'
export default {
  name: 'resourceDialog',
  mixins: [formMixin],
  components: {kDialog, kDetail, kTable},
  props: {
    // 弹窗名称
    title: {
      type: String,
      default: '详情'
    },
    // dialog大小:large, middle, small, mini
    width: {
      type: String,
      default: 'middle'
    },
    // 表单数据
    formData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      dialogRef: 'resourcesDia',
      props: [
        {
          label: '信息资源编码',
          prop: 'code'
        },
        {
          label: '信息资源名称',
          prop: 'nameCn'
        },
        {
          label: '信息资源英文名',
          prop: 'nameEn'
        },
        {
          label: '所属系统',
          prop: 'sysId'
        },
        {
          label: '信息资源提供方',
          prop: 'deptName'
        },
        {
          label: '摘要',
          prop: 'summary'
        },
        [
          {
            label: '格式分类',
            prop: 'formatType1'
          },
          {
            label: '格式分类',
            prop: 'formatType2'
          }
        ],
        {
          label: '基础资源分类',
          prop: 'classify'
        },
        {
          label: '主题资源分类',
          prop: 'topicClassify'
        },
        {
          label: '数据表英文名称',
          prop: 'tbName'
        },
        {
          label: '更新频率',
          prop: 'updateFrequency'
        },
        {
          label: '对接方式',
          prop: 'buttMode'
        },
        {
          label: '提交日期',
          prop: 'releaseDate'
        },
        {
          label: '排序',
          prop: 'sort'
        }
      ],
      table: {
        loading: false,
        // table数据
        data: [],
        // table 表头
        tr: [
          {
            prop: 'nameCn',
            label: '信息项名称'
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
          hasPagination: false
        }
      }
    }
  },
  watch: {
    formData: {
      handler (newVal) {
        if (newVal.eleList) {
          this.table.data = newVal.eleList
        }
      },
      deep: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {},
    closeDialogHandle () {},
    openDialogHandle () {
      this.isBtnGroup = false
    },
    detailHandle (index, row) {
      this.$emit('dataElementData', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  margin-bottom: 10px;
}
</style>
