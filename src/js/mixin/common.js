export default {
  data () {
    return {
      searchText: '', // 搜索内容
      dialogVisible1: false, // 第一层弹窗
      dialogVisible2: false, // 第二层弹窗
      dialogVisible3: false, // 第三层弹窗
      dialogVisible4: false, // 第四层弹窗
      deleteQueryData: [] // 批量删除数据
    }
  }
  methods: {
    // 添加操作
    addHandle () {
      this.dialogVisible1 =  true
    },
    // 搜索 只适用于table
    searchHandle () {
    },
    // 批量删除
    deleteQuery () {
      if (deleteQueryData.length > 0) {
        this.confirmHandle('确定要删除吗').then(() => {
          console.log('删除成功！！')
        })
      } else {
        this.warningHandle('请先选择')
      }
    },
    // 提示
    confirmHandle (msg) {
      return new Promise((resolve, reject) => {
        this.$confirm(msg).then(_ => {
          reject();
        }).catch(_ => {});
      })
    },
    // 提醒提醒
    warningHandle (msg) {
      this.$message({
        message: msg,
        type: 'warning'
      });
    },
    // 成功提醒
    successHandle (msg) {
      this.$message({
        message: msg,
        type: 'success'
      });
    },
    // 失败提醒
    errorHandle (msg) {
      this.$message.error(msg)
    }
  }
}
