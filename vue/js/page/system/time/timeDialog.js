'use strict';

var timeDialog = {
  data: function data() {
    return {
      form: {
        jobId: '',
        beanName: '',
        methodName: '',
        params: '',
        cronExpression: '',
        remark: ''
      },
      props: [{
        prop: 'beanName',
        label: 'bean名称',
        inputType: 'input'
      }, {
        prop: 'methodName',
        label: '方法名称',
        inputType: 'input'
      }, {
        prop: 'params',
        label: '参数',
        inputType: 'input'
      }, {
        prop: 'cronExpression',
        label: 'cron表达式',
        inputType: 'input'
      }, {
        prop: 'remark',
        label: '备注',
        inputType: 'input'
      }],
      rules: {
        beanName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        methodName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        cronExpression: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
    // Dialog 打开的回调
    openDialogHandle: function openDialogHandle() {
      if (this.title === CONFIG.EDIT) {
        this.validate('timeForm');
      }
      if (this.title === CONFIG.EDIT || this.title === CONFIG.ADD) {
        this.clearValidate('timeForm');
      }
    },
    // Dialog 关闭的回调
    closeDialogHandle: function closeDialogHandle() {
      if (this.title === CONFIG.EDIT || this.title === CONFIG.ADD) {
        this.clearForm('timeForm');
      }
    },

    // 确定
    confirmHandle: function confirmHandle() {
      this.$refs.timeForm.submitHandle();
      this.close('timeDialog');
    },
    submitHandle: function submitHandle(data) {
      this.close('timeDialog');
    },
    cancelHandle: function cancelHandle() {
      this.close('timeDialog');
    }
  }
};