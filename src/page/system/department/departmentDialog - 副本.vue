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
      labelWidth="110px"
      v-if="title === '详情'"
      :props="props"
      :data="form"
      />
    <el-form
      v-else
      :model="formData"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      class="rule-form">
      <el-form-item label="上级机构" prop="parentName">
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
              @current-change="parentIdCurrentChangeHandle"
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
      <el-form-item label="所属行政区划" prop="areaName">
        <el-popover
          ref="areaNamePopover"
          placement="bottom-start"
          width="400"
          trigger="click">
          <div class="max-height">
            <el-tree
              node-key="id"
              ref="areaNameTree"
              :default-checked-keys="defaultCheckedKeys"
              @current-change="areaNameCurrentChangeHandle"
              :highlight-current="true"
              :default-expand-all="true"
              :expand-on-click-node="false"
              :data="areaNameOptions"
              :props="defaultProps"/>
          </div>
        </el-popover>
        <el-input v-model="formData.areaName" readonly v-popover:areaNamePopover></el-input>
      </el-form-item>
      <el-form-item label="机构类别" prop="type">
        <el-select v-model="formData.type">
          <el-option
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机构编码" prop="code">
        <el-input v-model="formData.code"></el-input>
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
import {sysDepartmentType} from 'js/api/system/department'
import { sysCompartmentList } from 'js/api/system/compartment'
import {resetObject} from 'js/util'
import formMixin from 'js/mixin/form'
export default {
  name: 'departmentDialog',
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
      // 是否有详情页
      hasDetail: true,
      // 开关弹窗
      dialogVisible: false,
      formData: {
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
          prop: 'parentName'
        },
        {
          label: '名称',
          prop: 'name'
        },
        {
          label: '所属行政区划',
          prop: 'areaName'
        },
        {
          label: '机构类别',
          prop: 'type'
        },
        {
          label: '机构编码',
          prop: 'code'
        },
        {
          label: '排序',
          prop: 'sort'
        }
      ],
      rules: {
        parentName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '不能为空', trigger: 'blur' }
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
      },
      // 所属行政区划
      areaNameOptions: [],
      // 机构类别
      typeOptions: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultCheckedKeys: [1]
    }
  },
  watch: {
    title (newVal, oldVal) {
      if (newVal === this.GLOBAL.DETAIL) {
        this.hasDetail = true
      } else {
        this.hasDetail = false
      }
    },
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
      this.getType()
      this.getCompartmentList()
    },
    // 机构类别
    getType (data = {}) {
      sysDepartmentType(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.typeOptions = res.data
        }
      })
    },
    // 所属行政区划
    getCompartmentList (data = {}) {
      sysCompartmentList(data).then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.areaNameOptions = res.data
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
    parentIdCurrentChangeHandle (data, node) {
      this.formData.parentId = data.id
      this.formData.parentName = data.name
    },
    areaNameCurrentChangeHandle (data, node) {
      this.formData.areaId = data.id
      this.formData.areaName = data.name
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
