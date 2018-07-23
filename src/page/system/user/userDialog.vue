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
      ref="userForm"
      :form="form"
      :formProps="props"
      :rules="rules"
      :data="formData"
    />
    <div>
      <el-form>
        <el-form-item label="管理部门" label-width="100px">
          <el-tree
            :check-strictly="checkStrictly"
            :data="tree"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            @check="checkHandle"
            :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
    </div>
  </k-dialog>
</template>

<script>
import kDialog from 'components/_dialog/dialog'
import kDetail from 'components/_form/detail'
import kForm from 'components/_form/form'
import {sysUserDeptName, sysUserRole, sysUserTree} from 'js/api/system/user'
import {isMobile} from 'js/util/validate'
import {resetObject} from 'js/util'
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
      // 是否有详情页
      hasDetail: true,
      // 开关弹窗
      dialogVisible: false,
      form: {
        id: '',
        username: '',
        realname: '',
        deptName: '',
        roleId: '',
        email: '',
        telephone: '',
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
      // 管理部门
      tree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
      checkStrictly: true
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
    },
    // 所属单位数据
    getDeptName (data = {}) {
      sysUserDeptName(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.props.forEach((item) => {
            if (item.prop === 'deptName') {
              item.options = res.data
              return false
            }
          })
        }
      })
    },
    // 选择角色数据
    getRole () {
      sysUserRole().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.props.forEach((item) => {
            if (item.prop === 'roleId') {
              item.options = res.data
              return false
            }
          })
        }
      })
    },
    // 管理部门
    getTree () {
      sysUserTree().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.tree = res.data
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle () {
      this.$nextTick(() => {
        if (this.title === this.GLOBAL.ADD) {
          this.initTree([])
        } else {
          this.initTree(this.form.companyControl)
        }
      })
      if (this.title === this.GLOBAL.EDIT) {
        setTimeout(() => {
          this.$refs.userForm.validate()
        }, 10)
      }
      if (!this.hasDetail) {
        this.$nextTick(() => {
          this.$refs.userForm.clearValidate()
        })
      }
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      if (!this.hasDetail) {
        this.$refs.userForm.resetForm()
      }
      this.initTree([])
      resetObject(this.form)
    },
    // 确定
    confirmHandle () {
      this.$refs.userForm.submitHandle()
    },
    submitHandle () {
      this.close()
    },
    // 初始化tree
    initTree (val = []) {
      this.formData.companyControl = val
      // this.$set(this.formData, 'companyControl', val)
      this.$refs.tree.setCheckedKeys(val)
    },
    checkHandle (heckedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      this.formData.companyControl = checkedKeys.checkedKeys
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
