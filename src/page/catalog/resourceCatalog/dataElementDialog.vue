<template>
  <k-dialog
    ref="dataElementDia"
    :dialogVisible="dialogVisible"
    :title="title"
    :width="width"
    :isBtnGroup="isBtnGroup"
    @closeDialogHandle="closeDialogHandle"
    @openDialogHandle="openDialogHandle"
    >
    <k-detail
      labelWidth="130px"
      class="detail"
      :props="props"
      :data="formData"
      />
  </k-dialog>
</template>
<script>
import kDialog from 'components/_dialog/dialog'
import kDetail from 'components/_form/detail'
import formMixin from 'js/mixin/form'
export default {
  name: 'resourcesDialog',
  mixins: [formMixin],
  components: {kDialog, kDetail},
  props: {
    // 弹窗名称
    title: {
      type: String,
      default: '信息项详情'
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
      dialogRef: 'dataElementDia',
      props: [
        {
          label: '中文名称',
          prop: 'nameCn'
        },
        {
          label: '英文名称',
          prop: 'nameEn'
        },
        {
          label: '数据类型',
          prop: 'dataType'
        },
        {
          label: '数据长度',
          prop: 'length'
        },
        {
          label: '小数位',
          prop: 'decimals'
        },
        {
          label: '共享类型',
          prop: 'shareType'
        },
        {
          label: '共享条件',
          prop: 'shareCondition'
        },
        {
          label: '共享方式',
          prop: 'shareMode1'
        },
        {
          label: '是否向全社会开放',
          prop: 'isOpen'
        }
      ]
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {

    },
    closeDialogHandle () {

    },
    openDialogHandle () {
      this.isBtnGroup = false
    },
    detailHandle (index, row) {
      this.$emit('detailData', row)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
