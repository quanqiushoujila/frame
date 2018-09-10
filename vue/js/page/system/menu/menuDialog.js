const ADDCHILD = '添加子级菜单'
var menuDialog = {
  data: function () {
    return {
      iconVisible: false,
      otherData: {
        icon: ''
      },
      form: {
        id: '',
        parentName: '',
        parentId: '',
        name: '',
        icon: '',
        url: '',
        type: '',
        moduleType: '',
        permission: '',
        sort: ''
      },
      props: [
        {
          label: '上级菜单',
          prop: 'parentName',
          defaultProp: 'parentId',
          inputType: 'inputTree',
          visible: false
        },
        {
          label: '名称',
          prop: 'name',
          inputType: 'input'
        },
        {
          label: '图标',
          prop: 'icon',
          inputType: 'other'
        },
        {
          label: '链接',
          prop: 'url',
          inputType: 'input'
        },
        {
          label: '类型',
          prop: 'type',
          inputType: 'select'
        },
        {
          label: '所属模块',
          prop: 'moduleType',
          inputType: 'select'
        },
        {
          label: '权限规则',
          prop: 'permission',
          inputType: 'input'
        },
        {
          label: '排序',
          prop: 'sort',
          inputType: 'input'
        }
      ],
      rules: {
        parentName: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        moduleType: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        permission: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    icons: function () {
      return icons
    }
  },
  created: function () {
    this.getModuleType()
    this.getParentId()
    this.getType()
  },
  methods: {
    // 类型
    getType: function () {
      var self = this
      api({
        url: '/sys/menu/type',
        type: 'get',
        successFuc: function (res) {
          self.setOptions('type', self.props, res.data)
        }
      })
    },
    // 所属模块
    getModuleType: function () {
      var self = this
      api({
        url: '/sys/menu/moduleType',
        type: 'get',
        successFuc: function (res) {
          console.log('moduleType', res)
          self.setOptions('moduleType', self.props, res.data)
        }
      })
    },
    // 上级菜单
    getParentId: function () {
      var self = this
      api({
        url: '/sys/menu/parentId',
        type: 'get',
        successFuc: function (res) {
          self.setOptions('parentName', self.props, res.data)
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle: function () {
      var self = this
      this.$nextTick(function () {
        if (self.title1 === CONFIG.ADDCHILD) {
          self.$set(self.otherData, 'icon', '')
          self.$set(self.props[0], 'reference', false)
        } else {
          if (self.title1 === CONFIG.EDIT) {
            self.$set(self.otherData, 'icon', self.formData.icon)
          } else if (self.title1 === CONFIG.ADD) {
            self.$set(self.otherData, 'icon', '')
          }
        }
        if (self.title1 === CONFIG.ADD || self.title1 === ADDCHILD) {
          self.clearValidate('menuForm')
        }
        if (self.title1 === CONFIG.EDIT) {
          self.validate('menuForm')
        }
      })
    },
    // Dialog 关闭的回调
    closeDialogHandle: function () {
      if (this.title1 === CONFIG.EDIT || this.title1 === CONFIG.ADD || this.title1 === ADDCHILD) {
        this.clearForm('menuForm')
      }
      if (this.title1 === ADDCHILD) {
        this.$set(this.props[0], 'reference', true)
      }
    },
    // 确定
    confirmHandle: function () {
      this.$refs.menuForm.submitHandle()
      this.close('menuDialog')
    },
    submitHandle: function (data) {
      this.close('menuDialog')
    },
    iconChangeHandle: function (icon) {
      this.$set(this.otherData, 'icon', icon)
      this.iconVisible = false
    },
    // 取消
    cancelHandle: function () {
      this.close('menuDialog')
    }
  }
}
