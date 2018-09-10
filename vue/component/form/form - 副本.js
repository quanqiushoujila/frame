var kForm = Vue.extend({
  template:
    '<div>' +
    '  <el-form' +
    '    :model="forms"' +
    '    :rules="rules"' +
    '    ref="ruleForm"' +
    '    :label-width="labelWidth"' +
    '    class="form">' +
    '    <template v-for="data in formProps">' +
    '      <!-- input -->' +
    '      <el-form-item' +
    '        :key="data.label"' +
    '        :label="data.label"' +
    '        :prop="hasProps(data.prop)"' +
    '        :ref="data.prop"' +
    '        v-if="data.inputType === \'input\' && data.show == null ? true : data.show">' +
    '        <el-input' +
    '          :disabled="data.disabled"' +
    '          v-model="forms[data.prop]"' +
    '          :placeholder="data.placeholder">' +
    '        </el-input>' +
    '      </el-form-item>' +
    '      <!-- radio -->' +
    '      <el-form-item' +
    '        :ref="data.prop"' +
    '        :key="data.label"' +
    '        :label="data.label"' +
    '        :prop="hasProps(data.prop)"' +
    '        v-else-if="data.inputType === \'radio\' && data.show == null ? true : data.show">' +
    '        <el-radio-group v-model="forms[data.prop]">' +
    '          <el-radio' +
    '            @change="((val) => {radioChangeHandle(data.prop, val)})"' +
    '            :disabled="item.disabled"' +
    '            v-model="radio"' +
    '            :label="item.id"' +
    '            v-for="item in data.options"' +
    '            :key="item.id">' +
    '            {{item.name}}' +
    '          </el-radio>' +
    '        </el-radio-group>' +
    '      </el-form-item>' +
    '      <!-- checkbox -->' +
    '      <el-form-item' +
    '        :ref="data.prop"' +
    '        :key="data.label"' +
    '        :label="data.label"' +
    '        :prop="hasProps(data.prop)"' +
    '        v-else-if="data.inputType === \'checkbox\' && data.show == null ? true : data.show">' +
    '        <el-checkbox-group v-model="forms[data.prop]">' +
    '          <el-checkbox' +
    '            :disabled="data.disabled"' +
    '            :label="item.label"' +
    '            :name="forms[data.prop]"' +
    '            v-for="item in data.options"' +
    '            :key="item.id"' +
    '            >' +
    '          </el-checkbox>' +
    '        </el-checkbox-group>' +
    '      </el-form-item>' +
    '      <!-- textarea -->' +
    '      <el-form-item' +
    '        :ref="data.prop"' +
    '        :key="data.label"' +
    '        :label="data.label"' +
    '        :prop="hasProps(data.prop)"' +
    '        v-else-if="data.inputType === \'textarea\' && data.show == null ? true : data.show">' +
    '          <el-input' +
    '            :disabled="data.disabled"' +
    '            type="textarea"' +
    '            :placeholder="data.placeholder"' +
    '            v-model="forms[data.prop]">' +
    '          </el-input>' +
    '      </el-form-item>' +
    '      <!-- cascader -->' +
    '      <el-form-item' +
    '        :ref="data.prop"' +
    '        :key="data.label"' +
    '        :label="data.label"' +
    '        :prop="hasProps(data.prop)"' +
    '        v-else-if="data.inputType === \'cascader\' && data.show == null ? true : data.show">' +
    '          <el-date-picker' +
    '            :change-on-select="data.changeOnSelect"' +
    '            filterable' +
    '            :disabled="data.disabled"' +
    '            style="width: 100%;"' +
    '            v-model="forms[data.prop]"' +
    '            type="date"' +
    '            :placeholder="data.placeholder">' +
    '          </el-date-picker>' +
    '      </el-form-item>' +
    '      <!-- inputTree -->' +
    '      <el-form-item' +
    '        :ref="data.prop"' +
    '        :key="data.label"' +
    '        :label="data.label"' +
    '        :prop="hasProps(data.prop)"' +
    '        v-else-if="data.inputType === \'inputTree\' && data.show == null ? true : data.show">' +
    '         <div v-show="isReference(data.reference)">' +
    '         <el-popover' +
    '          v-model="data.visible"' +
    '          placement="bottom-start"' +
    '          width="400"' +
    '          trigger="click">' +
    '          <div class="max-height">' +
    '            <el-tree' +
    '              node-key="id"' +
    '              @current-change="((a, b) => {treeCurrentChangeHandle(data, a, b)})"' +
    '              :highlight-current="true"' +
    '              :default-expand-all="true"' +
    '              :expand-on-click-node="false"' +
    '              :data="data.options"' +
    '              :ref="data.prop"' +
    '              :props="data.defaultProps || defaultProps"/>' +
    '          </div>' +
    '          <el-input' +
    '            v-model="forms[data.prop]"' +
    '            readonly' +
    '            slot="reference"' +
    '            :placeholder="data.placeholder"></el-input>' +
    '        </el-popover>' +
    '        </div>' +
    '        <el-input' +
    '            v-model="forms[data.prop]"' +
    '            readonly' +
    '            v-show="!isReference(data.reference)"' +
    '            :placeholder="data.placeholder"></el-input>' +
    '      </el-form-item>' +
    '      <!-- tree -->' +
    '      <el-form-item' +
    '        :ref="data.prop"' +
    '        :key="data.label"' +
    '        :label="data.label"' +
    '        :prop="hasProps(data.prop)"' +
    '        v-else-if="data.inputType === \'tree\' && data.show == null ? true : data.show">' +
    '        <el-tree' +
    '          :check-strictly="data.checkStrictly || false"' +
    '          :data="data.options"' +
    '          show-checkbox' +
    '          default-expand-all' +
    '          node-key="id"' +
    '          :ref="data.prop + \'Tree\'"' +
    '          highlight-current' +
    '          @check="((a, b) => {checkHandle(data.prop, a, b)})"' +
    '          :props="data.defaultProps || treeDefaultProps">' +
    '        </el-tree>' +
    '      </el-form-item>' +
    '      <!-- 单个 select -->' +
    '      <el-form-item' +
    '        :ref="data.prop"' +
    '        :key="data.label"' +
    '        :label="data.label"' +
    '        :prop="hasProps(data.prop)"' +
    '        v-else-if="!isArray(data) && data.inputType === \'select\' && data.show == null ? true : data.show">' +
    '        <el-select' +
    '          @change="((val) => {selectChangeHandle(data.prop, val)})"' +
    '          filterable' +
    '          :disabled="data.disabled"' +
    '          :multiple="data.multiple"' +
    '          v-model="forms[data.prop]"' +
    '          :placeholder="data.placeholder"' +
    '          style="width: 100%">' +
    '          <el-option' +
    '            v-for="item in data.options"' +
    '            :key="item.id"' +
    '            :label="item.label"' +
    '            :value="item.id">' +
    '          </el-option>' +
    '        </el-select>' +
    '      </el-form-item>' +
    '      <!-- 多个 select -->' +
    '      <el-form-item' +
    '        class="more"' +
    '        :key="data[0].label"' +
    '        :label="data[0].label"' +
    '        v-else-if="isArray(data) && data[0].inputType === \'select\' && data.show == null ? true : data.show">' +
    '        <el-col' +
    '          :span="12"' +
    '          v-for="select in data"' +
    '          :key="select.label">' +
    '          <el-form-item :prop="hasProps(select.prop)">' +
    '            <el-select' +
    '              filterable' +
    '              :disabled="select.disabled"' +
    '              v-model="forms[select.prop]"' +
    '              :placeholder="select.placeholder"' +
    '              style="width: 100%">' +
    '              <el-option' +
    '                v-for="item in select.options"' +
    '                :key="item.id"' +
    '                :label="item.label"' +
    '                :value="item.id">' +
    '              </el-option>' +
    '            </el-select>' +
    '          </el-form-item>' +
    '        </el-col>' +
    '      </el-form-item>' +
    '      <!-- other -->' +
    '      <el-form-item' +
    '        :ref="data.prop"' +
    '        :key="data.label"' +
    '        :label="data.label"' +
    '        :prop="hasProps(data.prop)"' +
    '         v-else-if="data.inputType === \'other\' && data.show == null ? true : data.show">' +
    '        <slot :name="data.prop + \'Form\'"></slot>' +
    '      </el-form-item>' +
    '      <!-- upload -->' +
    '      <el-form-item' +
    '        :ref="data.prop"' +
    '        :key="data.label"' +
    '        :label="data.label"' +
    '        :prop="hasProps(data.prop)"' +
    '        v-else-if="data.inputType === \'upload\' && data.show == null ? true : data.show">' +
    '        <el-upload' +
    '          :accept="uploadForm.accept"' +
    '          class="upload-form"' +
    '          :action="uploadForm.action"' +
    '          :on-remove="handleUploadRemove"' +
    '          :multiple="uploadForm.multiple"' +
    '          :limit="uploadForm.limit"' +
    '          :on-success="((a, b) => {handleUploadSuccess(data.prop, a, b)})"' +
    '          :on-exceed="handleUploadExceed"' +
    '          :on-error="handleUploadError"' +
    '          :file-list="forms[data.prop]">' +
    '          <div class="form-inline" style="padding-right: 75px;">' +
    '            <el-input' +
    '              readonly' +
    '              style="width: 100%"' +
    '              v-model="forms[data.prop]"' +
    '              :placeholder="data.placeholder">' +
    '            </el-input>' +
    '            <el-button type="primary" class="upload-btn">上传</el-button>' +
    '          </div>' +
    '        </el-upload>' +
    '      </el-form-item>' +
    '      <!-- avatar -->' +
    '      <el-form-item' +
    '        :ref="data.prop"' +
    '        :key="data.label"' +
    '        :label="data.label"' +
    '        :prop="hasProps(data.prop)"' +
    '        v-else-if="data.inputType === \'avatar\' && data.show == null ? true : data.show">' +
    '          <el-upload' +
    '            :data="{id: forms.id}"' +
    '            class="avatar-uploader"' +
    '            :action="uploadForm.action"' +
    '            :show-file-list="false"' +
    '            :on-error="handleAvatarError"' +
    '            :on-success="((a, b) => {handleAvatarSuccess(data.prop, a, b)})"' +
    '            :before-upload="beforeAvatarUpload">' +
    '            <img v-if="avatarUrl" :src="avatarUrl" class="avatar">' +
    '            <i v-else class="el-icon-plus avatar-uploader-icon"></i>' +
    '          </el-upload>' +
    '          <el-input  v-model="forms[data.prop]" type="hidden"/>' +
    '       </el-form-item>' +
    '     </el-col>' +
    '      <!-- datePicker -->' +
    '     <el-col :span="24 / 2">' +
    '      <el-form-item' +
    '        :ref="data.prop"' +
    '        :key="data.label"' +
    '        :label="data.label"' +
    '        :prop="hasProps(data.prop)"' +
    '        v-else-if="data.inputType === \'datePicker\' && data.show == null ? true : data.show">' +
    '          <el-date-picker' +
    '            @change="((a) => {datePickerChangeHandle(data.prop, a)})"' +
    '            style="width: 100%;"' +
    '            :range-separator="data.rangeSeparator ? data.rangeSeparator : dataPickerOption.rangeSeparator"' +
    '            v-model="forms[data.prop]"' +
    '            :type="data.type ? data.type : dataPickerOption.type"' +
    '            :placeholder="data.placeholder">' +
    '          </el-date-picker>' +
    '      </el-form-item>' +
    '    </template>' +
    '  </el-form>' +
    '{{forms}}' +
    '</div>',
  props: {
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
      popoverVisible: false,
      // form表单
      forms: {},
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
    // 把other类型数据赋值到forms
    otherData: {
      handler (newVal) {
        if (isObject(newVal) && !isEmptyObject(newVal)) {
          for (let key in newVal) {
            if (this.forms.hasOwnProperty(key)) {
              this.$set(this.forms, key, clonedeep(newVal[key]))
              this.$refs.ruleForm.validateField(key)
            }
          }
        }
      },
      immediate: true,
      deep: true
    },
    // 当数据传递时对form表单进行赋值操作
    data: {
      handler (newVal) {
        this.forms = clonedeep(this.form)
        if (isObject(newVal)) {
          for (let key in this.forms) {
            this.$set(this.forms, key, newVal[key])
          }
        }
      },
      immediate: true,
      deep: true
    },
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
    // 表单数据清空
    clearForm () {
      resetObject(this.forms)
    },
    // 级联
    handleCascaderChange (value) {

    },
    // 表单提交
    submitHandle () {
      let data = clonedeep(this.forms)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('submit!', data)
          this.$emit('submit-handle', data)
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
      var index = -1
      this.forms[data.prop] = data.defaultProps ? treeData[data.defaultProps.label] : treeData.label
      this.forms[data.defaultProp] = treeData.id
      this.formProps.forEach((item, i) => {
        if (item.prop === data.prop) {
          index = i
          return false
        }
      })
      if (index > -1) {
        this.formProps[index].visible = false
      }
    },
    // 当复选框被点击的时候触发 tree
    checkHandle (prop, checkedNodes, checkedKeys) {
      // console.log(prop, checkedNodes, checkedKeys)
      this.forms[prop] = checkedKeys.checkedKeys
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
      if (this.forms[prop]) {
        val = this.forms[prop]
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
      this.$emit('uploadRemoveHandle', file, fileList)
    },
    // 文件上传失败
    handleUploadError (file, fileList) {
      this.$message.error('上传失败')
    },
    // 上传成功之后
    handleUploadSuccess (prop, res, file) {
      this.$emit('upload-success-handle', prop, res, file)
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
    // select change事件
    selectChangeHandle (prop, val) {
      console.log('selectChangeHandle', prop, val)
      this.$emit(prop + '-select-change-handle', val)
    },
    // 显示/隐藏
    toggleHandle (prop, status) {
      status = status == null ? true : status
      let ele = this.$refs[prop][0].$el
      if (status) {
        ele.style.display = ''
      } else {
        ele.style.display = 'none'
      }
    },
    // radio change事件
    radioChangeHandle (prop, val) {
      this.$emit(prop + '-radio-change-handle', val)
    },
    // datePicker change事件
    datePickerChangeHandle (prop, val) {
      console.log('datePickerChangeHandle', prop, val)
      this.$emit(prop + '-date-picker-change-handle', val)
    }
  }
})

Vue.component('kForm', kForm)