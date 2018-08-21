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
      formRef: ''
    }
  },
  watch: {
    title (newVal, oldVal) {
      if (newVal === this.GLOBAL.DETAIL) {
        this.isBtnGroup = false
      } else {
        this.isBtnGroup = true
      }
    }
  },
  methods: {
    // 关闭
    close () {
      this.$refs[this.dialogRef].close()
    },
    // 打开
    open () {
      console.log('open', this.dialogRef)
      this.$refs[this.dialogRef].open()
    },
    // 取消
    cancelHandle () {
      this.close()
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
    // 清除数据和验证
    clearForm (ref) {
      this.$refs[ref || this.formRef].clearForm()
    },
    // 重新验证
    revalidationValidate (ref) {
      this.clearValidate(ref)
      this.validate(ref)
    },
    // 表单提交操作
    submitHandle (data) {
      this.close()
    }
  }
}
