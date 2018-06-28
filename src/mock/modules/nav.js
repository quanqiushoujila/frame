const navList = [
  {id: '1', name: '资产普查', icon: 'icon-jianchajihua'},
  {id: '2', name: '数据目录', icon: 'icon-mulu1'},
  {id: '3', name: '业务事项', icon: 'icon-yewu'},
  {id: '4', name: '数源认责', icon: 'icon-duijie'},
  {id: '5', name: '数据治理', icon: 'icon-biaozhun'},
  {id: '6', name: '数据标签', icon: 'icon-biaoqian'},
  {id: '7', name: '服务注册', icon: 'icon-zhuce'},
  {id: '8', name: '信息采集', icon: 'icon-xinxicaiji'},
  {id: '9', name: '项目管理', icon: 'icon-xiangmu'},
  {id: '10', name: '系统配置', icon: 'icon-kaohejilu'}
]

export function mainIndex () {
  return {
    // isOpen: false,
    url: '/mainIndex',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': navList
    }
  }
}
