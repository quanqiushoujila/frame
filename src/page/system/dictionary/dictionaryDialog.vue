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
    <k-form
      @submitHandle="submitHandle"
      ref="dictionaryForm"
      :form="form"
      :formProps="props"
      :rules="rules"
      :data="formData"
    />
  </k-dialog>
</template>

<script>
// import deepclone from 'lodash/deepclone'
import kDialog from 'components/_dialog/dialog'
import kForm from 'components/_form/form'
import {sysDictionaryType} from 'js/api/system/dictionary'
import {resetObject} from 'js/util'
import formMixin from 'js/mixin/form'
const DICTIONARY = '添加字典项'

export default {
  name: 'dictionaryDialog',
  mixins: [formMixin],
  components: {kDialog, kForm},
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
    },
    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
    checkStrictly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hasDetail: false,
      searchContent: {
        name: ''
      },
      form: {
        parentId: '',
        id: '',
        name: '',
        value: '',
        type: '',
        sort: ''
      },
      props: [
        {
          label: '字典名称',
          prop: 'name',
          inputType: 'input'
        },
        {
          label: '字典值',
          prop: 'value',
          inputType: 'input'
        },
        {
          label: '类型',
          prop: 'type',
          inputType: 'select'
        },
        {
          label: '排序',
          prop: 'sort',
          inputType: 'input'
        }
      ],
      rules: {
        value: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      // 类型数据
      typeOptions: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getType()
    },
    // 类型
    getType (data = {}) {
      sysDictionaryType(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('type', this.props, res.data)
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle () {
      if (this.title === this.GLOBAL.EDIT) {
        this.$nextTick(() => {
          this.$refs.dictionaryForm.validate()
        })
      }
      if (this.title === DICTIONARY) {
        // let parentId = clonedeep(this.formData.parentId)
        resetObject(this.formData)
        this.form.parentId = parentId
        // resetObject(this.form)
      }
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      this.$refs.dictionaryForm.resetForm()
      resetObject(this.form)
    },
    // 确定
    confirmHandle () {
      this.$refs.dictionaryForm.submitHandle()
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
.max-height {
  overflow: auto;
  min-height: 150px;
  max-height: 300px;
  .el-button {
    padding: 8px !important;
    margin: 8px 0 0 8px !important;
  }
}
</style>
