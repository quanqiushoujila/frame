<template>
  <k-dialog
    :fullscreen="fullscreen"
    ref="dialogTwo"
    :title="title"
    :width="width"
    :isBtnGroup="isBtnGroup"
    @closeDialogHandle="closeDialogHandle"
    @openDialogHandle="openDialogHandle"
    @cancelHandle="cancelHandle"
    @confirmHandle="confirmHandle"
    >
    <k-detail
      :column="column"
      v-if="title === '信息项详情'"
      :props="props"
      :data="formData"
      ref="detailTwo">
    </k-detail>
    <k-form
      v-else
      labelWidth="100px"
      :column="column"
      @submitHandle="submitHandle"
      ref="formTwo"
      :form="form"
      :formProps="props"
      :rules="rules"
      :data="formData">
    </k-form>
  </k-dialog>
</template>
<script>
import clonedeep from 'lodash/clonedeep'
import kDialog from 'components/_dialog/dialog'
import kDetail from 'components/_form/detail'
import kForm from 'components/_form/form'
import formMixin from 'js/mixin/form'
const EDIT = '信息项编辑'
// const DETAIL = '信息项详情'
const ADD = '信息项新增'
export default {
  name: 'dialogTwo',
  components: {kDialog, kDetail, kForm},
  mixins: [formMixin],
  props: {
    // 弹窗名称
    title: {
      type: String,
      default: '提示'
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
      fullscreen: false,
      column: 1,
      formRef: 'formTwo',
      dialogRef: 'dialogTwo',
      form: {
        id: '',
        code: '',
        chineseName: '',
        englishName: ''
      },
      props: [
        {
          label: '内部标识符',
          prop: 'code',
          inputType: 'input'
        },
        {
          label: '中文名称',
          prop: 'chineseName',
          inputType: 'input'
        },
        {
          label: '英文名称',
          prop: 'englishName',
          inputType: 'input'
        }
      ],
      rules: {
        code: [
          { required: true, message: '不能为空', trigger: ['blur', 'change'] }
        ],
        chineseName: [
          { required: true, message: '不能为空', trigger: ['blur', 'change'] }
        ],
        englishName: [
          { required: true, message: '不能为空', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
    },
    // Dialog 打开的回调
    openDialogHandle () {
      if (this.title === EDIT || this.title === ADD) {
        this.clearValidate()
      }

      if (this.title === EDIT) {
        this.validate()
      }
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      if (this.title === EDIT || this.title === ADD) {
        this.clearForm()
      }
    },
    submitHandle (data) {
      this.$root.Bus.$emit('dataElementData', clonedeep(data), this.title)
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
