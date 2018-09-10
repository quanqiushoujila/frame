import clonedeep from 'lodash/clonedeep'
import {resetObject} from 'js/util/index'
export default {
  data () {
    return {
      // 是否是详情页
      isBtnGroup: true,
      // 开关弹窗
      dialogVisible: false,
      // 弹窗ref
      dialogRef: '',
      // 表单form
      formRef: '',
      removeRules: [],
      oldRules: {}
    }
  },
  mounthed () {
    if (this.rules) {
      this.oldRules = clonedeep(this.rules)
    }
  },
  watch: {
    title (newVal, oldVal) {
      if (newVal === this.GLOBAL.DETAIL) {
        this.isBtnGroup = false
      } else {
        this.isBtnGroup = true
      }
    },
    formData: {
      handler (newVal) {
        for (let key in this.form) {
          const value = clonedeep(newVal[key])
          this.form[key] = value
        }
      },
      deep: true
    }
  },
  methods: {
    // 关闭
    close () {
      this.$refs[this.dialogRef].close()
    },
    // 打开
    open () {
      this.$refs[this.dialogRef].open()
    },
    // 取消
    cancelHandle () {
      this.close()
    },
    // 按钮是否被禁用
    toggleDisabledButton () {
      this.$refs[this.dialogRef].toggleDisabledButton()
    },
    // 确定
    confirmHandle () {
      this.$refs[this.formRef].submitHandle()
    },
    setOptions (name, props, data) {
      props.forEach((item) => {
        if (item.prop === name) {
          this.$set(item, 'options', data)
          item.options = data
          return false
        }
      })
    },
    // 清除验证
    clearValidate (ref) {
      this.$nextTick(() => {
        this.$refs[ref || this.formRef].clearValidate()
      })
    },
    // 验证
    validate (ref) {
      this.$nextTick(() => {
        this.$refs[ref || this.formRef].validate()
      })
    },
    // 重新验证
    revalidationValidate (ref) {
      this.clearValidate(ref)
      this.validate(ref)
    },
    // 表单提交操作
    submitHandle (data) {
      this.close()
    },
    // 去除验证规则
    changeRulesHandle () {
      let rules = this.rules
      this.removeRules.forEach(function (item) {
        for (let key in rules) {
          if (item === key) {
            delete rules[key]
            break
          }
        }
      })
      this.revalidationValidate()
    },
    // 还原验证规则
    restoreRulesHandle () {
      this.rules = clonedeep(this.oldRules)
    },
    // 数据重置
    clearForm (data) {
      resetObject(data || this.formData)
      this.$refs[this.formRef].resetForm()
    }
  }
}
