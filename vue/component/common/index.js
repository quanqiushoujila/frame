var kDialog = Vue.extend({
  template:
    '<el-dialog' +
    '  :append-to-body="appendToBody"' +
    '  :title="title"' +
    '  :width="newWidth"' +
    '  :modal="modal"' +
    '  :show-close="showClose"' +
    '  :close-on-press-escape="closeOnPressEscape"' +
    '  :close-on-click-modal="closeOnClickModal"' +
    '  :lock-scroll="lockScroll"' +
    '  :visible.sync="dialogVisible"' +
    '  :before-close="beforeCloseHandle"' +
    '  @open="openDialogHandle"' +
    '  @close="closeDialogHandle">' +
    '  <div class="dialog-body" :style="bodyStyle" ref="dialogBody">' +
    '    <slot></slot>' +
    '  </div>' +
    '  <div slot="footer" class="dialog-footer" v-if="isBtnGroup">' +
    '    <el-button' +
    '      v-for="(item, index) in btnGroup"' +
    '      :key="item.name"' +
    '      :disabled="isDisabled(item.disabled)"' +
    '      :type="btnTypes[index]"' +
    '      @click="clickHandle(item.fn)">' +
    '      {{item.name}}' +
    '    </el-button>' +
    '  </div>' +
    '</el-dialog>',

  data: function () {
    return {
      dialogVisible: false,
      btnTypes: ['', 'primary', 'warning', 'info', 'success', 'danger']
    }
  },
  props: {
    // Dialog 的标题
    title: {
      type: String,
      default: '提示'
    },
    // Dialog 的宽度 dialog大小:large, middle, small, mini
    width: {
      type: String,
      default: '50%'
    },
    // 是否为全屏 Dialog
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 是否需要遮罩层
    modal: {
      type: Boolean,
      default: true
    },
    // 是否在 Dialog 出现时将 body 滚动锁定
    lockScroll: {
      type: Boolean,
      default: true
    },
    // 是否可以通过点击 modal 关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    // 是否可以通过按下 ESC 关闭 Dialog
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 是否需要按钮组
    isBtnGroup: {
      type: Boolean,
      default: false
    },
    // 按钮组
    btnGroup: {
      type: Array,
      default: function () {
        return [
          {
            name: '取消',
            fn: 'cancel-handle'
          },
          {
            name: '确认',
            fn: 'confirm-handle'
          }
        ]
      }
    },
    // body自定义样式
    bodyStyle: {
      type: Object,
      default: function () {
        return {}
      }
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    newWidth: function () {
      var self = this
      var size = [{name: 'large', width: '80%'}, {name: 'middle', width: '65%'}, {name: 'small', width: '50%'}, {name: 'mini', width: '30%'}]
      var data = size.filter(function(item) {
          return item.name === self.width
      });
      return data.length === 0 ? this.width : data[0].width
    }
  },
  methods: {
    open: function () {
      this.dialogVisible = true
    },
    close: function () {
      this.dialogVisible = false
    },
    isDisabled (status) {
      if (status) {
        if (isBoolean(status) && status) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    // 按钮是否禁用
    toggleDisabledButton (name, status) {
      name = name || '确认'
      for (var i = 0, len = this.btnGroup.length; i < len; i++) {
        if (this.btnGroup[i].name === name) {
          if (status && isBoolean(status)) {
            this.$set(this.btnGroup[i], 'disabled', status)
          } else {
            if (this.btnGroup[i].disabled) {
              this.$set(this.btnGroup[i], 'disabled', false)
            } else {
              this.$set(this.btnGroup[i], 'disabled', true)
            }
          }
          break
        }
      }
    },
    // 关闭前的回调，会暂停 Dialog 的关闭
    beforeCloseHandle: function (done) {
      this.$emit('before-close-handle', done)
      this.close()
    },
    // Dialog 打开的回调
    openDialogHandle: function () {
      this.$emit('open-dialog-handle')
    },
    // Dialog 关闭的回调
    closeDialogHandle: function () {
      var self = this
      setTimeout(function () {
        self.$refs.dialogBody.scrollTo(0, 0)
      }, 100)
      this.$emit('close-dialog-handle')
      this.close()
    },
    // 自定义方法
    clickHandle: function (fn) {
      this.$emit(fn)
    }
  }
});

Vue.component('kDialog', kDialog);

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
});
/*var kForm = Vue.extend({
  template:
    '<div>'+
    '  <el-form'+
    '    :model="form"'+
    '    :rules="rules"'+
    '    ref="ruleForm"'+
    '    :label-width="labelWidth"'+
    '    class="form">'+
    '    <el-row>'+
    '      <template v-for="(data) in formProps">'+
    '        <!-- input -->'+
    '        <template v-if="data.inputType === \'input\' && data.show == null ? true : data.show">'+
    '        <el-col'+
    '          :span="24 / column"'+
    '          '+
    '          :key="data.prop">'+
    '          <el-form-item'+
    '            :key="data.label"'+
    '            :label="data.label"'+
    '            :prop="hasProps(data.prop)"'+
    '            :ref="data.prop"'+
    '            >'+
    '            <el-input'+
    '              @blur="((e) => {inputBlurHandle(data.prop, e)})"'+
    '              @focus="((e) => {inputFocusHandle(data.prop, e)})"'+
    '              :readonly="data.readonly"'+
    '              clearable'+
    '              :suffix-icon="data.suffixIcon"'+
    '              :prefix-icon="data.prefixIcon"'+
    '              :disabled="data.disabled"'+
    '              v-model="form[data.prop]"'+
    '              :placeholder="data.placeholder || \'请输入\'">'+
    '            </el-input>'+
    '          </el-form-item>'+
    '        </el-col>'+
    '        </template>'+
    '        <!-- radio -->'+
    '        <template v-else-if="data.inputType === \'radio\' && data.show == null ? true : data.show">'+
    '        <el-col'+
    '          :span="24 / column"'+
    '          '+
    '          :key="data.prop">'+
    '          <el-form-item'+
    '            :ref="data.prop"'+
    '            :key="data.label"'+
    '            :label="data.label"'+
    '            :prop="hasProps(data.prop)"'+
    '            >'+
    '            <el-radio-group v-model="form[data.prop]" :disabled="data.disabled">'+
    '              <el-radio'+
    '                @change="((val) => {radioChangeHandle(data.prop, val)})"'+
    '                :disabled="item.disabled"'+
    '                :label="data.defaultProps ? (data.defaultProps.id ? item[data.defaultProps.id] : item.id) : item.id"'+
    '                v-for="item in data.options"'+
    '                :border="data.border || false"'+
    '                :key="data.defaultProps ? (data.defaultProps.id ? item[data.defaultProps.id] : item.id) : item.id">'+
    '                {{data.defaultProps ? (data.defaultProps.label ? item[data.defaultProps.label] : item.label) : item.label}}'+
    '              </el-radio>'+
    '            </el-radio-group>'+
    '          </el-form-item>'+
    '        </el-col>'+
    '        </template>'+
    '        <!-- checkbox -->'+
    '        <template v-else-if="data.inputType === \'checkbox\' && data.show == null ? true : data.show"'+
    '          :key="data.prop">'+
    '        <el-col'+
    '          :span="24 / column"'+
    '          >'+
    '          <el-form-item'+
    '            :ref="data.prop"'+
    '            :key="data.label"'+
    '            :label="data.label"'+
    '            :prop="hasProps(data.prop)"'+
    '            >'+
    '            <el-checkbox-group'+
    '              v-model="form[data.prop]"'+
    '              :disabled="data.disabled"'+
    '              @change="((val) => {checkboxChangeHandle(data.prop, val)})">'+
    '              <el-checkbox'+
    '                :disabled="item.disabled"'+
    '                :label="data.defaultProps ? (data.defaultProps.id ? item[data.defaultProps.id] : item.id) : item.id"'+
    '                v-for="item in data.options"'+
    '                :key="data.defaultProps ? (data.defaultProps.id ? item[data.defaultProps.id] : item.id) : item.id"'+
    '                >'+
    '                {{data.defaultProps ? (data.defaultProps.label ? item[data.defaultProps.label] : item.label) : item.label}}'+
    '              </el-checkbox>'+
    '            </el-checkbox-group>'+
    '          </el-form-item>'+
    '        </el-col>'+
    '        </template>'+
    '        <!-- textarea -->'+
    '        <template v-else-if="data.inputType === \'textarea\' && data.show == null ? true : data.show">'+
    '        <el-col'+
    '          :span="24 / column"'+
    '          '+
    '          :key="data.prop">'+
    '          <el-form-item'+
    '            :ref="data.prop"'+
    '            :key="data.label"'+
    '            :label="data.label"'+
    '            :prop="hasProps(data.prop)"'+
    '            >'+
    '              <el-input'+
    '                :autosize="data.autosize || { minRows: 2, maxRows: 4}"'+
    '                :disabled="data.disabled"'+
    '                type="textarea"'+
    '                :placeholder="data.placeholder || \'请输入\'"'+
    '                v-model="form[data.prop]">'+
    '              </el-input>'+
    '          </el-form-item>'+
    '        </el-col>'+
    '        </template>'+
    '        <!-- cascader -->'+
    '        <template v-else-if="data.inputType === \'cascader\' && data.show == null ? true : data.show">'+
    '        <el-col'+
    '          :span="24 / column"'+
    '          '+
    '          :key="data.prop">'+
    '          <el-form-item'+
    '            :ref="data.prop"'+
    '            :key="data.label"'+
    '            :label="data.label"'+
    '            :prop="hasProps(data.prop)"'+
    '            >'+
    '              <el-cascader'+
    '                clearable'+
    '                :disabled="data.disabled"'+
    '                :props="data.defaultProps || cascaderProps"'+
    '                :placeholder="data.placeholder || \'请选择\'"'+
    '                :filterable="data.filterable || false"'+
    '                :change-on-select="data.changeOnSelect || false"'+
    '                :show-all-levels="data.showAllLevels || true"'+
    '                @change="((val) => {cascaderChangeHandle(data.prop, val)})"'+
    '                style="width: 100%"'+
    '                :expand-trigger="data.expandTrigger || \'click\'"'+
    '                :options="data.options"'+
    '                v-model="form[data.prop]">'+
    '              </el-cascader>'+
    '          </el-form-item>'+
    '        </el-col>'+
    '        </template>'+
    '        <!-- inputTree -->'+
    '        <template v-else-if="data.inputType === \'inputTree\' && data.show == null ? true : data.show">'+
    '        <el-col'+
    '          :span="24 / column"'+
    '          '+
    '          :key="data.prop">'+
    '          <el-form-item'+
    '            :ref="data.prop"'+
    '            :key="data.label"'+
    '            :label="data.label"'+
    '            :prop="hasProps(data.prop)"'+
    '            >'+
    '              <div v-show="isReference(data.reference)">'+
    '                 <el-popover'+
    '                  v-model="data.visible"'+
    '                  placement="bottom-start"'+
    '                  width="400"'+
    '                  trigger="click">'+
    '                  <div class="max-height">'+
    '                    <el-tree'+
    '                      node-key="id"'+
    '                      @current-change="((a, b) => {treeCurrentChangeHandle(data, a, b)})"'+
    '                      :highlight-current="true"'+
    '                      :default-expand-all="true"'+
    '                      :expand-on-click-node="false"'+
    '                      :data="data.options"'+
    '                      :ref="data.prop + \'Tree\'"'+
    '                      :props="data.defaultProps || defaultProps"/>'+
    '                  </div>'+
    '                  <el-input'+
    '                    v-model="form[data.prop]"'+
    '                    readonly'+
    '                    slot="reference"'+
    '                    :placeholder="data.placeholder || \'请选择\'"></el-input>'+
    '                </el-popover>'+
    '              </div>'+
    '            <el-input'+
    '              v-model="form[data.prop]"'+
    '              readonly'+
    '              v-show="!isReference(data.reference)"'+
    '              :placeholder="data.placeholder || \'请选择\'"></el-input>'+
    '          </el-form-item>'+
    '        </el-col>'+
    '        </template>'+
    '        <!-- tree -->'+
    '        <template v-else-if="data.inputType === \'tree\' && data.show == null ? true : data.show">'+
    '        <el-col'+
    '          :span="24"'+
    '          :key="data.prop"'+
    '          >'+
    '          <el-form-item'+
    '            :ref="data.prop"'+
    '            :key="data.label"'+
    '            :label="data.label"'+
    '            :prop="hasProps(data.prop)"'+
    '            >'+
    '            <el-tree'+
    '              :check-strictly="data.checkStrictly || false"'+
    '              :data="data.options"'+
    '              show-checkbox'+
    '              default-expand-all'+
    '              node-key="id"'+
    '              :ref="data.prop + \'Tree\'"'+
    '              highlight-current'+
    '              @check="((a, b) => {checkHandle(data.prop, a, b)})"'+
    '              :props="data.defaultProps || treeDefaultProps">'+
    '            </el-tree>'+
    '          </el-form-item>'+
    '        </el-col>'+
    '        </template>'+
    '        <!-- select -->'+
    '        <template v-else-if="data.inputType === \'select\' && data.show == null ? true : data.show">'+
    '        <el-col'+
    '          :span="24 / column"'+
    '          '+
    '          :key="data.prop">'+
    '          <el-form-item'+
    '            :ref="data.prop"'+
    '            :key="data.label"'+
    '            :label="data.label"'+
    '            :prop="hasProps(data.prop)"'+
    '            >'+
    '            <el-select'+
    '              clearable'+
    '              :collapse-tags="data.collapseTags"'+
    '              @change="((val) => {selectChangeHandle(data.prop, val)})"'+
    '              :filterable="data.filterable || true"'+
    '              :disabled="data.disabled"'+
    '              :multiple="data.multiple"'+
    '              v-model="form[data.prop]"'+
    '              :placeholder="data.placeholder || \'请选择\'"'+
    '              style="width: 100%">'+
    '              <el-option'+
    '                v-for="item in data.options"'+
    '                :key="data.defaultProps ? (data.defaultProps.id ? item[data.defaultProps.id] : item.id) : item.id"'+
    '                :label="data.defaultProps ? (data.defaultProps.label ? item[data.defaultProps.label] : item.label) : item.label"'+
    '                :value="data.defaultProps ? (data.defaultProps.id ? item[data.defaultProps.id] : item.id) : item.id">'+
    '              </el-option>'+
    '            </el-select>'+
    '          </el-form-item>'+
    '        </el-col>'+
    '        </template>'+
    '        <!-- other -->'+
    '        <template v-else-if="data.inputType === \'other\' && data.show == null ? true : data.show">'+
    '        <el-col'+
    '          :span="24 / column"'+
    '          '+
    '          :key="data.label"'+
    '          >'+
    '          <template v-if="data.editTemplate ? !data.editTemplate : (data.editTemplate == null ? true : data.editTemplate)">'+
    '            <el-form-item'+
    '              :ref="data.prop"'+
    '              :label="data.label"'+
    '              :prop="hasProps(data.prop)">'+
    '              <slot :name="data.prop + \'Form\'"></slot>'+
    '            </el-form-item>'+
    '          </template>'+
    '          <template v-else>'+
    '            <slot :name="data.prop + \'Form\'"></slot>'+
    '          </template>'+
    '        </el-col>'+
    '        </template>'+
    '        <!-- upload -->'+
    '        <template v-else-if="data.inputType === \'upload\' && data.show == null ? true : data.show">'+
    '        <el-col'+
    '          :span="24"'+
    '          '+
    '          :key="data.prop">'+
    '          <el-form-item'+
    '            :ref="data.prop"'+
    '            :key="data.label"'+
    '            :label="data.label"'+
    '            :prop="hasProps(data.prop)"'+
    '            >'+
    '            <el-upload'+
    '              :accept="uploadForm.accept"'+
    '              class="upload-form"'+
    '              :action="uploadForm.action"'+
    '              :on-remove="handleUploadRemove"'+
    '              :multiple="uploadForm.multiple"'+
    '              :limit="uploadForm.limit"'+
    '              :on-success="((a, b) => {handleUploadSuccess(data.prop, a, b)})"'+
    '              :on-exceed="handleUploadExceed"'+
    '              :on-error="handleUploadError"'+
    '              :file-list="form[data.prop]">'+
    '              <div class="form-inline" style="padding-right: 75px;">'+
    '                <el-input'+
    '                  readonly'+
    '                  style="width: 100%"'+
    '                  v-model="form[data.prop]"'+
    '                  :placeholder="data.placeholder">'+
    '                </el-input>'+
    '                <el-button type="primary" class="upload-btn">上传</el-button>'+
    '              </div>'+
    '            </el-upload>'+
    '          </el-form-item>'+
    '        </el-col>'+
    '        </template>'+
    '        <!-- avatar -->'+
    '        <template v-else-if="data.inputType === \'avatar\' && data.show == null ? true : data.show">'+
    '        <el-col'+
    '          :span="24"'+
    '          '+
    '          :key="data.prop">'+
    '          <el-form-item'+
    '          :ref="data.prop"'+
    '          :key="data.label"'+
    '          :label="data.label"'+
    '          :prop="hasProps(data.prop)"'+
    '          >'+
    '            <el-upload'+
    '              :data="{id: form.id}"'+
    '              class="avatar-uploader"'+
    '              :action="uploadForm.action"'+
    '              :show-file-list="false"'+
    '              :on-error="handleAvatarError"'+
    '              :on-success="((a, b) => {handleAvatarSuccess(data.prop, a, b)})"'+
    '              :before-upload="beforeAvatarUpload">'+
    '              <img v-if="avatarUrl" :src="avatarUrl" class="avatar">'+
    '              <i v-else class="el-icon-plus avatar-uploader-icon"></i>'+
    '            </el-upload>'+
    '            <el-input  v-model="form[data.prop]" type="hidden"/>'+
    '         </el-form-item>'+
    '        </el-col>'+
    '        </template>'+
    '        <!-- datePicker -->'+
    '        <template v-else-if="data.inputType === \'datePicker\' && data.show == null ? true : data.show">'+
    '        <el-col'+
    '          :span="24 / column"'+
    '          '+
    '          :key="data.prop">'+
    '          <el-form-item'+
    '            :ref="data.prop"'+
    '            :key="data.label"'+
    '            :label="data.label"'+
    '            :prop="hasProps(data.prop)">'+
    '              <el-date-picker'+
    '                :disabled="data.disabled"'+
    '                :picker-options="data.pickerOptions"'+
    '                @change="((a) => {datePickerChangeHandle(data.prop, a)})"'+
    '                style="width: 100%;"'+
    '                :range-separator="data.rangeSeparator ? data.rangeSeparator : dataPickerOption.rangeSeparator"'+
    '                v-model="form[data.prop]"'+
    '                :value-format="data.valueFormat || \'timestamp\'"'+
    '                :type="data.type ? data.type : dataPickerOption.type"'+
    '                :placeholder="data.placeholder || \'请选择\'">'+
    '              </el-date-picker>'+
    '          </el-form-item>'+
    '        </el-col>'+
    '        </template>'+
    '      </template>'+
    '    </el-row>'+
    '  </el-form>'+
    '  {{form}}'+
    '</div>',
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
      var self = this;
      let val = [];
      if (this.form[prop]) {
        val = this.form[prop];
      }
      this.$nextTick(function () {
        self.initTree(prop, val)
      })
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
      this.$emit(`${prop}-cascader-change-handle`, value)
    },
    // select change事件
    selectChangeHandle (prop, val) {
      this.$emit(prop + '-select-change-handle', val, prop)
    },
    // radio change事件
    radioChangeHandle (prop, val) {
      this.$emit(prop + '-radio-change-handle', val, prop)
    },
    // datePicker change事件
    datePickerChangeHandle (prop, val) {
      this.$emit(`${prop}-date-picker-change-handle`, val, prop)
    },
    // 输入框blur事件
    inputBlurHandle (prop, e) {
      this.$emit(`${prop}-input-blur-handle`, e, prop)
    },
    // 输入框focus事件
    inputFocusHandle (prop, e) {
      this.$emit(`${prop}-input-focus-handle`, e, prop)
    },
    // checkbox chang事件
    checkboxChangeHandle (prop, val) {
      this.$emit(`${prop}-checkbox-change-handle`, val, prop)
    }
  }
});*/
Vue.component('kForm', kForm);

var kDetail = Vue.extend({
  template:
    '<el-form' +
    '  :label-width="labelWidth"' +
    '  class="detail-form">' +
    '  <template v-for="item in currentProps">' +
    '    <el-form-item' +
    '      :label="item.label"' +
    '      v-if="!isArray(item) && item.inputType === \'tree\' && item.show == null ? true : item.show"' +
    '      :key="item.prop">' +
    '      <el-tree' +
    '        :ref="item.prop + \'Tree\'"' +
    '        :check-strictly="item.checkStrictly"' +
    '        :data="item.options"' +
    '        show-checkbox' +
    '        default-expand-all' +
    '        node-key="id"' +
    '        highlight-current' +
    '        :props="item.defaultProps || treeDefaultProps">' +
    '      </el-tree>' +
    '    </el-form-item>' +
    '    <el-form-item' +
    '      :label="item.label"' +
    '      v-else-if="!isArray(item) && item.show == null ? true : item.show"' +
    '      :key="item.prop">' +
    '      <span class="ellipsis text">' +
    '        {{(data[data[item.prop + detailName] != null ? item.prop + detailName : item.prop])}}' +
    '      </span>' +
    '    </el-form-item>' +
    '    <el-form-item' +
    '      class="moreStyle"' +
    '      :label="item[0].label"' +
    '      v-else-if="isArray(item) && item.show == null ? true : item.show"' +
    '      :key="item[0].prop">' +
    '      <el-col' +
    '        :span="12"' +
    '        v-for="result in item"' +
    '        :key="result.prop">' +
    '        <span class="ellipsis text" v-if="result.show == null ? true : item.show">' +
    '          {{(data[data[result.prop + detailName] != null ? result.prop + detailName : result.prop])}}' +
    '        </span>' +
    '      </el-col>' +
    '    </el-form-item>' +
    '  </template>' +
    '</el-form>',

  data: function () {
    return {
      treeDefaultProps: {
        children: 'children',
        label: 'label'
      },
      currentProps: []
    }
  },
  props: {
    labelWidth: {
      type: String,
      default: '100px'
    },
    props: {
      type: Array,
      default: function () {
        return []
      }
    },
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    detailName: {
      type: String,
      default: 'ForShow'
    }
  },
  watch: {
    props: {
      handler: function (newVal) {
        this.currentProps = clonedeep(newVal)
        this.currentProps.forEach(function (item) {
          if (item.inputType === 'tree') {
            item.options = toggleDisabled(item.options, true)
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    isArray: function (val) {
      return isArray(val)
    },
    // 初始化tree
    initTree: function (prop, val) {
      prop += 'Tree'
      val = val || []
      console.log(this.$refs)
      this.$refs[prop][0].setCheckedKeys(val)
    },
    // 打开弹窗记录数据tree
    openInitTree: function (prop) {
      let val = []
      if (this.data[prop]) {
        val = this.data[prop]
      }
      this.initTree(prop, val)
    }
  }
});
// var kDetail = Vue.extend({
//   template:
//     '<el-form'+
//     ':label-width="labelWidth"'+
//     'class="detail-form">'+
//     '<el-row>'+
//     '  <template v-for="item in currentProps">'+
//     '    <el-col'+
//     '      :span="24"'+
//     '      v-if="!isArray(item)&& !item.detailTemplate  && item.inputType === \'tree\' && item.show == null ? true : item.show"'+
//     '      :key="item.prop">'+
//     '      <el-form-item'+
//     '        :label="item.label"'+
//     '        >'+
//     '        <el-tree'+
//     '          :ref="item.prop + \'Tree\'"'+
//     '          :check-strictly="item.checkStrictly || false"'+
//     '          :data="item.options"'+
//     '          show-checkbox'+
//     '          default-expand-all'+
//     '          node-key="id"'+
//     '          highlight-current'+
//     '          :props="item.defaultProps || treeDefaultProps">'+
//     '        </el-tree>'+
//     '      </el-form-item>'+
//     '    </el-col>'+
//     '    <el-col'+
//     '      :span="24 / column"'+
//     '      v-else-if="!isArray(item) && !item.detailTemplate && item.show == null ? true : item.show"'+
//     '      :key="item.prop">'+
//     '      <el-form-item'+
//     '        :label="item.label"'+
//     '        >'+
//     '        <span class="ellipsis text" @click="detailClickHandle(item.prop, data, item)" :class="item.detailClick ? \'underline pointer\' : \'\'">'+
//     '          {{(data[data[item.prop + detailName] != null ? item.prop + detailName : item.prop])}}'+
//     '        </span>'+
//     '      </el-form-item>'+
//     '    </el-col>'+
//     '    <el-col'+
//     '      :span="24 / column"'+
//     '      v-else-if="isArray(item)&& !item.detailTemplate  && item.show == null ? true : item.show"'+
//     '      :key="item[0].prop">'+
//     '      <el-form-item'+
//     '        class="moreStyle"'+
//     '        :label="item[0].label"'+
//     '        >'+
//     '        <el-col'+
//     '          :span="12"'+
//     '          v-for="result in item"'+
//     '          :key="result.prop">'+
//     '          <span class="ellipsis text" v-if="result.show == null ? true : item.show" @click="detailClickHandle(item.prop, data, item)" :class="item.detailClick ? \'underline pointer\' : \'\'">'+
//     '            {{(data[data[result.prop + detailName] != null ? result.prop + detailName : result.prop])}}'+
//     '          </span>'+
//     '        </el-col>'+
//     '      </el-form-item>'+
//     '    </el-col>'+
//     '    <el-col'+
//     '      :span="24 / column"'+
//     '      v-else-if="item.detailTemplate && item.show == null ? true : item.show"'+
//     '      :key="item.prop">'+
//     '      <el-form-item'+
//     '        :label="item.label"'+
//     '        >'+
//     '        <slot :name="item.prop + \'Detail\'"></slot>'+
//     '      </el-form-item>'+
//     '    </el-col>'+
//     '  </template>'+
//     '</el-row>'+
//   '</el-form>',
//   data () {
//     return {
//       treeDefaultProps: {
//         children: 'children',
//         label: 'label'
//       },
//       currentProps: []
//     }
//   },
//   props: {
//     // 表单一行${column}个
//     column: {
//       type: Number,
//       default: 1
//     },
//     labelWidth: {
//       type: String,
//       default: '100px'
//     },
//     props: {
//       type: Array,
//       default () {
//         return []
//       }
//     },
//     data: {
//       type: Object,
//       default () {
//         return {}
//       }
//     },
//     detailName: {
//       type: String,
//       default: 'ForShow'
//     }
//   },
//   watch: {
//     props: {
//       handler (newVal) {
//         this.currentProps = clonedeep(newVal)
//         this.currentProps.forEach((item) => {
//           if (item.inputType === 'tree') {
//             item.options = toggleDisabled(item.options, true)
//           }
//         })
//       },
//       immediate: true
//     }
//   },
//   methods: {
//     isArray (val) {
//       return isArray(val)
//     },
//     // 初始化tree
//     initTree (prop, val = []) {
//       prop += 'Tree'
//       this.$refs[prop][0].setCheckedKeys(val)
//     },
//     // 打开弹窗记录数据tree
//     openInitTree (prop) {
//       let val = []
//       if (this.data[prop]) {
//         val = this.data[prop]
//       }
//       this.initTree(prop, val)
//     },
//     detailClickHandle (prop, row, props) {
//       if (props.detailClick) {
//         this.$emit(prop + '-detail-click-handle', row, prop)
//       }
//     }
//   }
// });
Vue.component('kDetail', kDetail);

var kTable = Vue.extend({
  template:
    '<div class="table-and-pagination">'+
    '  <el-table'+
    '    ref="kTable"'+
    '    :data="table.data"'+
    '    v-loading="table.loading ? table.loading : false"'+
    '    @row-click="handleRowClick"'+
    '    @select="handleSelect"'+
    '    @select-all="handleSelectAll"'+
    '    @selection-change="handleSelectionChange"'+
    '    @cell-click="cellClickHandle"'+
    '    :span-method="spanMethodHandle"'+
    '    border'+
    '    :row-style="tableRowStyle"'+
    '    :row-class-name="tableRowClassName"'+
    '    :stripe="table.stripe ? table.stripe : true"'+
    '    :size="table.size ? table.size : \'medium\'"'+
    '    :show-header="table.showHeader ? table.showHeader : true"'+
    '    style="width: 100%">'+
    '    <el-table-column'+
    '      v-if="isSelect(table.hasSelect)"'+
    '      type="selection"'+
    '      width="55">'+
    '    </el-table-column>'+
    '    <template v-for="item in table.tr">'+
    '      <template v-if="isTreeTable(table.tree, item.prop)">'+
    '        <table-tree-column'+
    '          :levelKey="levelKey"'+
    '          :childKey="childKey"'+
    '          :expanded="expanded"'+
    '          :show="show"'+
    '          :data="table.data"'+
    '          :key="item.prop"'+
    '          :prop="item.prop"'+
    '          :label="item.label"'+
    '          :minWidth="item.minWidth ? item.minWidth : \'\'"'+
    '          :width="item.width ? item.width : \'\'"/>'+
    '      </template>'+
    '      <template v-else-if="item.template">'+
    '        <el-table-column'+
    '          show-overflow-tooltip'+
    '          :prop="item.prop || \'\'"'+
    '          :key="item.prop"'+
    '          :label="item.label"'+
    '          v-if="item.show !== false ? true : false"'+
    '          :min-width="item.minWidth ? item.minWidth : \'\'"'+
    '          :width="item.width ? item.width : \'\'">'+
    '          <template slot-scope="scope">'+
    '            <slot :name="item.prop" :data="scope"></slot>'+
    '          </template>'+
    '        </el-table-column>'+
    '      </template>'+
    '      <template v-else>'+
    '        <table-column'+
    '          @table-cell-handle="tableCellHandle"'+
    '          :key="item.prop"'+
    '          :data="item"/>'+
    '      </template>'+
    '    </template>'+
    '    <el-table-column'+
    '      v-if="isOperation(table.operation)"'+
    '      fixed="right"'+
    '      :label="table.operation.label"'+
    '      :width="table.operation.width ? table.operation.width : \'\'"'+
    '      :min-width="table.operation.minWidth ? table.operation.minWidth : \'\'">'+
    '      <template slot-scope="scope">'+
    '        <el-button'+
    '          v-for="item in table.operation.data"'+
    '          v-if="isBtnGroup(item, scope.row)"'+
    '          :key="item.label"'+
    '          size="small"'+
    '          :type="table.operation.type ? table.operation.type : \'text\'"'+
    '          @click="handleOperation(scope.$index, scope.row, item.id)">'+
    '          {{item.label}}'+
    '        </el-button>'+
    '      </template>'+
    '    </el-table-column>'+
    '  </el-table>'+
    '  <!-- 分页 -->'+
    '  <div class="block" v-if="isPagination(table.pagination)">'+
    '    <el-pagination'+
    '      @size-change="handleSizeChange"'+
    '      @current-change="handleCurrentChange"'+
    '      :current-page="table.pagination.currentPage ? table.pagination.currentPage : 1"'+
    '      :page-sizes="table.pagination.pageSizes ? table.pagination.pageSizes : [10, 20, 30, 50]"'+
    '      :page-size="table.pagination.pageSize ? table.pagination.pageSize : 10"'+
    '      :layout="table.pagination.layout ? table.pagination.layout : \'total, sizes, prev, pager, next, jumper\'"'+
    '      background'+
    '      :total="table.pagination.total ? table.pagination.total : 0">'+
    '    </el-pagination>'+
    '  </div>'+
    '</div>',
    props: {
      table: {
        type: Object,
        default () {
          return {
            // 是否为斑马纹
            stripe: true,
            // Table 的尺寸
            size: 'medium',
            // 是否显示表头
            showHeader: true,
            // table数据
            data: [],
            // 加载效果
            loading: false,
            // 选择框
            hasSelect: true,
            // 树
            tree: {
              // 是否开启tabletree 有选择框必加
              hasTree: false,
              treeKey: '',
              // 折叠prop
              expand: true,
              // 是否跟父级相关联
              checkStrictly: false
            },
            // table 名称
            tr: [{
              id: '1',
              label: 'label',
              prop: 'prop',
              className: 'classname',
              width: '100',
              minWidth: '80'
            }],
            // 操作
            operation: {
              hasOperation: true,
              // 按钮类型
              type: 'text',
              label: '操作',
              width: 200,
              minWidth: '',
              clickName: 'editHanle',
              // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
              data: [{
                label: '详情',
                id: 1,
                fn: 'detailHandle',
                permission: 'sys:user:info'
              }]
            },
            // 分页
            pagination: {
              hasPagination: true,
              total: 0,
              currentPage: 1,
              pageSize: 10,
              layout: 'total, sizes, prev, pager, next, jumper',
              pageSizes: [10, 20, 30, 50]
            }
          }
        }
      },
      levelKey: {
        type: String,
        default: 'level'
      },
      childKey: {
        type: String,
        default: 'children'
      },
      expanded: {
        type: String,
        default: '_expanded'
      },
      show: {
        type: String,
        default: '_show'
      }
    },
    computed: {
      permissions () {
        return JSON.parse(sessionStorage.getItem('permissions'))
      }
    },
    methods: {
      // 按钮是否显示
      isBtnGroup (data, row) {
        let result = this.isPermission(data.permission)
        if (result) {
          result = this.isShow(data.show)
        }
        if (result) {
          result = this.table.btnGroupFn ? this.table.btnGroupFn(data, row) : true
        }
        return result
      },
      // 按钮是否显示
      isShow (status = true) {
        if (isBoolean(status) && status) {
          return true
        } else {
          return false
        }
      },
      // 是否有选择框
      isSelect (select) {
        return isBoolean(select) ? (select ? 1 : 0) : 0
      },
      // 是否是树形
      isTreeTable (tree, prop) {
        if (!tree) {
          return false
        } else {
          if (isBoolean(tree.hasTree) && !tree.hasTree) {
            return false
          }
          if (tree.treeKey) {
            if (tree.treeKey === prop) {
              return true
            } else {
              return false
            }
          } else {
            return false
          }
        }
      },
      // 是否显示操作
      isOperation (operation) {
        if (!operation) {
          return false
        } else {
          if (isBoolean(operation.hasOperation) && !operation.hasOperation) {
            return false
          } else if (isBoolean(operation.hasOperation) && operation.hasOperation) {
            if (operation.data && operation.data.length > 0) {
              return true
            }
            return false
          } else {
            if (operation.data && operation.data.length > 0) {
              return true
            }
            return false
          }
        }
      },
      // 是否显示分页
      isPagination (pagination) {
        if (!pagination) {
          return false
        } else {
          if (isBoolean(pagination.hasPagination) && !pagination.hasPagination) {
            return false
          }
          if (pagination.total > 0) {
            return true
          } else {
            return false
          }
        }
      },
      // 按钮是否拥有权限
      isPermission (val) {
        if (val && this.permissions && this.permissions.length) {
          return this.permissions.findIndex(item => item === val) > -1
        }
        return true
      },
      // 按钮事件
      handleOperation (index, row, id) {
        let data = this.table.operation.data
        for (let i = 0, len = data.length; i < len; i++) {
          if (id === data[i].id) {
            this.$emit(data[i].fn, index, row)
          }
        }
      },
      // 当选择项发生变化时会触发该事件
      handleSelectionChange (val) {
        // console.log('handleSelectionChange', val)
        let ids = val.map((item) => {
          return item.id
        })
        this.$emit('selection-change-handle', ids, val)
      },
      // 当全选时发生变化时会触发该事件
      handleSelectAll (val) {
        // console.log('handleSelectAll', val)
        this.$emit('select-all-handle', val)
      },
      // 当用户手动勾选数据行的 Checkbox 时触发的事件
      handleSelect (val, row) {
        // console.log('handleSelect', val, row)
        if (this.table.tree && isBoolean(this.table.tree.checkStrictly) && this.table.tree.checkStrictly && row.children && row.children.length > 0) {
          let index = val.findIndex((item) => {
            return item.id === row.id
          })

          let data = []
          // -1 移除选中; 大于-1 选中
          if (index === -1) {
            this.getDataChildren(row.children, data)
            data.forEach(row => {
              this.$refs.kTable.toggleRowSelection(row, false)
            })
          } else {
            this.getDataChildren(row.children, data)
            data.forEach(row => {
              this.$refs.kTable.toggleRowSelection(row, true)
            })
          }
        }
        this.$emit('select-handle', val)
      },
      // 当某个单元格被点击时会触发该事件
      cellClickHandle (row, column, cell, event) {
        this.$emit('cell-click-handle', row, column, cell, event)
      },
      // 当某一行被点击时会触发该事件
      handleRowClick (row, event, column) {
        this.$emit('row-click-handle', row, event, column)
      },
      // 为 Table 中的某一行添加 classname
      tableRowClassName ({row, rowIndex}) {
        this.$emit('table-row-class-name-handle', rowIndex, row)
      },
      // 行的 style 的回调方法，
      tableRowStyle ({row, rowIndex}) {
        if (this.table.tree || (this.table.tree && this.table.tree.hasTree)) {
          let show = !isBoolean(row[this.show]) ? 1 : (row[this.show] ? 1 : 0)
          row[this.show] = !!show
          return show ? '' : 'display:none;'
        }
      },
      // 每页条数改变时会触发
      handleSizeChange (val) {
        this.$emit('size-change-handle', val)
      },
      // 当前页改变时会触发
      handleCurrentChange (val) {
        this.$emit('current-change-handle', val)
      },
      getDataChildren (row, data) {
        for (let i = 0, len = row.length; i < len; i++) {
          data.push(row[i])
          const children = row[i].children
          if (children && children.length > 0) {
            this.getDataChildren(children, data)
          }
        }
      },
      // 合并单元格
      spanMethodHandle ({ row, column, rowIndex, columnIndex }) {
        this.$emit('span-method-handle', row, column, rowIndex, columnIndex)
      },
      // table单元格点击
      tableCellHandle (prop, row) {
        this.$emit(`${prop}-cell-handle`, row)
      },
      renderHeader (h, { column, $index }) {
        return h('span', column.label)
      }
    }
});

Vue.component('kTable', kTable);

var tableColumn = Vue.extend({
  template:
    '<el-table-column'+
    '  show-overflow-tooltip'+
    '  :prop="data.prop || \'\'"'+
    '  :key="data.prop"'+
    '  :label="data.label"'+
    '  v-if="data.show !== false ? true : false"'+
    '  :min-width="data.minWidth ? data.minWidth : \'\'"'+
    '  :width="data.width ? data.width : \'\'">'+
    '  <template slot-scope="scope">'+
    '    <template v-if="!data.click">{{scope.row[data.prop]}}</template>'+
    '    <template v-else>'+
    '      <span class="pointer underline" @click="tableCellHandle(data.prop, scope.row)">{{scope.row[data.prop]}}</span>'+
    '    </template>'+
    '  </template>'+
    '  <table-column'+
    '    @table-cell-handle="tableCellHandle"'+
    '    v-if="data.children && data.children.length > 0"'+
    '    v-for="(item, index) in data.children"'+
    '    :key="index"'+
    '    :data="item">'+
    '  </table-column>'+
    '</el-table-column>',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    tableCellHandle (prop, row) {
      this.$emit('table-cell-handle', prop, row)
    }
  }
});
Vue.component('tableColumn', tableColumn);

var tableTreeColumn = Vue.extend({
  template:
    '<el-table-column' +
    '  :label="label"' +
    '  :min-width="minWidth ? minWidth : \'\'"' +
    '  :width="width ? width : \'\'"' +
    '  :prop="prop">' +
    '  <template slot-scope="scope">' +
    '    <span' +
    '      @click.prevent="toggleHandle(scope.$index, scope.row)"' +
    '      :style="childStyles(scope.row)">' +
    '      <i' +
    '        :class="iconClasses(scope.row)"' +
    '        :style="iconStyles(scope.row)"></i>' +
    '      {{ scope.row[prop] }}' +
    '    </span>' +
    '  </template>' +
    '</el-table-column>',

  name: 'tableTreeColumn',
  props: {
    minWidth: {
      type: [String, Number],
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    prop: String,
    label: String,
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    levelKey: {
      type: String,
      default: 'level'
    },
    childKey: {
      type: String,
      default: 'children'
    },
    expanded: {
      type: String,
      default: '_expanded'
    },
    show: {
      type: String,
      default: '_show'
    }
  },
  data: function () {
    return {
    }
  },
  methods: {
    childStyles: function (row) {
      return { 'padding-left': (row[this.levelKey] > 1 ? row[this.levelKey] * 7 : 0) + 'px' }
    },
    iconClasses: function (row) {
      return !row[this.expanded] ? 'el-icon-caret-right' : 'el-icon-caret-bottom'
    },
    iconStyles: function (row) {
      return { 'visibility': this.hasChild(row) ? 'visible' : 'hidden' }
    },
    hasChild: function (row) {
      return (isArray(row[this.childKey]) && row[this.childKey].length >= 1) || false
    },
    // 切换处理
    toggleHandle: function (index, row) {
      if (this.hasChild(row)) {
        var ids = []
        var data = this.data
        var children = row[this.childKey]
        var hasOpen = !row[this.expanded]
        var obj = {}
        obj.id = row.id
        obj[this.expanded] = hasOpen
        ids.push(obj)
        this.setTreeData(children, ids, hasOpen)
        for (var i = 0, len = data.length; i < len; i++) {
          for (var j = 0, len1 = ids.length; j < len1; j++) {
            if (data[i].id === ids[j].id) {
              for (var key in ids[j]) {
                if (data[i].hasOwnProperty(key)) {
                  data[i][key] = ids[j][key]
                }
              }
            }
          }
        }
      }
    },
    setTreeData: function (data, ids, status) {
      var obj = {}
      ids = ids || []
      for (var i = 0, len = data.length; i < len; i++) {
        if (status) {
          obj.id = data[i].id
          obj[this.show] = status
          ids.push(obj)
        } else {
          obj.id = data[i].id
          obj[this.show] = status
          obj[this.expanded] = status
          ids.push(obj)
          var children = data[i].children
          if (children && children.length > 0) {
            this.setTreeData(children, ids, status)
          }
        }
      }
    }
  }
});

Vue.component('tableTreeColumn', tableTreeColumn);
