<!-- 新增编辑 -->
<template>
  <k-dialog
    ref="timeDia"
    :dialogVisible="dialogVisible"
    :title="title"
    :width="width"
    :isBtnGroup="isBtnGroup"
    @closeDialogHandle="closeDialogHandle"
    @openDialogHandle="openDialogHandle"
    @cancelHandle="cancelHandle"
    @confirmHandle="confirmHandle"
    >
    <k-detail
      v-if="title === '详情'"
      :props="props"
      :data="formData"
      />
    <k-form
      v-else
      @submitHandle="submitHandle"
      ref="timeForm"
      :form="form"
      :formProps="props"
      :rules="rules"
      :data="formData"
    />
  </k-dialog>
</template>

<script>
import kDialog from 'components/_dialog/dialog'
import kDetail from 'components/_form/detail'
import kForm from 'components/_form/form'
import formMixin from 'js/mixin/form'
export default {
  name: 'timeDialog',
  mixins: [formMixin],
  components: {kDialog, kDetail, kForm},
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
      formRef: 'timeForm',
      dialogRef: 'timeDia',
      form: {
        jobId: '',
        beanName: '',
        methodName: '',
        params: '',
        cronExpression: '',
        remark: ''
      },
      props: [
        {
          prop: 'beanName',
          label: 'bean名称',
          inputType: 'input'
        },
        {
          prop: 'methodName',
          label: '方法名称',
          inputType: 'input'
        },
        {
          prop: 'params',
          label: '参数',
          inputType: 'input'
        },
        {
          prop: 'cronExpression',
          label: 'cron表达式',
          inputType: 'input'
        },
        {
          prop: 'remark',
          label: '备注',
          inputType: 'input'
        }
      ],
      rules: {
        beanName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        methodName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        cronExpression: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // Dialog 打开的回调
    openDialogHandle () {
      if (this.title === this.GLOBAL.EDIT) {
        this.validate()
      }
      if (this.title === this.GLOBAL.EDIT || this.title === this.GLOBAL.ADD) {
        this.clearValidate()
      }
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      if (this.title === this.GLOBAL.EDIT || this.title === this.GLOBAL.ADD) {
        this.clearForm()
      }
    },
    // 确定
    confirmHandle () {
      this.$refs.timeForm.submitHandle()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
