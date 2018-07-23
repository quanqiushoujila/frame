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
    <el-form
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
              @current-change="CurrentChangeHandle"
              :highlight-current="true"
              :default-expand-all="true"
              :expand-on-click-node="false"
              :data="parentIdOptions"
              :props="defaultProps"/>
          </div>
        </el-popover>
        <el-input v-model="formData.parentName" readonly v-popover:parentNamePopover></el-input>
      </el-form-item>
      <el-form-item label="区划名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="区划代码" prop="code">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="区划级别" prop="comLevel">
        <el-select v-model="formData.comLevel">
          <el-option
            v-for="item in comLevelOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
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
import {sysCompartmentList, sysCompartmentComLevel} from 'js/api/system/compartment'
import {resetObject} from 'js/util'
import formMixin from 'js/mixin/form'
const COMPARTMENT = '添加子级行政区划'

export default {
  name: 'compartmentDialog',
  mixins: [formMixin],
  components: {kDialog},
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
      hasDetail: false,
      // 开关弹窗
      dialogVisible: false,
      formData: {
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
          prop: 'parentName'
        },
        {
          label: '区划名称',
          prop: 'name'
        },
        {
          label: '区划代码',
          prop: 'code'
        },
        {
          label: '区划级别',
          prop: 'comLevel'
        },
        {
          label: '排序',
          prop: 'sort'
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
      },
      // 区划级别
      comLevelOptions: [],
      // 上级菜单
      parentIdOptions: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultCheckedKeys: [1]
    }
  },
  created () {
    this.init()
  },
  watch: {
    form (newVal) {
      for (let key in this.formData) {
        this.$set(this.formData, key, clonedeep(newVal[key]))
      }
    }
  },
  methods: {
    init () {
      this.getComLevel()
      this.getParentName()
    },
    getParentName () {
      sysCompartmentList().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.parentIdOptions = res.data
        }
      })
    },
    // 类型
    getComLevel (data = {}) {
      sysCompartmentComLevel(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.comLevelOptions = res.data
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle () {
      this.hasDetail = false
      this.$nextTick(() => {
        this.clearValidate()
      })
      if (this.title === COMPARTMENT) {
        resetObject(this.formData)
        this.formData.parentId = clonedeep(this.form.parentId)
        this.formData.parentName = clonedeep(this.form.parentName)
        console.log(this.formData)
      }
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      this.resetForm()
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
    CurrentChangeHandle (data, node) {
      this.formData.parentId = data.id
      this.formData.parentName = data.name
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
