var dataElementDialog = {
  data: function () {
    return {
      props2: [
        {
          label: '中文名称',
          prop: 'nameCn'
        },
        {
          label: '英文名称',
          prop: 'nameEn'
        },
        {
          label: '数据类型',
          prop: 'dataType'
        },
        {
          label: '数据长度',
          prop: 'length'
        },
        {
          label: '小数位',
          prop: 'decimals'
        },
        {
          label: '共享类型',
          prop: 'shareType'
        },
        {
          label: '共享条件',
          prop: 'shareCondition'
        },
        {
          label: '共享方式',
          prop: 'shareMode1'
        },
        {
          label: '是否向全社会开放',
          prop: 'isOpen'
        }
      ],
      formData2: {},
      dialogVisible2: false
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {

    },
    openDialogHandle2: function () {

    },
    closeDialogHandle2: function () {

    },
    detailHandle: function (index, row) {
    }
  }
}
