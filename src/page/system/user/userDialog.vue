<!-- 新增编辑 -->
<template>
  <k-dialog
    ref="userDia"
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
      ref="userDetail"
      />
    <k-form
      v-else
      @submitHandle="submitHandle"
      ref="userForm"
      :form="form"
      :formProps="props"
      :rules="rules"
      :data="formData"
    />
    <!-- {{form}} -->
  </k-dialog>
</template>

<script>
import kDialog from 'components/_dialog/dialog'
import kDetail from 'components/_form/detail'
import kForm from 'components/_form/form'
import {sysUserDeptName, sysUserRole, sysUserTree} from 'js/api/system/user'
import {isMobile} from 'js/util/validate'
import formMixin from 'js/mixin/form'

export default {
  name: 'userDialog',
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
    let checkTelephone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('不能为空'))
      } else {
        if (!isMobile(value)) {
          callback(new Error('手机号错误'))
        }
        callback()
      }
    }
    return {
      formRef: 'userForm',
      dialogRef: 'userDia',
      form: {
        id: '',
        username: '',
        realname: '',
        deptName: '',
        roleId: '',
        email: '',
        telephone: '',
        // date: '',
        companyControl: []
      },
      props: [
        {
          label: '登录名',
          prop: 'username',
          inputType: 'input'
        },
        {
          label: '真实姓名',
          prop: 'realname',
          inputType: 'input'
        },
        {
          label: '所属单位',
          prop: 'deptName',
          inputType: 'select',
          options: []
        },
        {
          label: '选择角色',
          prop: 'roleId',
          inputType: 'select',
          options: []
        },
        {
          label: '邮箱',
          prop: 'email',
          inputType: 'input'
        },
        {
          label: '电话',
          prop: 'telephone',
          inputType: 'input'
        },
        {
          label: '管理部门',
          prop: 'companyControl',
          inputType: 'tree'
        }
      ],
      rules: {
        username: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        roleId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        email: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        telephone: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: checkTelephone, trigger: 'blur' }
        ]
      },
      oldRules: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getDeptName()
      this.getRole()
      this.getTree()
      this.oldRules = this.rules
    },
    // 所属单位数据
    getDeptName (data = {}) {
      sysUserDeptName(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('deptName', this.props, res.data)
        }
      })
    },
    // 选择角色数据
    getRole () {
      sysUserRole().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('roleId', this.props, res.data)
        }
      })
    },
    // 管理部门
    getTree () {
      sysUserTree().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('companyControl', this.props, res.data)
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle () {
      this.$nextTick(() => {
        if (this.title === this.GLOBAL.DETAIL) {
          this.$refs.userDetail.openInitTree('companyControl')
        } else {
          this.$refs.userForm.openInitTree('companyControl')
        }
      })

      if (this.title === this.GLOBAL.EDIT || this.title === this.GLOBAL.ADD) {
        this.clearValidate()
      }

      if (this.title === this.GLOBAL.EDIT) {
        this.validate()
      }
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      if (this.title === this.GLOBAL.EDIT || this.title === this.GLOBAL.ADD) {
        this.clearForm()
        this.$refs.userForm.clearTree('companyControl')
      }
    },
    // 确定
    confirmHandle () {
      this.$refs.userForm.submitHandle()
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
