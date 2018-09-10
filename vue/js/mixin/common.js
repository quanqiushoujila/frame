Vue.directive('dbClick', {
  inserted: function (el) {
    el.addEventListener('click', function (e) {
      if (!el.disabled) {
        var classname = 'is-disabled'
        el.className += ' ' + classname
        el.disabled = true
        setTimeout(() => {
          var reg = new RegExp(`(\\s+|$)${classname}(\\s|$)`)
          el.className = el.className.replace(classname, '')
          el.disabled = false
        }, 1000)
      }
    })
  }
})

var commonMixin = {
  data: function() {
    return {
      // 是否是详情页
      isBtnGroup: true,
      documentClientHeight: 300,
      title1: '提示', // 新增修改标题-第一层弹窗
      title2: '提示',
      queryData: [] // 批量删除数据
    }
  },
  watch: {
    title1: function(newVal, oldVal) {
      if (newVal === '详情') {
        this.isBtnGroup = false
      } else {
        this.isBtnGroup = true
      }
    }
  },
  mounted: function() {
    var self = this
    this.$nextTick(function() {
      self.resetDocumentClientHeight()
    })
  },
  methods: {
    // 当前窗口是否有父窗口
    isTop() {
      if (self.location === top.location) {
        window.location.href = ''
      } else {
        top.location = ''
      }
    },
    // 搜索
    searchHandle: function() {
      console.log('搜索', this.searchContent)
      this.getTableData(this.searchContent)
    },
    // 批量删除
    deleteQueryHandle: function() {
      var self = this
      if (this.queryData.length > 0) {
        this.$confirm('确定要删除吗').then(function() {
          console.log('删除成功！！', self.queryData)
          this.deleteQueryApiHandle(self.queryData)
        }).catch(function() {})
      } else {
        this.warningHandle('未选择不能批量删除,请选择后操作')
      }
    },
    // 删除接口方法
    deleteQueryApiHandle: function(data) {},
    // 提醒
    warningHandle: function(msg) {
      this.$message({
        message: msg,
        type: 'warning'
      })
    },
    // 成功提醒
    successHandle: function(msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    },
    // 失败提醒
    errorHandle: function(msg) {
      this.$message.error(msg)
    },
    // 重置窗口可视高度
    resetDocumentClientHeight: function() {
      this.documentClientHeight = document.documentElement['clientHeight'] + 40
      window.onresize = function() {
        this.documentClientHeight = document.documentElement['clientHeight'] + 40
      }
    },
    // 关闭
    close: function(ref) {
      this.$refs[ref].close()
    },
    // 打开
    open: function(ref) {
      this.$refs[ref].open()
    },
    setOptions: function(name, props, data) {
      var self = this
      props.forEach(function(item) {
        if (item.prop === name) {
          self.$set(item, 'options', data)
          item.options = data
          return false
        }
      })
    },
    // 清除验证
    clearValidate: function(ref) {
      var self = this
      this.$nextTick(function() {
        self.$refs[ref].clearValidate()
      })
    },
    // 验证
    validate: function(ref) {
      var self = this
      this.$nextTick(function() {
        self.$refs[ref].validate()
      })
    },
    // 清除数据和验证
    clearForm: function(ref) {
      this.$refs[ref].clearForm()
    },
    // 重新验证
    revalidationValidate: function(ref) {
      this.clearValidate(ref)
      this.validate(ref)
    }
  }
}
