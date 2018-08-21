<!-- 新增编辑 -->
<template>
  <k-dialog
    ref="roleDia"
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
      ref="roleDetail"
      v-if="title === '详情'"
      :props="props"
      :data="formData"
      />
    <k-form
      v-else
      @submitHandle="submitHandle"
      ref="roleForm"
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
import { sysMenuList } from 'js/api/system/menu'
import formMixin from 'js/mixin/form'
export default {
  name: 'roleDialog',
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
      formRef: 'roleForm',
      dialogRef: 'roleDia',
      form: {
        id: '',
        name: '',
        remark: '',
        menuIds: []
      },
      props: [
        {
          label: '角色名称',
          prop: 'name',
          inputType: 'input'
        },
        {
          label: '描述',
          prop: 'remark',
          inputType: 'textarea'
        },
        {
          label: '角色授权',
          prop: 'menuIds',
          inputType: 'tree',
          defaultProps: {
            children: 'children',
            label: 'name'
          }
        }
      ],
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        prop: [
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
      this.getMenuList()
    },
    getMenuList () {
      sysMenuList().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('menuIds', this.props, res.data)
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle () {
      this.$nextTick(() => {
        if (this.title === this.GLOBAL.DETAIL) {
          this.$refs.roleDetail.openInitTree('menuIds')
        } else {
          this.$refs.roleForm.openInitTree('menuIds')
        }
      })

      if (this.title === this.GLOBAL.EDIT || this.title === this.GLOBAL.ADD) {
        this.clearValidate('roleForm')
      }

      if (this.title === this.GLOBAL.EDIT) {
        this.validate('roleForm')
      }
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      if (this.title === this.GLOBAL.EDIT || this.title === this.GLOBAL.ADD) {
        this.clearForm('roleForm')
        this.$refs.roleForm.clearTree('menuIds')
      }
    },
    // 确定
    confirmHandle () {
      this.$refs.roleForm.submitHandle()
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
