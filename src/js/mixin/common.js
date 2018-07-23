export default {
  data () {
    return {
      title1: '提示', // 新增修改标题-第一层弹窗
      deleteQueryData: [] // 批量删除数据
    }
  },
  computed: {
    documentClientHeight: {
      get () { return this.$store.state.common.documentClientHeight },
      set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
    }
  },
  methods: {
    // 搜索
    searchHandle () {
      console.log('搜索', this.searchContent)
      this.getTableData(this.searchContent)
    },
    // 批量删除
    deleteQueryHandle () {
      if (this.deleteQueryData.length > 0) {
        this.confirmHandle('确定要删除吗').then(() => {
          console.log('删除成功！！', this.deleteQueryData)
        })
      } else {
        this.warningHandle('未选择不能批量删除,请选择后操作')
      }
    },
    // 提示
    confirmHandle (msg) {
      return new Promise((resolve, reject) => {
        this.$confirm(msg).then(_ => {
          resolve()
        }).catch(_ => {})
      })
    },
    // 提醒提醒
    warningHandle (msg) {
      this.$message({
        message: msg,
        type: 'warning'
      })
    },
    // 成功提醒
    successHandle (msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    },
    // 失败提醒
    errorHandle (msg) {
      this.$message.error(msg)
    }
  }
}
