<template>
  <div>
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      :label-width="labelWidth"
      class="form">
      <el-row>
        <template v-for="(data) in formProps">
          <!-- input -->
          <el-col
            :span="24 / column"
            v-if="data.inputType === 'input' && data.show == null ? true : data.show"
            :key="data.prop">
            <el-form-item
              :key="data.label"
              :label="data.label"
              :prop="hasProps(data.prop)"
              :ref="data.prop"
              >
              <el-input
                @blur="((e) => {inputBlurHandle(data.prop, e)})"
                @focus="((e) => {inputFocusHandle(data.prop, e)})"
                :readonly="data.readonly"
                clearable
                :suffix-icon="data.suffixIcon"
                :prefix-icon="data.prefixIcon"
                :disabled="data.disabled"
                v-model="form[data.prop]"
                :placeholder="data.placeholder || '请输入'">
              </el-input>
            </el-form-item>
          </el-col>
          <!-- radio -->
          <el-col
            :span="24 / column"
            v-else-if="data.inputType === 'radio' && data.show == null ? true : data.show"
            :key="data.prop">
            <el-form-item
              :ref="data.prop"
              :key="data.label"
              :label="data.label"
              :prop="hasProps(data.prop)"
              >
              <el-radio-group v-model="form[data.prop]" :disabled="data.disabled">
                <el-radio
                  @change="((val) => {radioChangeHandle(data.prop, val)})"
                  :disabled="item.disabled"
                  :label="data.defaultProps ? (data.defaultProps.id ? item[data.defaultProps.id] : item.id) : item.id"
                  v-for="item in data.options"
                  :border="data.border || false"
                  :key="data.defaultProps ? (data.defaultProps.id ? item[data.defaultProps.id] : item.id) : item.id">
                  {{data.defaultProps ? (data.defaultProps.label ? item[data.defaultProps.label] : item.label) : item.label}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <!-- checkbox -->
          <el-col
            :span="24 / column"
            v-else-if="data.inputType === 'checkbox' && data.show == null ? true : data.show"
            :key="data.prop">
            <el-form-item
              :ref="data.prop"
              :key="data.label"
              :label="data.label"
              :prop="hasProps(data.prop)"
              >
              <el-checkbox-group
                v-model="form[data.prop]"
                :disabled="data.disabled"
                @change="((val) => {checkboxChangeHandle(data.prop, val)})">
                <el-checkbox
                  :disabled="item.disabled"
                  :label="data.defaultProps ? (data.defaultProps.id ? item[data.defaultProps.id] : item.id) : item.id"
                  v-for="item in data.options"
                  :key="data.defaultProps ? (data.defaultProps.id ? item[data.defaultProps.id] : item.id) : item.id"
                  >
                  {{data.defaultProps ? (data.defaultProps.label ? item[data.defaultProps.label] : item.label) : item.label}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <!-- textarea -->
          <el-col
            :span="24 / column"
            v-else-if="data.inputType === 'textarea' && data.show == null ? true : data.show"
            :key="data.prop">
            <el-form-item
              :ref="data.prop"
              :key="data.label"
              :label="data.label"
              :prop="hasProps(data.prop)"
              >
                <el-input
                  :autosize="data.autosize || { minRows: 2, maxRows: 4}"
                  :disabled="data.disabled"
                  type="textarea"
                  :placeholder="data.placeholder || '请输入'"
                  v-model="form[data.prop]">
                </el-input>
            </el-form-item>
          </el-col>
          <!-- cascader -->
          <el-col
            :span="24 / column"
            v-else-if="data.inputType === 'cascader' && data.show == null ? true : data.show"
            :key="data.prop">
            <el-form-item
              :ref="data.prop"
              :key="data.label"
              :label="data.label"
              :prop="hasProps(data.prop)"
              >
                <el-cascader
                  clearable
                  :disabled="data.disabled"
                  :props="data.defaultProps || cascaderProps"
                  :placeholder="data.placeholder || '请选择'"
                  :filterable="data.filterable || false"
                  :change-on-select="data.changeOnSelect || false"
                  :show-all-levels="data.showAllLevels || true"
                  @change="((val) => {cascaderChangeHandle(data.prop, val)})"
                  style="width: 100%"
                  :expand-trigger="data.expandTrigger || 'click'"
                  :options="data.options"
                  v-model="form[data.prop]">
                </el-cascader>
            </el-form-item>
          </el-col>
          <!-- inputTree -->
          <el-col
            :span="24 / column"
            v-else-if="data.inputType === 'inputTree' && data.show == null ? true : data.show"
            :key="data.prop">
            <el-form-item
              :ref="data.prop"
              :key="data.label"
              :label="data.label"
              :prop="hasProps(data.prop)"
              >
                <div v-show="isReference(data.reference)">
                   <el-popover
                    v-model="data.visible"
                    placement="bottom-start"
                    width="400"
                    trigger="click">
                    <div class="max-height">
                      <el-tree
                        node-key="id"
                        @current-change="((a, b) => {treeCurrentChangeHandle(data, a, b)})"
                        :highlight-current="true"
                        :default-expand-all="true"
                        :expand-on-click-node="false"
                        :data="data.options"
                        :ref="data.prop + 'Tree'"
                        :props="data.defaultProps || defaultProps"/>
                    </div>
                    <el-input
                      v-model="form[data.prop]"
                      readonly
                      slot="reference"
                      :placeholder="data.placeholder || '请选择'"></el-input>
                  </el-popover>
                </div>
              <el-input
                v-model="form[data.prop]"
                readonly
                v-show="!isReference(data.reference)"
                :placeholder="data.placeholder || '请选择'"></el-input>
            </el-form-item>
          </el-col>
          <!-- tree -->
          <el-col
            :span="24"
            :key="data.prop"
            v-else-if="data.inputType === 'tree' && data.show == null ? true : data.show">
            <el-form-item
              :ref="data.prop"
              :key="data.label"
              :label="data.label"
              :prop="hasProps(data.prop)"
              >
              <el-tree
                :check-strictly="data.checkStrictly || false"
                :data="data.options"
                show-checkbox
                default-expand-all
                node-key="id"
                :ref="data.prop + 'Tree'"
                highlight-current
                @check="((a, b) => {checkHandle(data.prop, a, b)})"
                :props="data.defaultProps || treeDefaultProps">
              </el-tree>
            </el-form-item>
          </el-col>
          <!-- select -->
          <el-col
            :span="24 / column"
            v-else-if="data.inputType === 'select' && data.show == null ? true : data.show"
            :key="data.prop">
            <el-form-item
              :ref="data.prop"
              :key="data.label"
              :label="data.label"
              :prop="hasProps(data.prop)"
              >
              <el-select
                clearable
                :collapse-tags="data.collapseTags"
                @change="((val) => {selectChangeHandle(data.prop, val)})"
                :filterable="data.filterable || true"
                :disabled="data.disabled"
                :multiple="data.multiple"
                v-model="form[data.prop]"
                :placeholder="data.placeholder || '请选择'"
                style="width: 100%">
                <el-option
                  v-for="item in data.options"
                  :key="data.defaultProps ? (data.defaultProps.id ? item[data.defaultProps.id] : item.id) : item.id"
                  :label="data.defaultProps ? (data.defaultProps.label ? item[data.defaultProps.label] : item.label) : item.label"
                  :value="data.defaultProps ? (data.defaultProps.id ? item[data.defaultProps.id] : item.id) : item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- other -->
          <el-col
            :span="24 / column"
            v-else-if="data.inputType === 'other' && data.show == null ? true : data.show"
            :key="data.label"
            >
            <template v-if="data.editTemplate ? !data.editTemplate : (data.editTemplate == null ? true : data.editTemplate)">
              <el-form-item
                :ref="data.prop"
                :label="data.label"
                :prop="hasProps(data.prop)">
                <slot :name="data.prop + 'Form'"></slot>
              </el-form-item>
            </template>
            <template v-else>
              <slot :name="data.prop + 'Form'"></slot>
            </template>
          </el-col>
          <!-- upload -->
          <el-col
            :span="24 / column"
            v-else-if="data.inputType === 'upload' && data.show == null ? true : data.show"
            :key="data.prop">
            <el-form-item
              :ref="data.prop"
              :key="data.label"
              :label="data.label"
              :prop="hasProps(data.prop)">
              <div class="form-inline upload-container">
                <div class="upload-wrapper">
                  <span class="item ellipsis" v-for="file in form[data.prop]" :key="file.id">
                    {{file[data.filename]|| file.name}}
                    <i class="el-icon-error pointer icon" @click="removeFile(data.prop, file)"></i>
                  </span>
                </div>
                <el-upload
                  :with-credentials="uploadForm.withCredentials"
                  :accept="uploadForm.accept"
                  class="upload-form"
                  :show-file-list="false"
                  :action="uploadForm.action"
                  :on-remove="handleUploadRemove"
                  :multiple="uploadForm.multiple"
                  :limit="uploadForm.limit"
                  :on-success="((a, b) => {handleUploadSuccess(data.prop, a, b)})"
                  :on-exceed="handleUploadExceed"
                  :on-error="handleUploadError"
                  :file-list="form[data.prop]">
                  <el-button type="primary" class="upload-btn">上传</el-button>
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
          <!-- avatar -->
          <el-col
            :span="24"
            v-else-if="data.inputType === 'avatar' && data.show == null ? true : data.show"
            :key="data.prop">
            <el-form-item
            :ref="data.prop"
            :key="data.label"
            :label="data.label"
            :prop="hasProps(data.prop)"
            >
              <el-upload
                :data="{id: form.id}"
                class="avatar-uploader"
                :action="uploadForm.action"
                :show-file-list="false"
                :on-error="handleAvatarError"
                :on-success="((a, b) => {handleAvatarSuccess(data.prop, a, b)})"
                :before-upload="beforeAvatarUpload">
                <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-input  v-model="form[data.prop]" type="hidden"/>
           </el-form-item>
          </el-col>
          <!-- datePicker -->
          <el-col
            :span="24 / column"
            v-else-if="data.inputType === 'datePicker' && data.show == null ? true : data.show"
            :key="data.prop">
            <el-form-item
              :ref="data.prop"
              :key="data.label"
              :label="data.label"
              :prop="hasProps(data.prop)">
                <el-date-picker
                  :disabled="data.disabled"
                  :picker-options="data.pickerOptions"
                  @change="((a) => {datePickerChangeHandle(data.prop, a)})"
                  style="width: 100%;"
                  :range-separator="data.rangeSeparator ? data.rangeSeparator : dataPickerOption.rangeSeparator"
                  v-model="form[data.prop]"
                  :value-format="data.valueFormat || 'timestamp'"
                  :type="data.type ? data.type : dataPickerOption.type"
                  :placeholder="data.placeholder || '请选择'">
                </el-date-picker>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    {{form}}
  </div>
</template>
<script>
// import clonedeep from 'lodash/clonedeep'
import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
// import isNumber from 'lodash/isNumber'
// import isString from 'lodash/isString'
// import isPlainObject from 'lodash/isPlainObject'
// import isEmpty from 'lodash/isEmpty'
// import {resetObject} from 'js/util'
export default {
  name: 'kForm',
  props: {
    // 表单一行${column}个
    column: {
      type: Number,
      default: 1
    },
    // other类型数据存放位置
    otherData: {
      type: Object,
      default () {
        return {}
      }
    },
    // 上传配置
    upload: {
      type: Object,
      default () {
        return {
          // 上传路劲
          action: '/upload',
          // 是否支持多选文件
          multiple: true,
          // 最大允许上传个数
          limit: 3,
          // 接受上传的文件类型
          accept: ''
        }
      }
    },
    // 表单详情数据
    formProps: {
      type: Array,
      default () {
        return []
      }
    },
    // 表单名宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 规则
    rules: {
      type: Object,
      default () {
        return {}
      }
    },
    // 数据
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    // 表单字段
    form: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      cascaderProps: {
        label: 'label',
        value: 'id',
        children: 'children'
      },
      dataPickerOption: {
        rangeSeparator: '至',
        type: 'date' // week, year, dates, daterange
      },
      uploadForm: {
        // 上传路劲
        action: '/upload',
        // 是否支持多选文件
        multiple: true,
        // 最大允许上传个数
        limit: 3,
        // 接受上传的文件类型
        accept: '.jpg,.png,.jpeg'
      },
      // 配置选项 select
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 配置选项 tree
      treeDefaultProps: {
        children: 'children',
        label: 'label'
      },
      // 头像路劲
      avatarUrl: ''
    }
  },
  watch: {
    upload: {
      handler (newVal) {
        for (let key in newVal) {
          if (newVal[key]) {
            this.uploadForm[key] = newVal[key]
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    isReference (reference) {
      if (isBoolean(reference)) {
        if (reference) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    // 是否是数组
    isArray (val) {
      return isArray(val)
    },
    // 是否是必选
    hasProps (prop) {
      let rules = this.rules
      for (let key in rules) {
        if (prop === key && isArray(rules[key])) {
          return key
        }
      }
      return ''
    },
    // 表单提交
    submitHandle () {
      let data = this.form
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('submit!', data)
          this.$emit('submitHandle', data)
        } else {
          return false
        }
      })
    },
    // 表单验证
    validate () {
      this.$refs.ruleForm.validate()
    },
    // 表单去验证
    clearValidate () {
      this.$refs.ruleForm.clearValidate()
    },
    // 表单重置
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    // 上级菜单选择 inputtree
    treeCurrentChangeHandle (data, treeData, node) {
      this.form[data.prop] = data.defaultProps ? treeData[data.defaultProps.label] : treeData.label
      this.form[data.defaultProp] = treeData.id
      const index = this.formProps.findIndex((item) => {
        return item.prop === data.prop
      })
      if (index > -1) {
        this.formProps[index].visible = false
      }
    },
    // 当复选框被点击的时候触发 tree
    checkHandle (prop, checkedNodes, checkedKeys) {
      // console.log(prop, checkedNodes, checkedKeys)
      this.form[prop] = checkedKeys.checkedKeys
    },
    // 初始化tree
    initTree (prop, val = []) {
      prop = prop + 'Tree'
      this.$refs[prop][0].setCheckedKeys(val)
    },
    // 关闭弹窗时清空tree
    clearTree (prop) {
      this.initTree(prop)
    },
    // 打开弹窗记录数据tree
    openInitTree (prop) {
      let val = []
      if (this.form[prop]) {
        val = this.form[prop]
      }
      this.initTree(prop, val)
    },
    // 文件超出个数限制时
    handleUploadExceed (files, fileList) {
      this.$message.warning(`当前限制选择 ${this.uploadForm.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 文件列表移除文件时
    handleUploadRemove (file, fileList) {
      console.log(file, fileList)
    },
    // 文件上传失败
    handleUploadError (file, fileList) {
      this.$message.error('上传失败')
    },
    // 上传成功之后
    handleUploadSuccess (prop, res, file) {
    },
    // 图片上传成功之后获取图片地址
    handleAvatarSuccess (prop, res, file) {
      this.avatarUrl = URL.createObjectURL(file.raw)
    },
    // 头像上传失败
    handleAvatarError (files, fileList) {
      this.$message.error(`头像上传失败`)
    },
    // 头像上传前
    beforeAvatarUpload (file) {
      if (this.uploadForm && this.uploadForm.size) {
        const isLt = file.size / 1024 / 1024 < this.uploadForm.size
        if (!isLt) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt
      }
    },
    // 显示/隐藏
    toggleHandle (prop, status = true) {
      let ele = this.$refs[prop][0].$el
      if (status) {
        ele.style.display = ''
      } else {
        ele.style.display = 'none'
      }
    },
    // 级联
    cascaderChangeHandle (value, prop) {
      this.$emit(`${prop}CascaderChangeHandle`, value)
    },
    // select change事件
    selectChangeHandle (prop, val) {
      this.$emit(prop + 'SelectChangeHandle', val, prop)
    },
    // radio change事件
    radioChangeHandle (prop, val) {
      this.$emit(prop + 'RadioChangeHandle', val, prop)
    },
    // datePicker change事件
    datePickerChangeHandle (prop, val) {
      this.$emit(`${prop}DatePickerChangeHandle`, val, prop)
    },
    // 输入框blur事件
    inputBlurHandle (prop, e) {
      this.$emit(`${prop}InputBlurHandle`, e, prop)
    },
    // 输入框focus事件
    inputFocusHandle (prop, e) {
      this.$emit(`${prop}InputFocusHandle`, e, prop)
    },
    // checkbox chang事件
    checkboxChangeHandle (prop, val) {
      this.$emit(`${prop}CheckboxChangeHandle`, val, prop)
    },
    // 删除上传文件
    removeFile (prop, file) {
      this.form[prop] = this.form[prop].filter((item) => {
        return item.id !== file.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mt20 {
  margin-top: 20px;
}
.more {
  .el-col {
    margin-top: 25px;
  }
  .el-col:nth-child(1), .el-col:nth-child(2) {
    margin-top: 0;
  }
}
.upload-container {
  position: relative;
  .upload-wrapper {
    position: absolute;
    top: 0;
    right: 75px;
    left: 0;
    z-index: 10;
    height: 38px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    .item {
      position: relative;
      line-height: 30px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      padding: 0 20px 0 5px;
      margin-right: 5px;
      display: inline-block;
      max-width: 100px;
      height: 30px;
      margin-top: 5px;
      .icon {
        position: absolute;
        right: 4px;
        top: 8px;
        color: #ff0000;
      }
    }
  }
}
</style>
