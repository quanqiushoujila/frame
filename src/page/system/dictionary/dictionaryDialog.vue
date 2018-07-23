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
      <el-form-item label="字典名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="字典值" prop="value">
        <el-input v-model="formData.value"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="formData.type">
          <el-option
            v-for="item in typeOptions"
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
import {sysDictionaryType} from 'js/api/system/dictionary'
import {resetObject} from 'js/util'
import formMixin from 'js/mixin/form'
const DICTIONARY = '添加字典项'

export default {
  name: 'dictionaryDialog',
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
    },
    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
    checkStrictly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchContent: {
        name: ''
      },
      hasDetail: false,
      // 开关弹窗
      dialogVisible: false,
      formData: {
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
          prop: 'name'
        },
        {
          label: '字典值',
          prop: 'value'
        },
        {
          label: '类型',
          prop: 'type'
        },
        {
          label: '排序',
          prop: 'sort'
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
  watch: {
    form (newVal) {
      for (let key in this.formData) {
        this.$set(this.formData, key, clonedeep(newVal[key]))
      }
    }
  },
  methods: {
    init () {
      this.getType()
    },
    // 类型
    getType (data = {}) {
      sysDictionaryType(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.typeOptions = res.data
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle () {
      this.hasDetail = false
      this.$nextTick(() => {
        this.clearValidate()
      })
      if (this.title === DICTIONARY) {
        resetObject(this.formData)
        this.formData.parentId = clonedeep(this.form.parentId)
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
