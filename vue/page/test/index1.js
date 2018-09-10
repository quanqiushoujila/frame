var dialog1 = {
	data: function () {
		return {
      title2: '', // 第二层弹窗名称
			dialogVisible2: false, // 弹窗隐藏状态
			form2: {
        id: '',
			  chineseName: '',
			  englishName: ''
			}, // form表单
			rules2: {
			  chineseName: [
			    { required: true, message: '不能为空', trigger: 'blur' }
			  ],
        englishName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
			}, // 验证 
			formData2: {}
		}
	},
	methods: {
		// 弹窗关闭
		close2 () {
		  this.dialogVisible2 = false;
		},
		// 弹窗打开
		open2 () {
		  this.dialogVisible2 = true;
		},
		// 取消
		dialogCancel2 () {
			this.close2();
		},
		// 确认
		dialogcomfirm2 () {
			this.submitForm2('editForm2');
		},
		// 验证
		submitForm2 (formName) {
		  this.$refs[formName].validate((valid) => {
		    if (valid) {
		      console.log('submit!');
		      this.close2();
		    } else {
		      console.log('error submit!!');
		      return false;
		    }
		  });
		},
		// 重置表单
		resetForm2 (formName) {
		  this.$refs[formName].resetFields();
		},
		validate2 (formName) {
		  this.$refs[formName].validate();
		},
		clearValidate2 (formName) {
		  this.$refs[formName].clearValidate();
		},
		// Dialog 关闭的回调
		dialogClose2 () {
			if (this.title2 !== '信息项详情') {
				// this.clearValidate('editForm1')
				this.resetForm2('editForm2')
				this.form2 = resetObject(this.form2);
			}
		},
		// Dialog 打开的回调
		dialogOpen2 () {
			if (this.title2 === '信息项编辑') {
				this.$nextTick(function () {
					vm.validate2('editForm2')
				})
			}
		}
	}
}