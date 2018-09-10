var dialog = {
	data: function () {
		return {
      title1: '', // 第一层弹窗名称
			column1: 3,
			tableSelect1: [{id: 1, label: '省本级'}, {id: 2, label: '省委办公厅'}],
			tableSelect2: [{id: 1, label: '电子文件'}, {id: 2, label: '数据库'}],
			tableSelect3: [{id: 1, label: '信用服务'}, {id: 2, label: '医疗卫生'}],
			dialogVisible1: false, // 弹窗隐藏状态
			form1: {
				id: '',
			  name: '',
			  from: '',
			  type: '',
			  sort: ''
			}, // form表单
			rules1: {
			  name: [
			    { required: true, message: '不能为空', trigger: 'blur' }
			  ],
			  from: [
			    { required: true, message: '不能为空', trigger: 'change' }
			  ],
			  type: [
			    { required: true, message: '不能为空', trigger: 'change' }
			  ],
			  sort: [
			    { required: true, message: '不能为空', trigger: 'change' }
			  ]
			}, // 验证 
			formData1: {}
		}
	},
	methods: {
		// 弹窗关闭
		close1 () {
		  this.dialogVisible1 = false;
		},
		// 弹窗打开
		open1 () {
		  this.dialogVisible1 = true;
		},
		// 取消
		dialogCancel1 () {
			this.close1();
		},
		// 确认
		dialogcomfirm1 () {
			this.submitForm('editForm1');
		},
		// 验证
		submitForm(formName) {
		  this.$refs[formName].validate((valid) => {
		    if (valid) {
		      console.log('submit!');
		      this.close1();
		    } else {
		      console.log('error submit!!');
		      return false;
		    }
		  });
		},
		// 重置表单
		resetForm(formName) {
		  this.$refs[formName].resetFields();
		},
		validate (formName) {
		  this.$refs[formName].validate();
		},
		clearValidate (formName) {
			this.$refs[formName].clearValidate();
		},
		// Dialog 关闭的回调
		dialogClose1 () {
			if (this.title1 !== '详情') {
				// this.clearValidate('editForm1')
				this.resetForm('editForm1')
				this.form1 = resetObject(this.form1);
			}
		},
		// Dialog 打开的回调
		dialogOpen1 () {
			if (this.title1 === '编辑') {
				this.$nextTick(function () {
					vm.validate('editForm1')
				})
			}
		}
	}
}