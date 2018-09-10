var searchOptionDataList = [{
  value: 0,
  label: '待提交'
}, {
  value: 1,
  label: '等待初步核定'
}, {
  value: 2,
  label: '等待最终核定'
}, {
  value: 3,
  label: '审核通过'
}, {
  value: 4,
  label: '初审驳回'
}, {
  value: 5,
  label: '终审驳回'
}]

var tableDataList = [{
  id: 1000000001,
  state: { value: 1, label: '等待初步核定' },
  matterOriginalCode: '1234567890', // 事项原代码
  setTheBasis: '设定依据', // 设定依据
  divisionOfAuthority: '权限划分', // 权限划分
  exerciseContentText: '行使内容', // 行使内容
  organizationName: '事项名称', // 名称
  unitInformation: '责任科室单位信息', // 责任处科室单位信息
  subjectProperty: '', // 受委托组织
  matterCode: '1100772001/000024002004000000008100', // 事项代码
  matterType: '行政权力-行政许可', // 事项类型
  serviceOptionSelection: ['自然人', '机关'], // 选中服务对象
  exerciseLevelSelection: ['国家级'], // 选中行使层级
  matterSelection: 0, // 选中事项
  exerciseTypeSelection: 0, // 选中行使类型
  subjectPropertySelection: 0, // 选中实施主体性质
  hasJointAgenciySelection: 0, // 联办机构情况
  jointAgenciesSelection: 0, // 选中联办机构
  entrustedOrganization: 0, // 受委托组织
  admissibility: '受理条件', // 受理条件
  onlineProcess: true, // 网上办理流程 默认选中
  onlineProcessFileList: [{ name: 'onlineFile.zip', url: '123' }, { name: 'onlineFile.exe', url: '456' }, { name: 'onlineFile.rar', url: '789' }], // 线上办理文件列表
  offlineProcess: true, // 窗口办理流程 默认选中
  offlinePocessFileList: [{ name: 'offlineFile.zip', url: '123' }, { name: 'offlineFile.exe', url: '456' }, { name: 'offlineFile.rar', url: '789' }], // 窗口办理文件列表
  specialTache: true, // 特殊环节 默认选中
  specialProcedureNameSelection: ['听证'], // 特殊程序名称选中项
  specialProcedureManager: '周庆强', // 特殊程序办理人
  specialProcedureTimer: 1534262400000, // 特殊程序建议时间
  hasCharge: 1, // 是否收费 默认否
  chargeStandard: '收费标准', // 特殊程序收费标准
  chargeBasis: '特殊程序收费依据', // 特殊程序收费依据
  certificateTypeSelection: 2, // 办件类型 选中项
  statutoryDeadlines: 0, // 法定结办时限
  statutoryDeadlinesUnitSelection: 0, // 法定结办 单位
  commitmentDeadlines: 0, // 承诺结办时限
  commitmentDeadlinesUnitSelection: 0, // 承诺结办 单位
  onlineHandling: true, // 线上办理 默认选中
  offlineHandling: true, // 窗口办理 默认选中
  telephoneHandling: true, // 电话办理 默认选中
  handleTheAddress: '浙江舟山', // 办理地点
  handleTheTime: 1534362400000, // 办理时间
  trafficGuidance: '交通指引', // 交通指引
  onlineHandlingContentText: 'http://127.0.0.1:8080/page/guidelinesForMatters/administrativeLicensing/', // 线上办理信息
  offlineHandlingContentText: '线下办理信息', // 线下办理信息
  telephoneHandlingContentText: '15395801721', // 电话办理信息
  ScopeOfOperaSelection: 0, // 通办 选中项
  runningSystemSelection: 0, // 运行系统 选中项
  quantitativeRestriction: '123', // 数量限制
  resultName: '结果名称', // 结果名称
  resultSampleFlieList: [{ name: '结果样本.zip', url: '123' }, { name: '结果样本.exe', url: '456' }, { name: '结果样本.rar', url: '789' }], // 样本结果列表
  applicationMaterials: [],
  applicantRights: '申请人权利', // 申请人权利
  applicantObligation: '申请人义务', // 申请人义务
  ARdepartment: '123',
  APdepartment: '12345',
  ARaddress: '地址', // 地址
  APaddress: '地址', // 地址
  ARtelephone: '15395801721', // 联系方式
  APtelephone: '15395801721', // 联系方式
  ARwebsite: 'http://www.baidu.com/', // 网站地址
  APwebsite: 'http://www.baidu.com/', // 网站地址
  hasIntermediaryServicesSelection: 1, // 中介服务 选中项
  intermediaryChineseName: '中介名称',
  intermediaryServiceContent: '中介服务内容', // 中介服务内容
  hasCharge: 0, // 是否收费
  intermediaryChargeStandard: '收费标准', // 收费标准
  intermediaryChargeAmount: '100', // 收费金额
  serviceReservation: 0, // 预约办理
  serviceOnlinePayment: 1, // 网上支付
  serviceLogistics: 1, // 物流快递
  onlineBookingAddress: 'http://www.baidu.com', // 线上地址
  payWaySelection: 0, // 支付方式
  logisticSelection: 0, // 选择物流
  commonProblem: '12345678',
  consultingPhone: '12345678',
  complaintTelephone: '12345678' // 联系电话
}, {
  id: 1000000002,
  state: { value: 1, label: '等待初步核定' },
  matterOriginalCode: '1234567890', // 事项原代码
  setTheBasis: '设定依据', // 设定依据
  divisionOfAuthority: '权限划分', // 权限划分
  exerciseContentText: '行使内容', // 行使内容
  organizationName: '事项名称', // 名称
  unitInformation: '责任科室单位信息', // 责任处科室单位信息
  subjectProperty: '', // 受委托组织
  matterCode: '1100772001/000024002004000000008100', // 事项代码
  matterType: '行政权力-行政许可', // 事项类型
  serviceOptionSelection: ['自然人', '机关'], // 选中服务对象
  exerciseLevelSelection: ['国家级'], // 选中行使层级
  matterSelection: 0, // 选中事项
  exerciseTypeSelection: 0, // 选中行使类型
  subjectPropertySelection: 0, // 选中实施主体性质
  hasJointAgenciySelection: 0, // 联办机构情况
  jointAgenciesSelection: 0, // 选中联办机构
  entrustedOrganization: 0, // 受委托组织
  admissibility: '受理条件', // 受理条件
  onlineProcess: true, // 网上办理流程 默认选中
  onlineProcessFileList: [{ name: 'onlineFile.zip', url: '123' }, { name: 'onlineFile.exe', url: '456' }, { name: 'onlineFile.rar', url: '789' }], // 线上办理文件列表
  offlineProcess: true, // 窗口办理流程 默认选中
  offlinePocessFileList: [{ name: 'offlineFile.zip', url: '123' }, { name: 'offlineFile.exe', url: '456' }, { name: 'offlineFile.rar', url: '789' }], // 窗口办理文件列表
  specialTache: true, // 特殊环节 默认选中
  specialProcedureNameSelection: ['听证'], // 特殊程序名称选中项
  specialProcedureManager: '周庆强', // 特殊程序办理人
  specialProcedureTimer: '2018-08-22', // 特殊程序建议时间
  hasCharge: 1, // 是否收费 默认否
  chargeStandard: '收费标准', // 特殊程序收费标准
  chargeBasis: '特殊程序收费依据', // 特殊程序收费依据
  certificateTypeSelection: 2, // 办件类型 选中项
  statutoryDeadlines: 0, // 法定结办时限
  statutoryDeadlinesUnitSelection: 0, // 法定结办 单位
  commitmentDeadlines: 0, // 承诺结办时限
  commitmentDeadlinesUnitSelection: 0, // 承诺结办 单位
  onlineHandling: true, // 线上办理 默认选中
  offlineHandling: true, // 窗口办理 默认选中
  telephoneHandling: true, // 电话办理 默认选中
  handleTheAddress: '浙江舟山', // 办理地点
  handleTheTime: '2018-08-08', // 办理时间
  trafficGuidance: '交通指引', // 交通指引
  onlineHandlingContentText: 'http://127.0.0.1:8080/page/guidelinesForMatters/administrativeLicensing/', // 线上办理信息
  offlineHandlingContentText: '线下办理信息', // 线下办理信息
  telephoneHandlingContentText: '15395801721', // 电话办理信息
  ScopeOfOperaSelection: 0, // 通办 选中项
  runningSystemSelection: 0, // 运行系统 选中项
  quantitativeRestriction: '123', // 数量限制
  resultName: '结果名称', // 结果名称
  resultSampleFlieList: [{ name: '结果样本.zip', url: '123' }, { name: '结果样本.exe', url: '456' }, { name: '结果样本.rar', url: '789' }], // 样本结果列表
  applicationMaterials: [],
  applicantRights: '申请人权利', // 申请人权利
  applicantObligation: '申请人义务', // 申请人义务
  ARdepartment: '123',
  APdepartment: '12345',
  ARaddress: '地址', // 地址
  APaddress: '地址', // 地址
  ARtelephone: '15395801721', // 联系方式
  APtelephone: '15395801721', // 联系方式
  ARwebsite: 'http://www.baidu.com/', // 网站地址
  APwebsite: 'http://www.baidu.com/', // 网站地址
  hasIntermediaryServicesSelection: 1, // 中介服务 选中项
  intermediaryChineseName: '中介名称',
  intermediaryServiceContent: '中介服务内容', // 中介服务内容
  hasCharge: 0, // 是否收费
  intermediaryChargeStandard: '收费标准', // 收费标准
  intermediaryChargeAmount: '100', // 收费金额
  serviceReservation: 0, // 预约办理
  serviceOnlinePayment: 1, // 网上支付
  serviceLogistics: 1, // 物流快递
  onlineBookingAddress: 'http://www.baidu.com', // 线上地址
  payWaySelection: 0, // 支付方式
  logisticSelection: 0, // 选择物流
  commonProblem: '12345678',
  consultingPhone: '12345678',
  complaintTelephone: '12345678' // 联系电话
}, {
  id: 1000000003,
  state: { value: 1, label: '等待初步核定' },
  matterOriginalCode: '1234567890', // 事项原代码
  setTheBasis: '设定依据', // 设定依据
  divisionOfAuthority: '权限划分', // 权限划分
  exerciseContentText: '行使内容', // 行使内容
  organizationName: '事项名称', // 名称
  unitInformation: '责任科室单位信息', // 责任处科室单位信息
  subjectProperty: '', // 受委托组织
  matterCode: '1100772001/000024002004000000008100', // 事项代码
  matterType: '行政权力-行政许可', // 事项类型
  serviceOptionSelection: ['自然人', '机关'], // 选中服务对象
  exerciseLevelSelection: ['国家级'], // 选中行使层级
  matterSelection: 0, // 选中事项
  exerciseTypeSelection: 0, // 选中行使类型
  subjectPropertySelection: 0, // 选中实施主体性质
  hasJointAgenciySelection: 0, // 联办机构情况
  jointAgenciesSelection: 0, // 选中联办机构
  entrustedOrganization: 0, // 受委托组织
  admissibility: '受理条件', // 受理条件
  onlineProcess: true, // 网上办理流程 默认选中
  onlineProcessFileList: [{ name: 'onlineFile.zip', url: '123' }, { name: 'onlineFile.exe', url: '456' }, { name: 'onlineFile.rar', url: '789' }], // 线上办理文件列表
  offlineProcess: true, // 窗口办理流程 默认选中
  offlinePocessFileList: [{ name: 'offlineFile.zip', url: '123' }, { name: 'offlineFile.exe', url: '456' }, { name: 'offlineFile.rar', url: '789' }], // 窗口办理文件列表
  specialTache: true, // 特殊环节 默认选中
  specialProcedureNameSelection: ['听证'], // 特殊程序名称选中项
  specialProcedureManager: '周庆强', // 特殊程序办理人
  specialProcedureTimer: '2018-08-22', // 特殊程序建议时间
  hasCharge: 1, // 是否收费 默认否
  chargeStandard: '收费标准', // 特殊程序收费标准
  chargeBasis: '特殊程序收费依据', // 特殊程序收费依据
  certificateTypeSelection: 2, // 办件类型 选中项
  statutoryDeadlines: 0, // 法定结办时限
  statutoryDeadlinesUnitSelection: 0, // 法定结办 单位
  commitmentDeadlines: 0, // 承诺结办时限
  commitmentDeadlinesUnitSelection: 0, // 承诺结办 单位
  onlineHandling: true, // 线上办理 默认选中
  offlineHandling: true, // 窗口办理 默认选中
  telephoneHandling: true, // 电话办理 默认选中
  handleTheAddress: '浙江舟山', // 办理地点
  handleTheTime: '2018-08-08', // 办理时间
  trafficGuidance: '交通指引', // 交通指引
  onlineHandlingContentText: 'http://127.0.0.1:8080/page/guidelinesForMatters/administrativeLicensing/', // 线上办理信息
  offlineHandlingContentText: '线下办理信息', // 线下办理信息
  telephoneHandlingContentText: '15395801721', // 电话办理信息
  ScopeOfOperaSelection: 0, // 通办 选中项
  runningSystemSelection: 0, // 运行系统 选中项
  quantitativeRestriction: '123', // 数量限制
  resultName: '结果名称', // 结果名称
  resultSampleFlieList: [{ name: '结果样本.zip', url: '123' }, { name: '结果样本.exe', url: '456' }, { name: '结果样本.rar', url: '789' }], // 样本结果列表
  applicationMaterials: [],
  applicantRights: '申请人权利', // 申请人权利
  applicantObligation: '申请人义务', // 申请人义务
  ARdepartment: '123',
  APdepartment: '12345',
  ARaddress: '地址', // 地址
  APaddress: '地址', // 地址
  ARtelephone: '15395801721', // 联系方式
  APtelephone: '15395801721', // 联系方式
  ARwebsite: 'http://www.baidu.com/', // 网站地址
  APwebsite: 'http://www.baidu.com/', // 网站地址
  hasIntermediaryServicesSelection: 1, // 中介服务 选中项
  intermediaryChineseName: '中介名称',
  intermediaryServiceContent: '中介服务内容', // 中介服务内容
  hasCharge: 0, // 是否收费
  intermediaryChargeStandard: '收费标准', // 收费标准
  intermediaryChargeAmount: '100', // 收费金额
  serviceReservation: 0, // 预约办理
  serviceOnlinePayment: 1, // 网上支付
  serviceLogistics: 1, // 物流快递
  onlineBookingAddress: 'http://www.baidu.com', // 线上地址
  payWaySelection: 0, // 支付方式
  logisticSelection: 0, // 选择物流
  commonProblem: '12345678',
  consultingPhone: '12345678',
  complaintTelephone: '12345678' // 联系电话
}]

var matterList = [{
  id: 0,
  matterName: '企业团队设立登记', // 事项名称
  matterCode: '1100772001/000024002004000000008100', // 事项代码
  matterType: '行政权力-行政许可' // 事项类型
}, {
  id: 1,
  matterName: '企业团队注销登记', // 事项名称
  matterCode: '1100772001/999999999999999999999999', // 事项代码
  matterType: '行政权力-行政许可' // 事项类型
}]

var serviceObjectList = [{
  value: 0,
  label: '自然人'
}, {
  value: 1,
  label: '机关'
}, {
  value: 2,
  label: '事业单位'
}, {
  value: 3,
  label: '企业'
}, {
  value: 4,
  label: '社会团体'
}, {
  value: 5,
  label: '其他组织'
}]

var exerciseLevelList = [{
  value: 0,
  label: '国家级'
}, {
  value: 1,
  label: '省级'
}, {
  value: 2,
  label: '市级'
}, {
  value: 3,
  label: '县级(市、区)'
}, {
  value: 4,
  label: '乡级(镇、街道)'
}, {
  value: 5,
  label: '村级(社区)'
}]

var ExerciseTypeList = [{
  value: 0,
  label: '本级保留'
}, {
  value: 1,
  label: '上级委托'
}, {
  value: 2,
  label: '审核转报'
}]

var subjectPropertyList = [{
  value: 0,
  label: '法定机关'
}, {
  value: 1,
  label: '授权组织'
}, {
  value: 2,
  label: '受委托组织'
}]

var hasJointAgencyList = [{
  value: 0,
  label: '不存在'
}, {
  value: 1,
  label: '存在'
}]

var JointAgencyList = [{
  value: 0,
  label: '工商行政管理局'
}, {
  value: 1,
  label: '安全生产监督管理局'
}]

var specialProcedureNameList = [{
  value: 0,
  label: '听证'
}, {
  value: 1,
  label: '公告'
}, {
  value: 2,
  label: '公示'
}, {
  value: 3,
  label: '检验'
}, {
  value: 4,
  label: '检测'
}, {
  value: 5,
  label: '鉴定'
}, {
  value: 6,
  label: '专家评审'
}, {
  value: 7,
  label: '论证'
}, {
  value: 8,
  label: '勘察'
}, {
  value: 9,
  label: '评估'
}, {
  value: 10,
  label: '其他'
}]

var certificateTypeList = [{
  value: 0,
  label: '承诺件'
}, {
  value: 1,
  label: '即办件'
}, {
  value: 2,
  label: '联办件'
}, {
  value: 3,
  label: '初审件'
}, {
  value: 4,
  label: '转报件'
}]

var scopeOfOperationList = [{
  value: 0,
  label: '全省通办'
}, {
  value: 1,
  label: '全市通办'
}, {
  value: 2,
  label: '全区通办'
}, {
  value: 3,
  label: '定点办理'
}]

var runningSystemList = [{
  value: 0,
  label: '垂直系统'
}, {
  value: 1,
  label: '国家级'
}, {
  value: 2,
  label: '省级'
}, {
  value: 3,
  label: '市级'
}, {
  value: 4,
  label: '县级'
}, {
  value: 5,
  label: '乡级'
}, {
  value: 6,
  label: '村级'
}]

var materialSpecificationList = [{
  value: 0,
  label: '纸质版'
}, {
  value: 1,
  label: '电子版'
}, {
  value: 2,
  label: '纸质版和电子版'
}, {
  value: 3,
  label: '纸质版或电子版'
}]

var applicationMaterialsList = []

var payWay = [{
  value: 0,
  label: '网银支付'
}, {
  value: 1,
  label: '微信支付'
}, {
  value: 2,
  label: '支付宝支付'
}]

var logisticsList = [{
  value: 0,
  label: '顺丰快递'
}, {
  value: 1,
  label: '圆通快递'
}, {
  value: 2,
  label: '中通快递'
}, {
  value: 3,
  label: '申通快递'
}, {
  value: 4,
  label: '汇通快递'
}, {
  value: 5,
  label: '韵达快递'
}]

function searchOption () {
  return {
    // isOpen: false,
    url: '/administrativeLicening/searchOption',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: searchOptionDataList
    }
  }
}

function tableData () {
  return {
    // isOpen: false,
    url: '/administrativeLicening/tableDataList',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: tableDataList
    }
  }
}

function getMatterList () {
  return {
    // isOpen: false,
    url: '/administrativeLicening/matterList',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: matterList
    }
  }
}

function getServiceOptionList () {
  return {
    // isOpen: false,
    url: '/administrativeLicening/getServiceOption',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: serviceObjectList
    }
  }
}

function getExerciseLevelList () {
  return {
    // isOpen: false,
    url: '/administrativeLicening/getExerciseLevel',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: exerciseLevelList
    }
  }
}

function getExerciseType () {
  return {
    // isOpen: false,
    url: '/administrativeLicening/getExerciseType',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: ExerciseTypeList
    }
  }
}

function getSubjectProperty () {
  return {
    // isOpen: false,
    url: '/administrativeLicening/getSubjectProperty',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: subjectPropertyList
    }
  }
}

function getHasJointAgency () {
  return {
    // isOpen: false,
    url: '/administrativeLicening/getHasJointAgency',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: hasJointAgencyList
    }
  }
}

function getjointAgency () {
  return {
    // isOpen: false,
    url: '/administrativeLicening/getJointAgency',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: JointAgencyList
    }
  }
}

function getSpecialProcedureName () {
  return {
    // isOpen: false,
    url: '/administrativeLicening/getSpecialProcedureName',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: specialProcedureNameList
    }
  }
}

function getCertificateType () {
  return {
    // isOpen: false,
    url: '/administrativeLicening/getCertificateType',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: certificateTypeList
    }
  }
}

function getScopeOfOperation () {
  return {
    // isOpen: false,
    url: '/administrativeLicening/getScopeOfOperation',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: scopeOfOperationList
    }
  }
}

function getRunningSystem () {
  return {
    // isOpen: false,
    url: '/administrativeLicening/getRunningSystem',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: runningSystemList
    }
  }
}

function getMaterialSpecification () {
  return {
    url: '/administrativeLicening/getMaterialSpecification',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: materialSpecificationList
    }
  }
}

function getApplicationMaterials () {
  return {
    url: '/administrativeLicening/getApplicationMaterials',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: applicationMaterialsList
    }
  }
}

function getPayWay () {
  return {
    url: '/administrativeLicening/getPayWay',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: payWay
    }
  }
}

function getLogisticsList () {
  return {
    url: '/administrativeLicening/getLogisticsList',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: logisticsList
    }
  }
}

fnCreate([
  searchOption,
  tableData,
  getMatterList,
  getServiceOptionList,
  getExerciseLevelList,
  getExerciseType,
  getSubjectProperty,
  getHasJointAgency,
  getjointAgency,
  getSpecialProcedureName,
  getCertificateType,
  getScopeOfOperation,
  getRunningSystem,
  getMaterialSpecification,
  getApplicationMaterials,
  getPayWay,
  getLogisticsList
], false)
