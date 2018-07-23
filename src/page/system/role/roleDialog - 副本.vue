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
      :data="form"
      />
    <el-form
      v-else
      :model="formData"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="rule-form">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input v-model="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-form>
        <el-form-item label="角色授权" label-width="100px">
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
import clonedeep from 'lodash/clonedeep'
import kDialog from 'components/_dialog/dialog'
import kDetail from 'components/_form/detail'
import { sysMenuList } from 'js/api/system/menu'
import {resetObject, toggleDisabled} from 'js/util'
import formMixin from 'js/mixin/form'
export default {
  name: 'roleDialog',
  mixins: [formMixin],
  components: {kDialog, kDetail},
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
    form: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
      checkStrictly: false,
      // 是否是详情页
      hasDetail: true,
      // 开关弹窗
      dialogVisible: false,
      formData: {
        id: '',
        name: '',
        remark: '',
        menuIds: ''
      },
      props: [
        {
          label: '角色名称',
          prop: 'name'
        },
        {
          label: '描述',
          prop: 'remark'
        }
      ],
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        prop: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      // 角色授权
      tree: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    form (newVal) {
      for (let key in this.formData) {
        this.$set(this.formData, key, clonedeep(newVal[key]))
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getMenuList()
    },
    getMenuList () {
      sysMenuList().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.tree = res.data
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle () {
      if (!this.hasDetail) {
        this.$nextTick(() => {
          this.clearValidate()
        })
      }
      if (this.title === this.GLOBAL.ADD) {
        this.initTree([])
      } else {
        console.log(this.form)
        this.initTree(this.form.menuIds)
        console.log(this.form.menuIds)
      }
      this.$nextTick(function () {
        if (this.title === this.GLOBAL.DETAIL) {
          this.tree = toggleDisabled(this.tree, true)
        } else {
          this.tree = toggleDisabled(this.tree, false)
        }
      })
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      console.log('close')
      if (!this.hasDetail) {
        this.resetForm()
      }
      resetObject(this.formData)

      this.initTree([])
    },
    // 确定
    confirmHandle () {
      let data = clonedeep(this.formData)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('submit!', data)
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    validate () {
      this.$refs['ruleForm'].validate()
    },
    clearValidate () {
      this.$refs['ruleForm'].clearValidate()
    },
    resetForm () {
      this.$refs['ruleForm'].resetFields()
    },
    checkHandle (heckedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      this.formData.menuIds = checkedKeys.checkedKeys
    },
    // 初始化tree
    initTree (val = []) {
      this.$nextTick(() => {
        this.formData.menuIds = val
        this.$refs.tree.setCheckedKeys(val)
      })
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
