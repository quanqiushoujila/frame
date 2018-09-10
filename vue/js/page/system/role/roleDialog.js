var roleDialog = {
  data () {
    return {
      form: {
        id: '',
        name: '',
        remark: '',
        menuIds: []
      },
      props: [
        {
          label: '角色名称',
          prop: 'name',
          inputType: 'input'
        },
        {
          label: '描述',
          prop: 'remark',
          inputType: 'textarea'
        },
        {
          label: '角色授权',
          prop: 'menuIds',
          inputType: 'tree',
          defaultProps: {
            children: 'children',
            label: 'name'
          }
        }
      ],
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        prop: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created: function () {
    this.getMenuList()
  },
  methods: {
    getMenuList: function () {
      let self = this
      api({
        url: '/sys/menu/list',
        type: 'get',
        successFuc: function (res) {
          if (res.code === CONFIG.SUCCESS) {
            self.setOptions('menuIds', self.props, res.data)
          }
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle: function () {
      var self = this
      this.$nextTick(function () {
        if (self.title1 === CONFIG.DETAIL) {
          self.$refs.roleDetail.openInitTree('menuIds')
        } else {
          self.$refs.roleForm.openInitTree('menuIds')
        }
        if (self.title1 === CONFIG.EDIT || self.title1 === CONFIG.ADD) {
          self.clearValidate('roleForm')
        }

        if (self.title1 === CONFIG.EDIT) {
          self.validate('roleForm')
        }
      })
    },
    // Dialog 关闭的回调
    closeDialogHandle: function () {
      if (this.title1 === CONFIG.EDIT || this.title1 === CONFIG.ADD) {
        this.clearForm('roleForm')
        this.$refs.roleForm.clearTree('menuIds')
      }
    },
    // 确定
    confirmHandle: function () {
      this.$refs.roleForm.submitHandle()
      this.close('roleDialog')
    },
    submitHandle: function () {
      this.close('roleDialog')
    },
    // 取消
    cancelHandle: function () {
      this.close('roleDialog')
    }
  }
}
