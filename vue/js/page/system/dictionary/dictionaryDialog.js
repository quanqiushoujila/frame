var ADDCHILD = '添加字典项'
var dictionaryDialog = {
  data: function () {
    return {
      isBtnGroup: false,
      searchContent: {
        name: ''
      },
      form: {
        parentId: '',
        id: '',
        name: '',
        value: '',
        type: '',
        sort: ''
      },
      props: [{
        label: '字典名称',
        prop: 'name',
        inputType: 'input'
      },
      {
        label: '字典值',
        prop: 'value',
        inputType: 'input'
      },
      {
        label: '类型',
        prop: 'type',
        inputType: 'select'
      },
      {
        label: '排序',
        prop: 'sort',
        inputType: 'input'
      }
      ],
      rules: {
        value: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created: function () {
    this.getType()
  },
  methods: {
    // 类型
    getType: function (data) {
      var self = this
      api({
        url: '/sys/dictionary/type',
        type: 'get',
        successFuc: function (res) {
          if (res.code === CONFIG.SUCCESS) {
            self.setOptions('type', self.props, res.data)
          }
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle: function () {
      var self = this
      this.$nextTick(function () {
        if (self.title1 === CONFIG.ADDCHILD || self.title1 === CONFIG.EDIT || self.title1 === CONFIG.ADD) {
          self.clearValidate('dictionaryForm')
        }
        if (self.title1 === CONFIG.EDIT) {
          self.validate('dictionaryForm')
        }
      })
    },
    // Dialog 关闭的回调
    closeDialogHandle: function () {
      if (this.title1 === CONFIG.DICTIONARY || this.title1 === CONFIG.EDIT || this.title1 === CONFIG.ADD) {
        this.clearForm('dictionaryForm')
      }
    },
    // 确定
    confirmHandle: function () {
      this.$refs.dictionaryForm.submitHandle()
    },
    submitHandle: function (data) {
      this.close('dictionaryDialog')
    },
    cancelHandle: function () {
      this.close('dictionaryDialog')
    }
  }
}
