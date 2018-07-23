export default {
  data () {
    return {
      // 是否是详情页
      hasDetail: true,
      // 开关弹窗
      dialogVisible: false
    }
  },
  watch: {
    title (newVal, oldVal) {
      if (newVal === this.GLOBAL.DETAIL) {
        this.hasDetail = true
      } else {
        this.hasDetail = false
      }
    }
  },
  methods: {
    // 关闭
    close () {
      this.dialogVisible = false
    },
    // 打开
    open () {
      this.dialogVisible = true
    },
    // 取消
    cancelHandle () {
      this.dialogVisible = false
    },
    // 关闭前的回调，会暂停 Dialog 的关闭
    beforeCloseHandle () {
      this.dialogVisible = false
    },
    setOptions (name, props, data) {
      props.forEach((item) => {
        if (item.prop === name) {
          this.$set(item, 'options', data)
          item.options = data
          return false
        }
      })
    }
  }
}
