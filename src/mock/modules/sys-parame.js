export function list () {
  return {
    // isOpen: false,
    url: '/sys/parame/list',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: {
        logo: 'logo',
        isGateway: 1,
        themeStyle: 1
      }
    }
  }
}

// 获取菜单列表
export function skin () {
  return {
    // isOpen: false,
    url: '/sys/parame/skin',
    type: 'get',
    data: {
      code: 0,
      msg: 'success',
      data: [
        {
          id: 1,
          label: '默认主题'
        },
        {
          id: 2,
          label: '蓝色主题'
        }
      ]
    }
  }
}
