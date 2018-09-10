'use strict';

var departmentDialog = {
  data: function data() {
    return {
      form: {
        id: '',
        name: '',
        parentId: '',
        parentName: '',
        code: '',
        areaId: '',
        areaName: '',
        level: '',
        type: '',
        sort: ''
      },
      conpanyControl: [],
      props: [{
        label: '上级机构',
        prop: 'parentName',
        defaultProp: 'parentId',
        inputType: 'inputTree',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        visible: false
      }, {
        label: '名称',
        prop: 'name',
        inputType: 'input'
      }, {
        label: '所属行政区划',
        prop: 'areaName',
        defaultProp: 'areaId',
        inputType: 'inputTree',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        visible: false
      }, {
        label: '机构类别',
        prop: 'type',
        inputType: 'select',
        options: []
      }, {
        label: '机构编码',
        prop: 'code',
        inputType: 'input'
      }, {
        label: '排序',
        prop: 'sort',
        inputType: 'input'
      }],
      rules: {
        parentName: [{ required: true, message: '不能为空', trigger: 'change' }],
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        areaName: [{ required: true, message: '不能为空', trigger: 'change' }],
        type: [{ required: true, message: '不能为空', trigger: 'change' }],
        code: [{ required: true, message: '不能为空', trigger: 'blur' }],
        sort: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    };
  },
  watch: {
    parentIdOptions: {
      handler: function handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.setOptions('parentName', this.props, newVal);
        }
      },
      immediate: true
    }
  },
  created: function created() {
    this.getOrganizationType();
    this.getCompartmentList();
  },
  methods: {
    // 机构类别
    getOrganizationType: function getOrganizationType(data) {
      var self = this;
      api({
        url: '/sys/department/type',
        type: 'get',
        successFuc: function successFuc(res) {
          if (res.code === CONFIG.SUCCESS) {
            self.setOptions('type', self.props, res.data);
          }
        }
      });
    },
    // 所属行政区划
    getCompartmentList: function getCompartmentList(data) {
      var self = this;
      api({
        url: '/sys/compartment/areaName',
        type: 'get',
        successFuc: function successFuc(res) {
          if (res.code === CONFIG.SUCCESS) {
            self.setOptions('areaName', self.props, res.data);
          }
        }
      });
    },
    // Dialog 打开的回调
    openDialogHandle: function openDialogHandle() {
      var self = this;
      this.$nextTick(function () {
        if (self.title1 === CONFIG.EDIT || self.title1 === CONFIG.ADD) {
          self.clearValidate('departmentForm');
        }
        if (self.title1 === CONFIG.EDIT) {
          self.validate('departmentForm');
        }
      });
    },
    // Dialog 关闭的回调
    closeDialogHandle: function closeDialogHandle() {
      var self = this;
      this.$nextTick(function () {
        if (self.title1 === CONFIG.EDIT || self.title1 === CONFIG.ADD) {
          self.clearForm('departmentForm');
        }
      });
    },
    // 确定
    confirmHandle: function confirmHandle() {
      this.$refs.departmentForm.submitHandle();
      this.close('departmentDialog');
    },
    submitHandle: function submitHandle(data) {
      this.close('departmentDialog');
    },
    cancelHandle: function cancelHandle() {
      this.close('departmentDialog');
    }
  }
};