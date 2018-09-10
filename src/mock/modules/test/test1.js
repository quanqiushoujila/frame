var tableList = [
  {
    id: 1,
    name: '黑名单登记信息', // 信息资源名称
    englishName: 'paln',
    code: '30702300003025/4662', // 信息资源代码
    from: 1, // 资源提供方
    fromForShow: '工商局', //  资源提供方
    format: [1, 2], // 信息资源格式
    time: new Date().getTime(), // 发布日期
    month: new Date().getTime(), // 发布月份
    timeRange: [new Date('2018-01-01').getTime(), new Date('2018-02-01').getTime()], // 存量数据年限
    tag: [1, 2], // 标签
    status: 1, // 状态
    icon: 'icon-dianziqianzhang',
    isDelete: 1,
    sex: 1, // 性别
    hobby: [1, 2], // 爱好
    statusForShow: '已发布', // 状态
    detail: '详情', // 详情
    files: [{name: '好详情详情详情详情详情详情详情详情详情详情详情', id: 3}, {name: '好1', id: 4}],
    parentName: '系统管理',
    parentId: 1,
    dataIds: [1, 2] // 信息项
  },
  {
    id: 2,
    name: '高级船员信息', // 信息资源名称
    englishName: 'paln1',
    code: '30702300003025/3818', // 信息资源代码
    from: 2, // 资源提供方
    fromForShow: '劳动局', //  资源提供方
    format: [1, 3], // 信息资源格式
    time: new Date().getTime(), // 发布日期
    month: new Date().getTime(), // 发布月份
    timeRange: [new Date('2018-01-01').getTime(), new Date('2018-02-01').getTime()], // 存量数据年限
    icon: 'icon-dianziqianzhang',
    tag: [2], // 标签
    status: 2, // 状态
    sex: 2, // 性别
    hobby: [3], // 爱好
    statusForShow: '未发布', // 状态
    detail: '详情', // 详情
    files: [],
    parentName: '菜单管理',
    parentId: 3,
    dataIds: [1, 2] // 信息项
  }
]
// 标签
var tagList = [
  {
    id: 1,
    name: '服务标签'
  },
  {
    id: 2,
    name: '行业标签'
  }
]
// 资源提供方
var fromList = [
  {
    id: 1,
    name: '工商局'
  },
  {
    id: 2,
    name: '劳动局'
  },
  {
    id: 3,
    name: '环保局'
  }
]
// 信息资源格式
var formatList = [
  {
    id: 1,
    name: '电子文件',
    children: [
      {
        id: 2,
        name: 'docx'
      },
      {
        id: 3,
        name: 'pdf'
      }
    ]
  },
  {
    id: 4,
    name: '电子表格',
    children: [
      {
        id: 5,
        name: 'xls'
      }
    ]
  }
]
// 信息项
var dataIdsList = [
  {
    id: 1,
    code: '9957921', // 内部标识符
    chineseName: '（附件）脚本路径', // 中文名称
    englishName: 'PATH' // 英文名称
  },
  {
    id: 2,
    code: '0604576', // 内部标识符
    chineseName: '（涉案金额）', // 中文名称
    englishName: 'ABB721' // 英文名称
  }
]

// table数据
export function tableData () {
  return {
    // isOpen: false,
    url: '/test/table',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': tableList
    }
  }
}

// 标签数据
export function tagData () {
  return {
    // isOpen: false,
    url: '/test/tag',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': tagList
    }
  }
}

// 资源提供方数据
export function fromData () {
  return {
    // isOpen: false,
    url: '/test/from',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': fromList
    }
  }
}
// 信息资源格式数据
export function formatData () {
  return {
    url: '/test/format',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': formatList
    }
  }
}
// 信息项数据
export function dataIdsData () {
  return {
    url: '/test/dataIds',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': dataIdsList
    }
  }
}

// 性别
export function sexData () {
  return {
    url: '/test/sex',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': [
        {
          id: 1,
          name: '男'
        },
        {
          id: 2,
          name: '女'
        }
      ]
    }
  }
}

// 爱好
export function hobbyData () {
  return {
    url: '/test/hobby',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': [
        {
          id: 1,
          label: 'ps4'
        },
        {
          id: 2,
          label: 'switch'
        },
        {
          id: 3,
          label: 'xbox'
        }
      ]
    }
  }
}
