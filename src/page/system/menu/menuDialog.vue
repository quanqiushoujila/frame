<!-- 新增编辑 -->
<template>
  <k-dialog
    ref="menuDia"
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
      ref="menuForm"
      :form="form"
      :formProps="props"
      :rules="rules"
      :data="formData"
    >
    <div slot="iconForm">
      <el-popover
        v-model="iconVisible"
        placement="top-start"
        width="400"
        trigger="click">
        <div class="max-height">
          <el-button
            @click="iconChangeHandle(item)"
            size="mini"
            v-for="(item, index) in icons"
            :key="index" >
            <i class="iconfont" :class="item"></i>
        </el-button>
        </div>
        <el-input v-model="form.icon" readonly slot="reference"></el-input>
      </el-popover>
    </div>
    </k-form>
  </k-dialog>
</template>

<script>
// import clonedeep from 'lodash/clonedeep'
import kDialog from 'components/_dialog/dialog'
import kDetail from 'components/_form/detail'
import kForm from 'components/_form/form'
import {sysMenuType, sysMenuModuleType, sysMenuParentId} from 'js/api/system/menu'
import icons from 'js/util/icon'
import formMixin from 'js/mixin/form'
const ADDCHILD = '添加子级菜单'
export default {
  name: 'menuDialog',
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
    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
    checkStrictly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formRef: 'menuForm',
      dialogRef: 'menuDia',
      iconVisible: false,
      form: {
        id: '',
        parentName: '',
        parentId: '',
        name: '',
        icon: '',
        url: '',
        type: '',
        moduleType: '',
        permission: '',
        sort: ''
      },
      props: [
        {
          label: '上级菜单',
          prop: 'parentName',
          defaultProp: 'parentId',
          inputType: 'inputTree',
          visible: false
        },
        {
          label: '名称',
          prop: 'name',
          inputType: 'input'
        },
        {
          label: '图标',
          prop: 'icon',
          inputType: 'other'
        },
        {
          label: '链接',
          prop: 'url',
          inputType: 'input'
        },
        {
          label: '类型',
          prop: 'type',
          inputType: 'select'
        },
        {
          label: '所属模块',
          prop: 'moduleType',
          inputType: 'select'
        },
        {
          label: '权限规则',
          prop: 'permission',
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
        icon: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        moduleType: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        permission: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    icons () {
      return icons
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getModuleType()
      this.getParentId()
      this.getParentId()
      this.getType()
    },
    // 类型
    getType (data = {}) {
      sysMenuType(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('type', this.props, res.data)
        }
      })
    },
    // 所属模块
    getModuleType () {
      sysMenuModuleType().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('moduleType', this.props, res.data)
        }
      })
    },
    // 上级菜单
    getParentId () {
      sysMenuParentId().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('parentName', this.props, res.data)
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle () {
      if (this.title === this.GLOBAL.ADDCHILD) {
        this.$set(this.props[0], 'reference', false)
      } else {
        if (this.title === this.GLOBAL.EDIT) {
          this.validate()
        }
      }
      if (this.title === this.GLOBAL.ADD || this.title === ADDCHILD) {
        this.clearValidate()
      }
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      if (this.title === this.GLOBAL.EDIT || this.title === this.GLOBAL.ADD || this.title === this.GLOBAL.ADDCHILD) {
        this.clearForm()
      }
      if (this.title === this.GLOBAL.ADDCHILD) {
        this.$set(this.props[0], 'reference', true)
      }
    },
    // 确定
    confirmHandle () {
      this.$refs.menuForm.submitHandle()
    },
    iconChangeHandle (icon) {
      this.$set(this.form, 'icon', icon)
      this.iconVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.max-height {
  .el-button {
    padding: 8px !important;
    margin: 8px 0 0 8px !important;
  }
}
</style>
