var logDialog = {
  data: function () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    open: function () {
      this.dialogVisible = true
    },
    beforeCloseHandle: function () {
      this.dialogVisible = false
    }
  }
}
