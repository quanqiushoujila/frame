const navList = [
  {'id': '1', 'name': '资产普查', 'remarks': 'icon-jianchajihua', 'path': './main.html'},
  {'id': '2', 'name': '数据目录', 'remarks': 'icon-mulu1', 'path': './main.html'},
  {'id': '3', 'name': '业务事项', 'remarks': 'icon-yewu', 'path': './main.html'},
  {'id': '4', 'name': '数源认责', 'remarks': 'icon-duijie', 'path': './main.html'},
  {'id': '5', 'name': '数据治理', 'remarks': 'icon-biaozhun', 'path': './main.html'},
  {'id': '6', 'name': '数据标签', 'remarks': 'icon-biaoqian', 'path': './main.html'},
  {'id': '7', 'name': '服务注册', 'remarks': 'icon-zhuce', 'path': './main.html'},
  {'id': '8', 'name': '信息采集', 'remarks': 'icon-xinxicaiji', 'path': './main.html'},
  {'id': '9', 'name': '项目管理', 'remarks': 'icon-xiangmu', 'path': './main.html'},
  {'id': '10', 'name': '系统配置', 'remarks': 'icon-kaohejilu', 'path': './main.html'}
]

function nav () {
  return {
    url: '/nav',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'data': navList
    }
  }
}
fnCreate([nav], false)
