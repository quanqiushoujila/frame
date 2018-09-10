var userDialog = {
  data: function () {
    var checkTelephone = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('不能为空'))
      } else {
        if (!isMobile(value)) {
          callback(new Error('手机号错误'))
        }
        callback()
      }
    }
    return {
      width: 'middle',
      form: {
        id: '',
        username: '',
        realname: '',
        deptName: '',
        roleId: '',
        email: '',
        telephone: '',
        companyControl: []
      },
      props: [
        {
          label: '登录名',
          prop: 'username',
          inputType: 'input'
        },
        {
          label: '真实姓名',
          prop: 'realname',
          inputType: 'input'
        },
        {
          label: '所属单位',
          prop: 'deptName',
          inputType: 'select',
          options: []
        },
        {
          label: '选择角色',
          prop: 'roleId',
          inputType: 'select',
          options: []
        },
        {
          label: '邮箱',
          prop: 'email',
          inputType: 'input'
        },
        {
          label: '电话',
          prop: 'telephone',
          inputType: 'input'
        },
        {
          label: '管理部门',
          prop: 'companyControl',
          inputType: 'tree'
        }
      ],
      rules: {
        username: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        roleId: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        email: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        telephone: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: checkTelephone, trigger: 'blur' }
        ]
      },
      oldRules: {}
    }
  },
  created: function () {
    this.getDeptName()
    this.getRole()
    this.getTree()
    this.oldRules = clonedeep(this.rules)
  },
  methods: {
    // 所属单位数据
    getDeptName: function () {
      var self = this
      api({
        url: '/sys/user/deptName',
        type: 'get',
        successFuc: function (res) {
          self.setOptions('deptName', self.props, res.data)
        }
      })
    },
    // 选择角色数据
    getRole: function () {
      var self = this
      api({
        url: '/sys/user/role',
        type: 'get',
        successFuc: function (res) {
          self.setOptions('roleId', self.props, res.data)
        }
      })
    },
    // 管理部门
    getTree: function () {
      var self = this
      api({
        url: '/sys/user/companyControl',
        type: 'get',
        successFuc: function (res) {
          self.setOptions('companyControl', self.props, res.data)
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle: function () {
      var self = this
      this.$nextTick(function () {
        if (self.title1 === CONFIG.DETAIL) {
          self.$refs.userDetail.openInitTree('companyControl')
        } else {
          self.$refs.userForm.openInitTree('companyControl')
        }
        if (self.title1 === CONFIG.EDIT || self.title1 === CONFIG.ADD) {
          self.clearValidate('userForm')
        }

        if (self.title1 === CONFIG.EDIT) {
          self.validate('userForm')
        }
      })
    },
    // Dialog 关闭的回调
    closeDialogHandle: function () {
      if (this.title1 === CONFIG.EDIT || this.title1 === CONFIG.ADD) {
        this.clearForm('userForm')
        this.$refs.userForm.clearTree('companyControl')
      }
    },
    // 确定
    confirmHandle: function () {
      this.$refs.userForm.submitHandle()
    },
    submitHandle: function () {
      var self = this
      // this.$refs.userDialog.toggleDisabledButton()
      // setTimeout(function () {
      //   self.$refs.userDialog.toggleDisabledButton()
      // }, 1000)
      this.close('userDialog')
    },
    deptNameSelectChangeHandle: function (val) {
      console.log(val)
    },
    // 取消
    cancelHandle: function () {
      this.close('userDialog')
    }
  }
}
