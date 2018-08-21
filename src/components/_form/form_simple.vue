<template>
  <div>
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      :label-width="labelWidth"
      class="form">
      <el-form-item
        :label="data.label"
        :prop="hasProps(data.prop)"
        v-for="data in formProps"
        :key="data.prop">
        <template v-if="data.inputType === 'input' && data.show == null ? true : data.show">
          <el-input v-model="form[data.prop]"></el-input>
        </template>
        <template v-if="data.inputType === 'select' && data.show == null ? true : data.show">
          <el-select v-model="form[data.prop]" style="width: 100%">
            <el-option
              v-for="item in data.options"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template v-if="data.inputType === 'radio' && data.show == null ? true : data.show">
          <el-radio-group v-model="form[data.prop]">
            <el-radio
              v-model="radio"
              :label="item.id"
              v-for="item in data.options"
              :key="item.id">
              {{item.name}}
            </el-radio>
          </el-radio-group>
        </template>
        <template v-if="data.inputType === 'checkbox' && data.show == null ? true : data.show">
          <el-checkbox-group v-model="form[data.prop]">
            <el-checkbox
              :label="item.label"
              :name="form[data.prop]"
              v-for="item in data.options"
              :key="item.id"
              >
            </el-checkbox>
          </el-checkbox-group>
        </template>
        <template v-if="data.inputType === 'datePicker' && data.show == null ? true : data.show">
          <el-date-picker
            style="width: 100%;"
            v-model="form[data.prop]"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </template>
        <template v-if="data.inputType === 'textarea' && data.show == null ? true : data.show">
          <el-input
            type="textarea"
            v-model="form[data.prop]">
          </el-input>
        </template>
        <template v-if="data.inputType === 'cascader' && data.show == null ? true : data.show">
          <el-cascader
            :options="data.options"
            v-model="form[data.prop]"
            @change="handleCascaderChange">
          </el-cascader>
        </template>
        <template v-if="data.inputType === 'tree' && data.show == null ? true : data.show">
          <el-tree
            :check-strictly="data.checkStrictly || false"
            :data="data.options"
            show-checkbox
            default-expand-all
            node-key="id"
            :ref="data.prop"
            highlight-current
            @check="((a, b) => {checkHandle(data.prop, a, b)})"
            :props="data.defaultProps || treeDefaultProps">
          </el-tree>
        </template>
        <template v-if="data.inputType === 'inputTree' && data.show == null ? true : data.show">
          <el-popover
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
                :ref="data.prop"
                :props="data.defaultProps || defaultProps"/>
            </div>
            <el-input v-model="form[data.prop]" readonly slot="reference"></el-input>
          </el-popover>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import clonedeep from 'lodash/clonedeep'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import {resetObject} from 'js/util'
export default {
  name: 'kForm',
  props: {
    formProps: {
      type: Array,
      default () {
        return []
      }
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    rules: {
      type: Object,
      default () {
        return {}
      }
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    form: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      treeProp: {},
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeDefaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    data: {
      handler (newVal) {
        if (isPlainObject(newVal)) {
          for (let key in this.form) {
            this.$set(this.form, key, clonedeep(newVal[key]))
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    hasProps (prop) {
      let rules = this.rules
      for (let key in rules) {
        if (prop === key && isArray(rules[key])) {
          return key
        }
      }
      return ''
    },
    clearForm () {
      resetObject(this.form)
    },
    // 级联
    handleCascaderChange (value) {

    },
    submitHandle () {
      let data = clonedeep(this.form)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('submit!', data)
          this.$emit('submitHandle', data)
        } else {
          return false
        }
      })
    },
    validate () {
      this.$refs.ruleForm.validate()
    },
    clearValidate () {
      this.$refs.ruleForm.clearValidate()
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    // 上级菜单选择 inputtree
    treeCurrentChangeHandle (data, treeData, node) {
      // console.log(data, treeData, node)
      this.form[data.prop] = treeData.name
      this.form[data.defaultProp] = treeData.id
    },
    // 当复选框被点击的时候触发 tree
    checkHandle (prop, checkedNodes, checkedKeys) {
      // console.log(prop, checkedNodes, checkedKeys)
      this.form[prop] = checkedKeys.checkedKeys
    },
    // 初始化tree
    initTree (prop, val = []) {
      this.form[prop] = val
      this.$refs[prop][0].setCheckedKeys(val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
