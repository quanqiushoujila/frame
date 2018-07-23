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
      <el-form-item label="上级菜单" prop="parentName">
        <el-popover
          ref="parentNamePopover"
          placement="bottom-start"
          width="400"
          trigger="click">
          <div class="max-height">
            <el-tree
              node-key="id"
              ref="parentNameTree"
              :default-checked-keys="defaultCheckedKeys"
              @current-change="menuListTreeCurrentChangeHandle"
              :highlight-current="true"
              :default-expand-all="true"
              :expand-on-click-node="false"
              :data="parentIdOptions"
              :props="defaultProps"/>
          </div>
        </el-popover>
        <el-input v-model="formData.parentName" readonly v-popover:parentNamePopover></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-popover
          ref="iconPopover"
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
        </el-popover>
        <el-input v-model="formData.icon" readonly v-popover:iconPopover></el-input>

      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="formData.type">
          <el-option
            filterable
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属模块" prop="moduleType">
        <el-select v-model="formData.moduleType">
          <el-option
            v-for="item in moduleTypeOptions"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限规则" prop="permission">
        <el-input v-model="formData.permission"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formData.sort"></el-input>
      </el-form-item>
    </el-form>
  </k-dialog>
</template>

<script>
import clonedeep from 'lodash/clonedeep'
import kDialog from 'components/_dialog/dialog'
import kDetail from 'components/_form/detail'
import {sysMenuType, sysMenuModuleType, sysMenuParentId} from 'js/api/system/menu'
import {resetObject} from 'js/util'
import icons from 'js/util/icon'
import formMixin from 'js/mixin/form'
export default {
  name: 'menuDialog',
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
    },
    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
    checkStrictly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 是否是详情页
      hasDetail: true,
      // 开关弹窗
      dialogVisible: false,
      formData: {
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
          prop: 'parentId'
        },
        {
          label: '名称',
          prop: 'name'
        },
        {
          label: '图标',
          prop: 'icon'
        },
        {
          label: '链接',
          prop: 'url'
        },
        {
          label: '类型',
          prop: 'type'
        },
        {
          label: '所属模块',
          prop: 'moduleType'
        },
        {
          label: '权限规则',
          prop: 'permission'
        },
        {
          label: '排序',
          prop: 'sort'
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
      },
      // 上级菜单数据
      parentIdOptions: [],
      // 类型数据
      typeOptions: [],
      // 所属模块数据
      moduleTypeOptions: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultCheckedKeys: [1]
    }
  },
  computed: {
    icons () {
      return icons
    }
  },
  watch: {
    form (newVal) {
      if (this.title === this.GLOBAL.ADDCHILD) {
        this.formData.parentId = clonedeep(newVal.parentId) + ''
        this.formData.parentName = clonedeep(newVal.parentName) + ''
      } else {
        for (let key in this.formData) {
          this.$set(this.formData, key, clonedeep(newVal[key]) + '')
        }
      }
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
          this.typeOptions = res.data
        }
      })
    },
    // 所属模块
    getModuleType () {
      sysMenuModuleType().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.moduleTypeOptions = res.data
        }
      })
    },
    // 上级菜单
    getParentId () {
      sysMenuParentId().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.parentIdOptions = res.data
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
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      if (!this.hasDetail) {
        this.resetForm()
      }
      resetObject(this.formData)
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
    // 上级菜单选择
    menuListTreeCurrentChangeHandle (data, node) {
      console.log(data)
      this.formData.parentId = data.id
      this.formData.parentName = data.label
    },
    // 图标选择
    iconChangeHandle (icon) {
      this.formData.icon = icon
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
  .el-button {
    padding: 8px !important;
    margin: 8px 0 0 8px !important;
  }
}
</style>
