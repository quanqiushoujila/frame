<template>
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
      <template v-if="data.inputType === 'input'">
        <el-input v-model="form[data.prop]"></el-input>
      </template>
      <template v-if="data.inputType === 'select'">
        <el-select v-model="form[data.prop]" style="width: 100%">
          <el-option
            v-for="item in data.options"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </template>
      <template v-if="data.inputType === 'radio'">
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
      <template v-if="data.inputType === 'checkbox'">
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
      <template v-if="data.inputType === 'datePicker'">
        <el-date-picker
          style="width: 100%;"
          v-model="form[data.prop]"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </template>
      <template v-if="data.inputType === 'textarea'">
        <el-input
          type="textarea"
          v-model="form[data.prop]">
        </el-input>
      </template>
      <template v-if="data.inputType === 'cascader'">
        <el-cascader
          :options="data.options"
          v-model="form[data.prop]"
          @change="handleCascaderChange">
        </el-cascader>
      </template>
      <template v-if="data.inputType === 'inputTree'">
        <el-popover
          placement="bottom-start"
          width="400"
          trigger="click">
          <div class="max-height">
            <el-tree
              node-key="id"
              @current-change="treeCurrentChangeHandle"
              :highlight-current="true"
              :default-expand-all="true"
              :expand-on-click-node="false"
              :data="data.options"
              :props="data.defaultProps || defaultProps"/>
          </div>
          <el-input v-model="form[data.prop]" readonly slot="reference"></el-input>
        </el-popover>
      </template>
    </el-form-item>
  </el-form>
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
    setTreeProps (val) {
      console.log(val)
      // this.treeProp.name =
    },
    treeCurrentChangeHandle (data, node) {
      console.log('eeee', data, node)
      // this.$emit('menuListTreeCurrentChangeHandle', data, node)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
