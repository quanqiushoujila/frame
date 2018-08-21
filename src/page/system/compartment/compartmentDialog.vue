<!-- 新增编辑 -->
<template>
  <k-dialog
    ref="compartmentDia"
    :dialogVisible="dialogVisible"
    :title="title"
    :width="width"
    :isBtnGroup="isBtnGroup"
    @closeDialogHandle="closeDialogHandle"
    @openDialogHandle="openDialogHandle"
    @cancelHandle="cancelHandle"
    @confirmHandle="confirmHandle"
    >
    <k-form
      @submitHandle="submitHandle"
      ref="compartmentForm"
      :form="form"
      :formProps="props"
      :rules="rules"
      :data="formData"
    />
  </k-dialog>
</template>

<script>
// import clonedeep from 'lodash/clonedeep'
import kDialog from 'components/_dialog/dialog'
import kForm from 'components/_form/form'
import {sysCompartmentList, sysCompartmentComLevel} from 'js/api/system/compartment'
// import {resetObject} from 'js/util'
import formMixin from 'js/mixin/form'

const COMPARTMENT = '添加子级行政区划'

export default {
  name: 'compartmentDialog',
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
    }
  },
  data () {
    return {
      formRef: 'compartmentForm',
      dialogRef: 'compartmentDia',
      form: {
        parentId: '',
        parentName: '',
        id: '',
        name: '',
        comLevel: '',
        code: '',
        sort: ''
      },
      props: [
        {
          label: '上级菜单',
          prop: 'parentName',
          defaultProp: 'parentId',
          inputType: 'inputTree',
          defaultProps: {
            children: 'children',
            label: 'name'
          }
        },
        {
          label: '区划名称',
          prop: 'name',
          inputType: 'input'
        },
        {
          label: '区划代码',
          prop: 'code',
          inputType: 'input'
        },
        {
          label: '区划级别',
          prop: 'comLevel',
          inputType: 'select'
        },
        {
          label: '排序',
          prop: 'sort',
          inputType: 'input'
        }
      ],
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        comLevel: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getComLevel()
      this.getParentName()
    },
    getParentName () {
      sysCompartmentList().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('parentName', this.props, res.data)
        }
      })
    },
    // 类型
    getComLevel (data = {}) {
      sysCompartmentComLevel(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('comLevel', this.props, res.data)
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle () {
      if (this.title === COMPARTMENT) {
        this.$set(this.props[0], 'reference', false)
      }
      if (this.title === this.GLOBAL.EDIT || this.title === this.GLOBAL.ADD || this.title === COMPARTMENT) {
        this.clearValidate()
      }
      if (this.title === this.GLOBAL.EDIT) {
        this.validate()
      }
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      if (this.title === this.GLOBAL.EDIT || this.title === this.GLOBAL.ADD || this.title === COMPARTMENT) {
        this.clearForm()
      }
      if (this.title === COMPARTMENT) {
        this.$set(this.props[0], 'reference', true)
      }
    },
    // 确定
    confirmHandle () {
      this.$refs.compartmentForm.submitHandle()
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
