var stepDetils = {
  data: function () {
    return {
      step1: {
        matterList: [], // 事项列表
        exerciseLevels: [], // 行使层级列表
        exerciseTypes: [], // 行使类型列表
        subjectPropertys: [], // 实施主体性质列表
        hasJointAgencies: [], // 是否存在联办机构
        jointAgencies: [] // 联办机构列表
      },
      stepOneFormData: {
        matterOriginalCode: '', // 事项原代码
        setTheBasis: '', // 设定依据
        divisionOfAuthority: '', // 权限划分
        exerciseContentText: '', // 行使内容
        organizationName: '', // 名称
        unitInformation: '', // 责任处科室单位信息
        subjectProperty: '', // 受委托组织
        matterCode: '', // 事项代码
        matterType: '', // 事项类型
        serviceOptionSelection: [], // 选中服务对象
        exerciseLevelSelection: [], // 选中行使层级
        matterSelection: 0, // 选中事项
        exerciseTypeSelection: 0, // 选中行使类型
        subjectPropertySelection: 0, // 选中实施主体性质
        hasJointAgenciySelection: 0, // 联办机构情况
        jointAgenciesSelection: 0, // 选中联办机构
        entrustedOrganization: 0 // 受委托组织
      },
      step2: {
        dialogVisiable: false,
        dialogTitle: '',
        specialProcedureNameList: [], // 特殊程序名称列表
        certificateTypeList: [], // 办件类型列表
        uploadFileList: [],
        uploadStatus: 0, // 0=线上 1=线下
        runningTimeLimitList: [{value: 0, label: '工作日'}, {value: 1, label: '天'}],
        scopeOfOperations: [], // 通办范围列表
        runningSystemList: [] // 运行环境列表
      },
      stepTwoFormData: {
        admissibility: '', // 受理条件
        onlineProcess: true, // 网上办理流程 默认选中
        onlineProcessFileList: [{name: 'onlineFile.zip', url: '123'}, {name: 'onlineFile.exe', url: '456'}, {name: 'onlineFile.rar', url: '789'}], // 线上办理文件列表
        offlineProcess: true, // 窗口办理流程 默认选中
        offlinePocessFileList: [{name: 'offlineFile.zip', url: '123'}, {name: 'offlineFile.exe', url: '456'}, {name: 'offlineFile.rar', url: '789'}], // 窗口办理文件列表
        specialTache: true, // 特殊环节 默认选中
        specialProcedureNameSelection: [], // 特殊程序名称选中项
        specialProcedureManager: '', // 特殊程序办理人
        specialProcedureTimer: '', // 特殊程序建议时间
        hasCharge: 0, // 是否收费 默认否
        chargeStandard: '', // 特殊程序收费标准
        chargeBasis: '', // 特殊程序收费依据
        certificateTypeSelection: 0, // 办件类型 选中项
        statutoryDeadlines: 0, // 法定结办时限
        statutoryDeadlinesUnitSelection: 0, // 法定结办 单位
        commitmentDeadlines: 0, // 承诺结办时限
        commitmentDeadlinesUnitSelection: 0, // 承诺结办 单位
        onlineHandling: true, // 线上办理 默认选中
        offlineHandling: true, // 窗口办理 默认选中
        telephoneHandling: true, // 电话办理 默认选中
        handleTheAddress: '', // 办理地点
        handleTheTime: '', // 办理时间
        trafficGuidance: '', // 交通指引
        onlineHandlingContentText: '', // 线上办理信息
        offlineHandlingContentText: '', // 线下办理信息
        telephoneHandlingContentText: '', // 电话办理信息
        ScopeOfOperaSelection: 0, // 通办 选中项
        runningSystemSelection: 0, // 运行系统 选中项
        quantitativeRestriction: '', // 数量限制
        resultName: '', // 结果名称
        resultSampleFlieList: [{name: '结果样本.zip', url: '123'}, {name: '结果样本.exe', url: '456'}, {name: '结果样本.rar', url: '789'}] // 样本结果列表
      },
      step3: {
        materialSpecification: [{label: ''}] // 材料规格列表
      },
      tableDialog: {
        title: '',
        visible: false,
        details: true
      },
      tableFormData: {
        materialName: '', // 材料名称
        materialSequenceNumber: '', // 材料序号
        materialSpecification: 0, // 材料规格
        numberOfOriginalParts: 1, // 原件份数
        copyNumber: 0, // 复印件份数
        sourceChannel: '', // 来源渠道
        materialSample: [{name: '材料样本.zip', url: '123'}, {name: '材料样本.exe', url: '456'}, {name: '材料样本.rar', url: '789'}], // 材料样本
        demonstrationText: [{name: '示范文本.zip', url: '123'}, {name: '示范文本.exe', url: '456'}, {name: '示范文本.rar', url: '789'}], // 示范文本
        notificationOfNotes: '' // 填报须知
      },
      stepThreeFormData: {
        applicationMaterials: [],
        applicantRights: '', // 申请人权利
        applicantObligation: '', // 申请人义务
        ARdepartment: '',
        APdepartment: '',
        ARaddress: '',
        APaddress: '',
        ARtelephone: '',
        APtelephone: '',
        ARwebsite: '',
        APwebsite: ''
      },
      step4Select: [{ value: 0, label: '是' }, { value: 1, label: '否' }],
      LogisticsList: [],
      PayWayList: [],
      stepFourFormData: {
        hasIntermediaryServicesSelection: 0, // 中介服务 选中项
        intermediaryChineseName: '',
        intermediaryServiceContent: '', // 中介服务内容
        hasCharge: 0, // 是否收费
        intermediaryChargeStandard: '', // 收费标准
        intermediaryChargeAmount: '', // 收费金额
        serviceReservation: 0, // 预约办理
        serviceOnlinePayment: 0, // 网上支付
        serviceLogistics: 0, // 物流快递
        onlineBookingAddress: '', // 线上地址
        payWaySelection: 0, // 支付方式
        logisticSelection: 0, // 选择物流
        commonProblem: '',
        consultingPhone: '',
        complaintTelephone: '' // 联系电话
      },
      originalData: {
        matterOriginalCode: '', // 事项原代码
        setTheBasis: '', // 设定依据
        divisionOfAuthority: '', // 权限划分
        exerciseContentText: '', // 行使内容
        organizationName: '', // 名称
        unitInformation: '', // 责任处科室单位信息
        subjectProperty: '', // 受委托组织
        matterCode: '', // 事项代码
        matterType: '', // 事项类型
        serviceOptionSelection: [], // 选中服务对象
        exerciseLevelSelection: [], // 选中行使层级
        matterSelection: 0, // 选中事项
        exerciseTypeSelection: 0, // 选中行使类型
        subjectPropertySelection: 0, // 选中实施主体性质
        hasJointAgenciySelection: 0, // 联办机构情况
        jointAgenciesSelection: 0, // 选中联办机构
        entrustedOrganization: 0, // 受委托组织
        admissibility: '', // 受理条件
        onlineProcess: true, // 网上办理流程 默认选中
        onlineProcessFileList: [], // 线上办理文件列表
        offlineProcess: true, // 窗口办理流程 默认选中
        offlinePocessFileList: [], // 窗口办理文件列表
        specialTache: true, // 特殊环节 默认选中
        specialProcedureNameSelection: [], // 特殊程序名称选中项
        specialProcedureManager: '', // 特殊程序办理人
        specialProcedureTimer: '', // 特殊程序建议时间
        hasCharge: 0, // 是否收费 默认否
        chargeStandard: '', // 特殊程序收费标准
        chargeBasis: '', // 特殊程序收费依据
        certificateTypeSelection: 0, // 办件类型 选中项
        statutoryDeadlines: 0, // 法定结办时限
        statutoryDeadlinesUnitSelection: 0, // 法定结办 单位
        commitmentDeadlines: 0, // 承诺结办时限
        commitmentDeadlinesUnitSelection: 0, // 承诺结办 单位
        onlineHandling: true, // 线上办理 默认选中
        offlineHandling: true, // 窗口办理 默认选中
        telephoneHandling: true, // 电话办理 默认选中
        handleTheAddress: '', // 办理地点
        handleTheTime: '', // 办理时间
        trafficGuidance: '', // 交通指引
        onlineHandlingContentText: '', // 线上办理信息
        offlineHandlingContentText: '', // 线下办理信息
        telephoneHandlingContentText: '', // 电话办理信息
        ScopeOfOperaSelection: 0, // 通办 选中项
        runningSystemSelection: 0, // 运行系统 选中项
        quantitativeRestriction: '', // 数量限制
        resultName: '', // 结果名称
        resultSampleFlieList: [], // 样本结果列表
        applicationMaterials: [],
        applicantRights: '', // 申请人权利
        applicantObligation: '', // 申请人义务
        ARdepartment: '',
        APdepartment: '',
        ARaddress: '',
        APaddress: '',
        ARtelephone: '',
        APtelephone: '',
        ARwebsite: '',
        APwebsite: '',
        hasIntermediaryServicesSelection: 0, // 中介服务 选中项
        intermediaryChineseName: '',
        intermediaryServiceContent: '', // 中介服务内容
        hasCharge: 0, // 是否收费
        intermediaryChargeStandard: '', // 收费标准
        intermediaryChargeAmount: '', // 收费金额
        serviceReservation: 0, // 预约办理
        serviceOnlinePayment: 0, // 网上支付
        serviceLogistics: 0, // 物流快递
        onlineBookingAddress: '', // 线上地址
        payWaySelection: 0, // 支付方式
        logisticSelection: 0, // 选择物流
        commonProblem: '',
        consultingPhone: '',
        complaintTelephone: '' // 联系电话
      }
    }
  },
  created: function () {
    this.getStepMatterList()
    this.getServiceOption()
    this.getExerciseLevel()
    this.getExerciseType()
    this.getSubjectProperty()
    this.getHasJointAgencies()
    this.getjointAgency()
    this.getSpecialProcedureName()
    this.getCertificateType()
    this.getScopeOfOperation()
    this.getRunningSystem()
    this.getMaterialSpecification()
    this.getPayWay()
    this.getLogisticsList()
  },
  methods: {
    // 获取事项名称
    getStepMatterList: function () {
      var self = this
      api({
        url: '/administrativeLicening/matterList',
        method: 'get',
        successFuc: function (res) {
          self.step1.matterList = res.data
          console.log(res)
          self.stepOneFormData.matterCode = res.data[0].matterCode
          self.stepOneFormData.matterType = res.data[0].matterType
        }
      })
    },
    // 获取服务对象
    getServiceOption: function () {
      var self = this
      api({
        url: '/administrativeLicening/getServiceOption',
        method: 'get',
        successFuc: function (res) {
          self.step1.serviceOptions = res.data
        }
      })
    },
    // 获取行使层级
    getExerciseLevel: function () {
      var self = this
      api({
        url: '/administrativeLicening/getExerciseLevel',
        method: 'get',
        successFuc: function (res) {
          self.step1.exerciseLevels = res.data
        }
      })
    },
    getExerciseType: function () {
      var self = this
      api({
        url: '/administrativeLicening/getExerciseType',
        method: 'get',
        successFuc: function (res) {
          self.step1.exerciseTypes = res.data
        }
      })
    },
    getSubjectProperty: function () {
      var self = this
      api({
        url: '/administrativeLicening/getSubjectProperty',
        method: 'get',
        successFuc: function (res) {
          self.step1.subjectPropertys = res.data
        }
      })
    },
    getHasJointAgencies: function () {
      var self = this
      api({
        url: '/administrativeLicening/getHasJointAgency',
        method: 'get',
        successFuc: function (res) {
          self.step1.hasJointAgencies = res.data
        }
      })
    },
    getjointAgency: function () {
      var self = this
      api({
        url: '/administrativeLicening/getJointAgency',
        method: 'get',
        successFuc: function (res) {
          self.step1.jointAgencies = res.data
        }
      })
    },
    matterSelectionChange: function (id) {
      this.stepOneFormData.matterCode = this.step1.matterList[id].matterCode
      this.stepOneFormData.matterType = this.step1.matterList[id].matterType
    },
    subjectPropertyChange: function (val) {
      if (val != 2) {
        this.stepOneFormData.subjectProperty = ''
      }
    },
    hasJointAgenciyChange: function (val) {
      if (val != 1) {
        this.stepOneFormData.jointAgenciesSelection = ''
      } else {
        this.stepOneFormData.jointAgenciesSelection = 0
      }
    },
    getSpecialProcedureName: function () {
      var self = this
      api({
        url: '/administrativeLicening/getSpecialProcedureName',
        method: 'get',
        successFuc: function (res) {
          self.step2.specialProcedureNameList = res.data
        }
      })
    },
    getCertificateType: function () {
      var self = this
      api({
        url: '/administrativeLicening/getCertificateType',
        method: 'get',
        successFuc: function (res) {
          self.step2.certificateTypeList = res.data
        }
      })
    },
    getScopeOfOperation: function () {
      var self = this
      api({
        url: '/administrativeLicening/getScopeOfOperation',
        method: 'get',
        successFuc: function (res) {
          self.step2.scopeOfOperations = res.data
        }
      })
    },
    getRunningSystem: function () {
      var self = this
      api({
        url: '/administrativeLicening/getRunningSystem',
        method: 'get',
        successFuc: function (res) {
          self.step2.runningSystemList = res.data
        }
      })
    },
    deleteTag: function (val) {
      // console.log(val)
    },
    updateDialog: function () {

    },
    specialTacheChange: function (val) {
      if (!val) {
        this.stepTwoFormData.specialProcedureNameSelection = []
        this.stepTwoFormData.specialProcedureManager = ''
        this.stepTwoFormData.specialProcedureTimer = ''
      }
    },
    hasChargeChange: function (val) {
      console.log(val)
      if (val === 0) {
        this.stepTwoFormData.chargeStandard = ''
        this.stepTwoFormData.chargeBasis = ''
      }
    },
    deleteOnlineProcess: function (item, index) {
      var self = this
      this.messageBox('你确定要删除此标签吗？', '提示', function (err, res) {
        if (!err) {
          self.$message({
            type: 'success',
            message: '删除成功!'
          })
          self.stepTwoFormData.onlineProcessFileList.splice(index, 1)
        }
      })
    },
    deleteOfflineProcess: function (item, index) {
      var self = this
      this.messageBox('你确定要删除此标签吗？', '提示', function (err, res) {
        if (!err) {
          self.$message({
            type: 'success',
            message: '删除成功!'
          })
          self.stepTwoFormData.offlinePocessFileList.splice(index, 1)
        }
      })
    },
    deleteresultSampleFlieList: function (item, index) {
      var self = this
      this.messageBox('你确定要删除此标签吗？', '提示', function (err, res) {
        if (!err) {
          self.$message({
            type: 'success',
            message: '删除成功!'
          })
          self.stepTwoFormData.resultSampleFlieList.splice(index, 1)
        }
      })
    },
    offlineHandlingClear: function () {
      this.stepTwoFormData.offlineHandlingContentText = ''
      this.stepTwoFormData.handleTheAddress = ''
      this.stepTwoFormData.handleTheTime = ''
      this.stepTwoFormData.trafficGuidance = ''
    },
    onlineHandlingClear: function () {
      this.stepTwoFormData.onlineHandlingContentText = ''
    },
    telephoneHandlingClear: function () {
      this.stepTwoFormData.telephoneHandlingContentText = ''
    },
    getMaterialSpecification: function () {
      var self = this
      api({
        url: '/administrativeLicening/getMaterialSpecification',
        method: 'get',
        successFuc: function (res) {
          console.log('getMaterialSpecification ', res.data)
          self.step3.materialSpecification = res.data
        }
      })
    },
    addTableData: function () {
      this.tableDialog.title = '新增'
      this.tableDialogOpen(0, {}, false)
    },
    materialDetails: function (index, rowData) {
      this.tableDialog.title = '详情'
      this.tableDialogOpen(index, rowData, true)
    },
    materialEdit: function (index, rowData) {
      this.tableDialog.title = '编辑'
      console.log(index, rowData)
      this.tableDialogOpen(index, rowData, false)
    },
    materialDelete: function (index, rowData) {
      var self = this
      this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(function () {
        self.stepThreeFormData.applicationMaterials.splice(index, 1)
        self.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(function () {
        self.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    tableDialogClose: function () {
      this.tableDialog.title = ''
      this.tableDialog.visible = false
    },
    tableDialogOpen: function (index, data, isDetails) {
      var self = this
      this.tableDialog.details = isDetails
      if (this.tableDialog.title === '详情' || this.tableDialog.title === '编辑') {
        this.tableFormData = JSON.parse(JSON.stringify(data))
      } else {
        setTimeout(function () {
          self.$refs['tableFormData'].resetFields()
        }, 300)
      }
      this.tableDialog.visible = true
    },
    tableDialogSubmit: function () {
      var self = this
      this.submitForm('tableFormData', function (err, res) {
        console.log(err, res)
        if (!err) {
          if (self.tableDialog.title === '新增') {
            self.stepThreeFormData.applicationMaterials.push(JSON.parse(JSON.stringify(self.tableFormData)))
            self.tableDialogClose()
          } else {
            self.tableDialogClose()
          }
        } else {
          self.$message({
            message: '请确保表单已规范填写',
            type: 'warning'
          })
        }
      })
    },
    deleteDemonstrationText: function (tag, index) {
      // 示范文本
      var self = this
      this.messageBox('你确定要删除此标签吗？', '提示', function (err, res) {
        if (!err) {
          self.$message({
            type: 'success',
            message: '删除成功!'
          })
          self.tableFormData.demonstrationText.splice(index, 1)
        }
      })
    },
    deleteMaterialSample: function (tag, index) {
      // 材料样本
      var self = this
      this.messageBox('你确定要删除此标签吗？', '提示', function (err, res) {
        if (!err) {
          self.$message({
            type: 'success',
            message: '删除成功!'
          })
          self.tableFormData.materialSample.splice(index, 1)
        }
      })
    },
    getPayWay: function () {
      var self = this
      api({
        url: '/administrativeLicening/getPayWay',
        method: 'get',
        successFuc: function (res) {
          self.PayWayList = res.data
        }
      })
    },
    getLogisticsList: function () {
      var self = this
      api({
        url: '/administrativeLicening/getLogisticsList',
        method: 'get',
        successFuc: function (res) {
          self.LogisticsList = res.data
        }
      })
    },
    hasIntermediaryServicesSelectionClear: function () {
      this.stepFourFormData.intermediaryChineseName = ''
      this.stepFourFormData.intermediaryServiceContent = ''
    },
    hasChargeClear: function () {
      this.stepFourFormData.intermediaryChargeAmount = ''
      this.stepFourFormData.intermediaryChargeStandard = ''
    },
    serviceReservationClear: function () {
      this.stepFourFormData.onlineBookingAddress = ''
    },
    serviceOnlinePaymentClear: function () {
      this.stepFourFormData.payWaySelection = ''
    },
    serviceLogisticsClear: function () {
      this.stepFourFormData.logisticSelection = ''
    }
  }
}
