var matter = [{
  matterName: '', // 事项名称
  matterCode: '', // 事项代码
  matterType: '' // 事项类型
}]

// 服务对象
var varviceObject = [{
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

// 行使层级
var exerciseLevel = [{
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

// 行使类型
var exerciseType = [{
  value: 0,
  label: '本级保留'
}, {
  value: 1,
  label: '上级委托'
}, {
  value: 2,
  label: '审核转报'
}]

// 实施主体性质
var subjectProperty = [{
  value: 0,
  label: '法定机关'
}, {
  value: 1,
  label: '授权组织'
}, {
  value: 2,
  label: '受委托组织'
}]

// 联办机构列表
var JointAgencyList = [{
  value: 0,
  label: '工商行政管理局'
}, {
  value: 1,
  label: '安全生产监督管理局'
}]

// 是否存在联办机构
var hasJointAgency = [{
  value: 0,
  label: '不存在'
}, {
  value: 1,
  label: '存在'
}]
