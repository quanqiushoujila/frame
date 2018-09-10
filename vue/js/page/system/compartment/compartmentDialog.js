const COMPARTMENT = '添加子级行政区划'

var compartmentDialog = {
  data: function () {
    return {
      form: {
        parentId: '',
        parentName: '',
        id: '',
        name: '',
        comLevel: '',
        code: '',
        sort: ''
      },
      props: [
        {
          label: '上级菜单',
          prop: 'parentName',
          defaultProp: 'parentId',
          inputType: 'inputTree',
          defaultProps: {
            children: 'children',
            label: 'name'
          }
        },
        {
          label: '区划名称',
          prop: 'name',
          inputType: 'input'
        },
        {
          label: '区划代码',
          prop: 'code',
          inputType: 'input'
        },
        {
          label: '区划级别',
          prop: 'comLevel',
          inputType: 'select'
        },
        {
          label: '排序',
          prop: 'sort',
          inputType: 'input'
        }
      ],
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        comLevel: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      this.getComLevel()
      this.getParentName()
    },
    getParentName: function () {
      let self = this
      api({
        url: '/sys/compartment/list',
        type: 'get',
        successFuc: function (res) {
          if (res.code === CONFIG.SUCCESS) {
            self.setOptions('parentName', self.props, res.data)
          }
        }
      })
    },
    // 类型
    getComLevel: function (data = {}) {
      var self = this
      api({
        url: '/sys/compartment/comLevel',
        type: 'get',
        successFuc: function (res) {
          if (res.code === CONFIG.SUCCESS) {
            self.setOptions('comLevel', self.props, res.data)
          }
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle: function () {
      var self = this
      this.$nextTick(function () {
        if (self.title1 === COMPARTMENT) {
          self.$set(self.props[0], 'reference', false)
        }
        if (self.title1 === CONFIG.EDIT || self.title1 === CONFIG.ADD || self.title1 === COMPARTMENT) {
          self.clearValidate('compartmentForm')
        }
        if (self.title1 === CONFIG.EDIT) {
          self.validate('compartmentForm')
        }
      })
    },
    // Dialog 关闭的回调
    closeDialogHandle: function () {
      if (this.title1 === CONFIG.EDIT || this.title1 === CONFIG.ADD) {
        this.clearForm('compartmentForm')
      }
      if (this.title1 === COMPARTMENT) {
        this.props[0].reference = true
      }
    },
    // 确定
    confirmHandle: function () {
      this.$refs.compartmentForm.submitHandle()
      this.close('compartmentDialog')
    },
    submitHandle: function (data) {
      this.close('compartmentDialog')
    },
    // 取消
    cancelHandle: function () {
      this.close('compartmentDialog')
    }

  }
}
