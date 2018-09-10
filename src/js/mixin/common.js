import clonedeep from 'lodash/clonedeep'

export default {
  data () {
    return {
      // 分页参数
      pagination: {
        page: 1,
        limit: 10
      },
      title1: '提示', // 新增修改标题-第一层弹窗
      title2: '提示',
      queryData: [] // 批量删除数据
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
      if (this.queryData.length > 0) {
        this.$confirm('确定要删除吗').then(() => {
          console.log('删除成功！！', this.queryData)
          this.deleteQueryApiHandle(this.queryData)
        }).catch(() => {})
      } else {
        this.warningHandle('未选择不能批量删除,请选择后操作')
      }
    },
    // 删除
    deleteHandle (index, row) {
      this.$confirm('确定要删除吗').then(() => {
        console.log('删除成功！！', index, row)
        this.deleteApiHandle && this.deleteApiHandle(row.id)
      }).catch(() => {})
    },
    // 新增
    addHandle (title = 'title1') {
      this[title] = this.GLOBAL.ADD
      this.open && this.open()
      console.log('新增')
    },
    // 编辑
    editHandle (index, row) {
      this.formData = clonedeep(row)
      this.title1 = this.GLOBAL.EDIT
      this.beforeEditHandle && this.beforeEditHandle(index, row)
      this.open && this.open()
      console.log('编辑', index, row)
    },
    // 详情
    detailHandle (index, row) {
      this.formData = clonedeep(row)
      this.title1 = this.GLOBAL.DETAIL
      this.beforeDetailHandle && this.beforeDetailHandle(index, row)
      this.open && this.open()
      console.log('详情', index, row)
    },
    // 详情打开弹窗前处理
    beforeDetailHandle () {},
    // 编辑打开弹窗前处理
    beforeEditHandle () {},
    // 批量删除接口方法
    deleteQueryApiHandle (data) {},
    // 删除接口方法
    deleteApiHandle (id) {},
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
    },
    // 分页方法
    paginationHandle () {},
    currentChangeHandle (val) {
      this.pagination.page = val
      if (this.getTableData) {
        this.getTableData(this.pagination)
      } else {
        this.paginationHandle && this.paginationHandle()
      }
      console.log('currentChangeHandle', val)
    },
    sizeChangeHandle (val) {
      this.pagination.limit = val
      if (this.getTableData) {
        this.getTableData(this.pagination)
      } else {
        this.paginationHandle()
      }
      console.log('sizeChangeHandle', val)
    },
    // table checkbox选择
    selectionChangeHandle (ids, val) {
      console.log(ids, val)
      this.queryData = ids
    },
    // 隐藏table按钮
    hideTableBtn () {
      var data = this[arguments[0]].operation.data
      var btns = Array.prototype.slice.call(arguments, 1)
      data.forEach((item) => {
        btns.forEach((item1) => {
          if (item1 === item.name) {
            item.show = false
            return false
          }
        })
      })
    },
    // 还原table按钮
    restoreTableBtn (table = 'table') {
      this[table].operation.data.forEach((item) => {
        if (!item.show) {
          item.show = true
        }
      })
    }
  }
}
