<!-- 新增编辑 -->
<template>
  <k-dialog
    :dialogVisible="dialogVisible"
    :title="title"
    :width="width"
    :hasDetail="hasDetail"
    @beforeCloseHandle="beforeCloseHandle"
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
import {resetObject} from 'js/util'
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
      // 是否有详情页
      hasDetail: true,
      // 开关弹窗
      dialogVisible: false,
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
      if (this.title === '编辑') {
        setTimeout(() => {
          this.$refs.timeForm.validate()
        }, 10)
      }
      if (!this.hasDetail) {
        this.$nextTick(() => {
          this.$refs.timeForm.clearValidate()
        })
      }
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      if (!this.hasDetail) {
        this.$refs.timeForm.resetForm()
      }
      resetObject(this.form)
    },
    // 确定
    confirmHandle () {
      this.$refs.timeForm.submitHandle()
    },
    submitHandle () {
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-form {
  .el-select, .el-cascader {
    width: 100%;
  }
}
</style>
