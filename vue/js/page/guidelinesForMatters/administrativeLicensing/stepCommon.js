var stepCommon = {
  data: function () {
    var validatorOriginalCode = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('该字段不能为空'))
      } else if (value.length < 10) {
        return callback(new Error('原代码需大于等于十位'))
      } else {
        return callback()
      }
    }
    var longTextVerification = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('该字段不能为空'))
      } else if (value.length > 200) {
        return callback(new Error('输入字数不能大于200个'))
      } else {
        return callback()
      }
    }
    var chineseVerification = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('该字段不能为空'))
      } else if (!/[\u4e00-\u9fa5]/.test(value)) {
        return callback(new Error('该字段必须为全中文输入'))
      } else {
        return callback()
      }
    }
    var simpleVerification = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('该字段不能为空'))
      } else if (!/^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/.test(value)) {
        return callback(new Error('禁止使用除-外的特殊字符'))
      } else {
        return callback()
      }
    }
    var webUrl = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('该字段不能为空'))
      } else if (!/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.test(value)) {
        return callback(new Error('请输入正确的网址'))
      } else {
        return callback()
      }
    }
    var phone = function (rule, value, callback) {
      if (!value) {
        return callback(new Error('该字段不能为空'))
      } else if (!/[0-9]{7,11}/.test(value)) {
        return callback(new Error('请输入正确的联系方式'))
      } else {
        return callback()
      }
    }
    return {
      stepActive: 0,
      photoUpdateTypeTips: '可上传jpg | gif | png | zip | rar | pdf | xls | doc | slsx | docx | ppt | pptx格式文件',
      rulesOfStepOne: {
        matterOriginalCode: [
          {validator: validatorOriginalCode, trigger: 'blur'}
        ],
        setTheBasis: [
          {validator: longTextVerification, trigger: 'blur'}
        ],
        divisionOfAuthority: [
          {validator: longTextVerification, trigger: 'blur'}
        ],
        exerciseContentText: [
          {validator: longTextVerification, trigger: 'blur'}
        ],
        organizationName: [
          {validator: chineseVerification, trigger: 'blur'}
        ],
        simpleVerification: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        subjectProperty: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        unitInformation: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        serviceOptionSelection: [
          {type: 'array', required: true, message: '请至少选择一个服务对象', trigger: 'change'}
        ],
        exerciseLevelSelection: [
          {type: 'array', required: true, message: '请至少选择一个行使层级', trigger: 'change'}
        ]
      },
      rulesOfStepTwo: {
        admissibility: [
          {validator: longTextVerification, trigger: 'blur'}
        ],
        specialProcedureNameSelection: [
          {type: 'array', required: true, message: '请至少选择一个特殊程序名称', trigger: 'change'}
        ],
        specialProcedureManager: [
          {validator: chineseVerification, trigger: 'blur'}
        ],
        specialProcedureTimer: [
          { required: true, message: '建议时间不能为空', trigger: 'blur'}
        ],
        xhargeStandard: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        chargeStandard: [
          {required: true, message: '收费标准不能为空', trigger: 'blur'}
        ],
        chargeBasis: [
          {required: true, message: '收费依据', trigger: 'blur'}
        ],
        quantitativeRestriction: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        resultName: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        offlineHandlingContentText: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        onlineHandlingContentText: [
          {validator: webUrl, trigger: 'blur'}
        ],
        telephoneHandlingContentText: [
          {validator: phone, trigger: 'blur'}
        ],
        handleTheAddress: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        handleTheTime: [
          { required: true, message: '办理时间不能为空', trigger: 'blur'}
        ],
        trafficGuidance: [
          {validator: simpleVerification, trigger: 'blur'}
        ]
      },
      rulesOfStepThree: {
        applicantRights: [
          {validator: longTextVerification, trigger: 'blur'}
        ],
        applicantObligation: [
          {validator: longTextVerification, trigger: 'blur'}
        ],
        ARdepartment: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        ARaddress: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        ARtelephone: [
          {validator: phone, trigger: 'blur'}
        ],
        ARwebsite: [
          {validator: webUrl, trigger: 'blur'}
        ],
        APdepartment: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        APaddress: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        APtelephone: [
          {validator: phone, trigger: 'blur'}
        ],
        APwebsite: [
          {validator: webUrl, trigger: 'blur'}
        ]
      },
      rulesOfTableDialog: {
        materialName: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        materialSequenceNumber: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        numberOfOriginalParts: [
          {required: true, type: 'number', message: '该字段不能为空且必须是数字'}
        ],
        copyNumber: [
          {required: true, type: 'number', message: '该字段不能为空且必须是数字'}
        ],
        sourceChannel: [
          {validator: simpleVerification, trigger: 'blur'}
        ],
        notificationOfNotes: [
          {validator: simpleVerification, trigger: 'blur'}
        ]
      },
      rulesOfStepFour: {
        intermediaryChineseName: [
          { validator: chineseVerification, trigger: 'blur' }
        ],
        intermediaryServiceContent: [
          { validator: simpleVerification, trigger: 'blur' }
        ],
        intermediaryChargeStandard: [
          { validator: simpleVerification, trigger: 'blur' }
        ],
        intermediaryChargeAmount: [
          { validator: simpleVerification, trigger: 'blur' }
        ],
        onlineBookingAddress: [
          { validator: webUrl, trigger: 'blur' }
        ],
        payWaySelection: [
          { required: true, message: '改项为必选项', trigger: 'change' }
        ],
        logisticSelection: [
          { required: true, message: '改项为必选项', trigger: 'change' }
        ],
        consultingPhone: [
          { validator: phone, trigger: 'blur' }
        ],
        complaintTelephone: [
          { validator: phone, trigger: 'blur' }
        ],
        commonProblem: [
          { validator: longTextVerification, trigger: 'blur' }
        ]
      },
      uploadDialog: {
        title: '',
        visible: false,
        action: '',
        fileList: [],
        sender: ''
      }
    }
  },
  methods: {
    nextStep: function () {
      var self = this
      switch (this.stepActive) {
      case 0:
        this.submitForm('stepOneFormData', function (err, res) {
          if (!err) {
            self.stepActive++
          } else {
            self.$message({
              message: '请规范填写表单后再点击下一步',
              type: 'warning'
            })
          }
        })
        break
      case 1:
        this.submitForm('stepTwoFormData', function (err, res) {
          if (!err) {
            self.stepActive++
          } else {
            self.$message({
              message: '请规范填写表单后再点击下一步',
              type: 'warning'
            })
          }
        })
        break
      case 2:
        this.submitForm('stepThreeFormData', function (err, res) {
          if (!err) {
            self.stepActive++
          } else {
            self.$message({
              message: '请规范填写表单后再点击下一步',
              type: 'warning'
            })
          }
        })
        break
      case 3:
        this.submitForm('stepFourFormData', function (err, res) {
          if (!err) {
            self.stepActive = 0
            console.log($.extend({}, self.stepOneFormData, self.stepTwoFormData, self.stepThreeFormData, self.stepFourFormData))
            self.closeSteps()
            if (this.DETAILS === true) {
              self.$message({
                message: '提交成功！',
                type: 'success'
              })
            }
            self.resetStep('all')
          } else {
            self.$message({
              message: '请规范填写表单后再提交',
              type: 'warning'
            })
          }
        })
        break
      }
    },
    prveStep: function () {
      if (this.stepActive >= 1) {
        this.stepActive--
      }
    },
    resetStep: function (val) {
      if (this.stepActive === 0) {
        this.$refs['stepOneFormData'].resetFields()
      } else if (this.stepActive === 1) {
        this.$refs['stepTwoFormData'].resetFields()
      } else if (this.stepActive === 2) {
        this.$refs['stepThreeFormData'].resetFields()
      } else if (this.stepActive === 3) {
        this.$refs['stepFourFormData'].resetFields()
      } else if (val === 'all') {
        this.$refs['stepOneFormData'].resetFields()
        this.$refs['stepTwoFormData'].resetFields()
        this.$refs['stepThreeFormData'].resetFields()
        this.$refs['stepFourFormData'].resetFields()
      }
    },
    submitForm: function (formName, cb) {
      this.$refs[formName].validate(function (valid) {
        if (!valid) {
          cb(true)
        } else {
          cb(null, valid)
        }
      })
    },
    uploadOnRemove: function (file, fileList) {
      console.log('--------uploadOnRemove--------')
      switch (this.uploadDialog.sender) {
      case 0:
        this.tableFormData.materialSample = fileList
        break
      case 1:
        this.tableFormData.demonstrationText = fileList
        break
      case 2:
        this.stepTwoFormData.onlineProcessFileList = fileList
        break
      case 3:
        this.stepTwoFormData.offlinePocessFileList = fileList
        break
      case 4:
        this.stepTwoFormData.resultSampleFlieList = fileList
      }
      console.log('------------EventEnd-----------')
    },
    uploadBeforeRemove: function (file, fileList) {
      console.log('--------uploadBeforeRemove--------')
      console.log('file: ', file)
      console.log('fileList', fileList)
      console.log('--------------EventEnd------------')
    },
    uploadOnError: function (err, file, fileList) {
      console.log('---------uploadOnError---------')
      console.log('err: ', err)
      console.log('file: ', file)
      console.log('fileList', fileList)
      console.log('------------EventEnd-----------')
    },
    uploadOnSuccess: function (res, file, fileList) {
      console.log('--------uploadOnSuccess--------')
      switch (this.uploadDialog.sender) {
      case 0:
        this.tableFormData.materialSample = fileList
        break
      case 1:
        this.tableFormData.demonstrationText = fileList
        break
      case 2:
        this.stepTwoFormData.onlineProcessFileList = fileList
        break
      case 3:
        this.stepTwoFormData.offlinePocessFileList = fileList
        break
      case 4:
        this.stepTwoFormData.resultSampleFlieList = fileList
      }
      console.log('------------EventEnd-----------')
    },
    uploadDialogClose: function () {
      console.log('close dialog')
      this.uploadDialog.visible = false
      this.$set(this.uploadDialog, 'action', '')
      this.$set(this.uploadDialog, 'fileList', [])
    },
    uploadDialogOpen: function (action, fileList, sender) {
      console.log('open dialog')
      this.$set(this.uploadDialog, 'action', action)
      this.$set(this.uploadDialog, 'fileList', fileList)
      this.$set(this.uploadDialog, 'sender', sender)
      this.uploadDialog.visible = true
    },
    messageBox: function (tip, title, cb) {
      this.$confirm(tip, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        cb(null, true)
      }).catch(function () {
        cb(true)
      })
    },
    cancelStep: function () {
      this.$refs['stepOneFormData'].resetFields()
      this.$refs['stepTwoFormData'].resetFields()
      this.$refs['stepThreeFormData'].resetFields()
      this.$refs['stepFourFormData'].resetFields()
      this.stepActive = 0
      this.closeSteps()
    }
  }
}
