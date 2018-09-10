<!-- 新增编辑 -->
<template>
  <k-dialog
    ref="departmentDia"
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
      labelWidth="110px"
      v-if="title === '详情'"
      :props="props"
      :data="formData"
      />
    <k-form
      v-else
      @submitHandle="submitHandle"
      ref="departmentForm"
      :form="form"
      :formProps="props"
      :rules="rules"
      :data="formData"
      labelWidth="110px"
    />
  </k-dialog>
</template>

<script>
import kDialog from 'components/_dialog/dialog'
import kDetail from 'components/_form/detail'
import kForm from 'components/_form/form'
import {sysDepartmentType} from 'js/api/system/department'
import { sysCompartmentList } from 'js/api/system/compartment'
import formMixin from 'js/mixin/form'
export default {
  name: 'departmentDialog',
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
    },
    // 上级机构
    parentIdOptions: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      formRef: 'departmentForm',
      dialogRef: 'departmentDia',
      form: {
        id: '',
        name: '',
        parentId: '',
        parentName: '',
        code: '',
        areaId: '',
        areaName: '',
        level: '',
        type: '',
        sort: ''
      },
      props: [
        {
          label: '上级机构',
          prop: 'parentName',
          defaultProp: 'parentId',
          inputType: 'inputTree',
          defaultProps: {
            children: 'children',
            label: 'name'
          },
          visible: false
        },
        {
          label: '名称',
          prop: 'name',
          inputType: 'input'
        },
        {
          label: '所属行政区划',
          prop: 'areaName',
          defaultProp: 'areaId',
          inputType: 'inputTree',
          defaultProps: {
            children: 'children',
            label: 'name'
          },
          visible: false
        },
        {
          label: '机构类别',
          prop: 'type',
          inputType: 'select'
        },
        {
          label: '机构编码',
          prop: 'code',
          inputType: 'input'
        },
        {
          label: '排序',
          prop: 'sort',
          inputType: 'input'
        }
      ],
      rules: {
        parentName: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        type: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        code: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    parentIdOptions: {
      handler (newVal) {
        if (newVal && newVal.length > 0) {
          this.setOptions('parentName', this.props, newVal)
        }
      },
      immediate: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getType()
      this.getCompartmentList()
    },
    // 机构类别
    getType (data = {}) {
      sysDepartmentType(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('type', this.props, res.data)
        }
      })
    },
    // 所属行政区划
    getCompartmentList (data = {}) {
      sysCompartmentList(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('areaName', this.props, res.data)
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle () {
      if (this.title === this.GLOBAL.EDIT || this.title === this.GLOBAL.ADD) {
        this.clearValidate('departmentForm')
      }
      if (this.title === this.GLOBAL.EDIT) {
        this.validate('departmentForm')
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
      this.$refs.departmentForm.submitHandle()
    },
    submitHandle (data) {
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
