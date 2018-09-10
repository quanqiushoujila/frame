var dataList = [
  {
    'id': 7,
    'beanName': 'quartzTask',
    'methodName': 'deleteFile',
    'params': '',
    'cronExpression': '0 0 11 1/1 * ? ',
    'status': 1,
    'statusForShow': '暂停',
    'remark': '每天早上11点执行',
    'createTime': '2018-07-04 16:16:21'
  },
  {
    'id': 6,
    'beanName': 'quartzTask',
    'methodName': 'run',
    'params': '',
    'cronExpression': '0/5 * * * * ? ',
    'status': 1,
    'statusForShow': '暂停',
    'remark': '每5秒执行一次',
    'createTime': '2018-06-28 11:59:43'
  },
  {
    'id': 4,
    'beanName': 'quartzTask',
    'methodName': 'targetDown',
    'params': '',
    'cronExpression': '0 0 0 * * ?',
    'status': 1,
    'statusForShow': '暂停',
    'remark': '指标过期自动下线（每天零时执行）',
    'createTime': '2018-06-13 16:10:56'
  },
  {
    'id': 3,
    'beanName': 'quartzTask',
    'methodName': 'infoDown',
    'params': '',
    'cronExpression': '0 0 9,17 1/1 * ? ',
    'status': 1,
    'statusForShow': '暂停',
    'remark': '每天早上9点、17点执行',
    'createTime': '2018-06-08 09:15:50'
  },
  {
    'id': 2,
    'beanName': 'testTask',
    'methodName': 'test2',
    'params': '',
    'cronExpression': '0 0 11 1/1 * ? ',
    'status': 1,
    'statusForShow': '暂停',
    'remark': '每天早上11执行',
    'createTime': '2017-06-03 14:55:56'
  },
  {
    'id': 1,
    'beanName': 'testTask',
    'methodName': 'test',
    'params': 'para',
    'cronExpression': '0 0 10 1/1 * ? ',
    'status': 1,
    'statusForShow': '暂停',
    'remark': '每天早上10点执行',
    'createTime': '2017-06-01 23:16:46'
  }
]

function list () {
  return {
    // isOpen: false,
    url: '/sys/time/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'count': dataList.length,
      'data': dataList
    }
  }
}
fnCreate([list], false)
