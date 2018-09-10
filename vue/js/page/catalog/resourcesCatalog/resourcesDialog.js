var resourcesDialog = {
  data: function () {
    return {
      dialogVisible: false,
      isBtnGroup: false,
      props: [
        {
          label: '信息资源编码',
          prop: 'code'
        },
        {
          label: '信息资源名称',
          prop: 'nameCn'
        },
        {
          label: '信息资源英文名',
          prop: 'nameEn'
        },
        {
          label: '所属系统',
          prop: 'sysId'
        },
        {
          label: '信息资源提供方',
          prop: 'deptName'
        },
        {
          label: '摘要',
          prop: 'summary'
        },
        [
          {
            label: '格式分类',
            prop: 'formatType1'
          },
          {
            label: '格式分类',
            prop: 'formatType2'
          }
        ],
        {
          label: '基础资源分类',
          prop: 'classify'
        },
        {
          label: '主题资源分类',
          prop: 'topicClassify'
        },
        {
          label: '数据表英文名称',
          prop: 'tbName'
        },
        {
          label: '更新频率',
          prop: 'updateFrequency'
        },
        {
          label: '对接方式',
          prop: 'buttMode'
        },
        {
          label: '提交日期',
          prop: 'releaseDate'
        },
        {
          label: '排序',
          prop: 'sort'
        }
      ],
      resourceTable: {
        loading: false,
        // table数据
        data: [],
        // table 表头
        tr: [
          {
            prop: 'nameCn',
            label: '信息项名称'
          }
        ],
        // 操作
        operation: {
          hasOperation: true,
          label: '操作',
          width: 100,
          minWidth: '',
          // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
          data: [{
            label: '详情',
            id: 1,
            fn: 'data-element-detail-handle',
            permission: ''
          }]
        },
        pagination: {
          hasPagination: false
        }
      }
    }
  },
  watch: {
    formData: {
      handler: function (newVal) {
        if (newVal.eleList) {
          this.resourceTable.data = newVal.eleList
        }
      },
      deep: true
    }
  },
  methods: {
    openDialogHandle: function () {
      this.$refs.resourcesDialog.open()
    },
    closeDialogHandle: function () {
      this.$refs.resourcesDialog.close()
    },
    dataElementDetailHandle: function (index, row) {
      this.formData2 = row
      this.$refs.dataElementDialog.open()
    }
  }
}
