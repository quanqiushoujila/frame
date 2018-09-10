<!-- 新增编辑 -->
<template>
  <k-dialog
    :fullscreen="fullscreen"
    ref="dialogOne"
    :title="title"
    :width="width"
    :isBtnGroup="isBtnGroup"
    @closeDialogHandle="closeDialogHandle"
    @openDialogHandle="openDialogHandle"
    @cancelHandle="cancelHandle"
    @confirmHandle="confirmHandle"
    >
    <div style="margin: 10px;">
      <el-button @click="column = 1">一行</el-button>
      <el-button @click="column = 2">二行</el-button>
      <el-button @click="column = 3">三行</el-button>
    </div>
    <k-detail
      :column="column"
      v-if="title === '详情'"
      :props="props"
      :data="formData"
      ref="detailOne"
      @detailDetailClickHandle="detailDetailClickHandle">
      <span class="ellipsis text" slot="nameDetail" style="color: red;">
        {{form.name}}
      </span>
    </k-detail>
    <k-form
      v-else
      labelWidth="120px"
      :column="column"
      @submitHandle="submitHandle"
      ref="formOne"
      :form="form"
      :formProps="props"
      :rules="rules"
      :data="formData">
      <div slot="iconForm">
        <el-popover
          v-model="iconVisible"
          placement="top-start"
          width="400"
          trigger="click">
          <div class="max-height">
            <el-button
              @click="iconChangeHandle(item)"
              size="mini"
              v-for="(item, index) in icons"
              :key="index" >
              <i class="iconfont" :class="item"></i>
            </el-button>
          </div>
          <el-input clearable v-model="form.icon" readonly slot="reference" placeholder="图标"></el-input>
        </el-popover>
      </div>
      <div slot="nameForm">
        <el-form-item
          label="信息资源名称"
          prop="">
          <el-row>
            <el-col :span="12">
              <el-form-item prop="name">
                <el-input clearable v-model="form.name" placeholder="自定义内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="englishName">
                <el-input clearable v-model="form.englishName" placeholder="自定义内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
      </div>
      <div slot="codeForm">
        <el-input clearable v-model="form.code" placeholder="自定义内容"></el-input>
      </div>
    </k-form>
    <body-layout>
      <div class="btn-warpper" v-if="title !== '详情'">
        <el-button type="primary" @click="addDataElement">新增信息项</el-button>
      </div>
      <k-table
        @selectionChangeHandle="selectionChangeHandle"
        @sizeChangeHandle="sizeChangeHandle"
        @currentChangeHandle="currentChangeHandle"
        @detailHandle="detailHandle"
        @editHandle="editHandle"
        @deleteHandle="deleteHandle"
        :table="table">
      </k-table>
    </body-layout>
  </k-dialog>
</template>

<script>
// import clonedeep from 'lodash/clonedeep'
import kDialog from 'components/_dialog/dialog'
import kDetail from 'components/_form/detail'
import kForm from 'components/_form/form'
import kTable from 'components/_table/table'
import bodyLayout from 'components/_layout/bodyLayout'
import formMixin from 'js/mixin/form'
import common from 'js/mixin/common'
import icons from 'js/util/icon'
import {tagData, fromData, formatData, sexData, hobbyData, dataIdsData} from 'js/api/test/test1'
import {sysMenuParentId} from 'js/api/system/menu'

export default {
  name: 'dialogOne',
  components: {kDialog, kDetail, kForm, kTable, bodyLayout},
  mixins: [common, formMixin],
  props: {
    // 弹窗名称
    title: {
      type: String,
      default: '提示'
    },
    // dialog大小:large, middle, small, mini
    width: {
      type: String,
      default: 'middle'
    },
    // 表单数据
    formData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      iconVisible: false,
      fullscreen: true,
      column: 3,
      formRef: 'formOne',
      dialogRef: 'dialogOne',
      form: {
        id: '',
        name: '',
        englishName: '',
        code: '',
        from: '',
        format: [],
        time: '',
        timeRange: '',
        detail: '',
        month: '',
        tag: [],
        sex: '',
        icon: '',
        hobby: [],
        files: [],
        parentId: '',
        parentName: '',
        dataIds: []
      },
      props: [
        {
          label: '信息资源名称',
          prop: 'name',
          inputType: 'other',
          detailTemplate: true,
          editTemplate: true
        },
        {
          label: '上传文件',
          prop: 'files',
          inputType: 'upload'
        },
        {
          label: '信息资源代码',
          prop: 'code',
          inputType: 'other'
        },
        {
          label: '图标',
          prop: 'icon',
          inputType: 'other'
        },
        {
          label: '上级菜单',
          prop: 'parentName',
          defaultProp: 'parentId',
          inputType: 'inputTree',
          visible: false
        },
        {
          label: '性别',
          prop: 'sex',
          inputType: 'radio',
          options: [],
          defaultProps: {
            id: 'id',
            label: 'name'
          }
        },
        {
          label: '爱好',
          prop: 'hobby',
          inputType: 'checkbox',
          options: []
        },
        {
          label: '资源提供方',
          prop: 'from',
          inputType: 'select',
          options: [],
          defaultProps: {
            id: 'id',
            label: 'name'
          }
        },
        {
          label: '信息资源格式',
          prop: 'format',
          inputType: 'cascader',
          options: [],
          defaultProps: {
            value: 'id',
            label: 'name',
            children: 'children'
          },
          changeOnSelect: true
        },
        {
          label: '发布日期',
          prop: 'time',
          inputType: 'datePicker',
          pickerOptions: {
            disabledDate (time) {
              return time.getTime() < Date.now()
            }
          }
        },
        {
          label: '发布月份',
          prop: 'month',
          inputType: 'datePicker',
          type: 'month'
        },
        {
          label: '存量数据年限',
          prop: 'timeRange',
          inputType: 'datePicker',
          type: 'daterange'
        },
        {
          label: '标签',
          prop: 'tag',
          inputType: 'select',
          multiple: true,
          collapseTags: true,
          defaultProps: {
            id: 'id',
            label: 'name'
          }
        },
        {
          label: '详情',
          prop: 'detail',
          inputType: 'textarea',
          detailClick: true
        }
      ],
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        englishName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        files: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        code: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        from: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        format: [
          { required: true, message: '不能为空', trigger: ['change', 'blur'] }
        ],
        hobby: [
          { required: true, message: '不能为空', trigger: ['change', 'blur'] }
        ],
        time: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        tag: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        timeRange: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        detail: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      table: {
        loading: false,
        // table数据
        data: [],
        // table 表头
        tr: [
          {
            prop: 'chineseName',
            label: '中文名称'
          },
          {
            prop: 'englishName',
            label: '英文名称'
          },
          {
            prop: 'code',
            label: '内部标识符'
          }
        ],
        // 操作
        operation: {
          hasOperation: true,
          label: '操作',
          width: 200,
          type: 'text',
          minWidth: '',
          // danger-红色 warning-黄色 primary-蓝色 success-绿色 info-灰色 默认-白色
          data: [
            {
              name: 'detail',
              type: '',
              label: '详情',
              id: 1,
              fn: 'detailHandle'
            },
            {
              name: 'edit',
              type: 'warning',
              label: '编辑',
              id: 2,
              fn: 'editHandle'
            },
            {
              name: 'delete',
              type: 'danger',
              label: '删除',
              id: 3,
              fn: 'deleteHandle'
            }
          ]
        }
      },
      pagination: {
        page: 1,
        limit: 10
      },
      tableIndex: ''
    }
  },
  computed: {
    icons () {
      return icons
    }
  },
  created () {
    this.init()
    this.busWatch()
  },
  methods: {
    init () {
      this.getTagData()
      this.getFromData()
      this.getFormatData()
      this.getSexData()
      this.getHobbyData()
      this.getParentId()
    },
    // 上级菜单
    getParentId () {
      sysMenuParentId().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('parentName', this.props, res.data)
        }
      })
    },
    busWatch () {
      this.getDataElementData()
    },
    getTableData (data = {}) {
      dataIdsData(data).then((res) => {
        this.table.data = res.data
      })
    },
    getSexData () {
      sexData().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('sex', this.props, res.data)
        }
      })
    },
    getHobbyData () {
      hobbyData().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('hobby', this.props, res.data)
        }
      })
    },
    getTagData () {
      tagData().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('tag', this.props, res.data)
        }
      })
    },
    getFromData () {
      fromData().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('from', this.props, res.data)
        }
      })
    },
    getFormatData () {
      formatData().then((res) => {
        if (res.code === this.GLOBAL.SUCCESS) {
          this.setOptions('format', this.props, res.data)
        }
      })
    },
    // Dialog 打开的回调
    openDialogHandle () {
      if (this.title === this.GLOBAL.ADD) {
        this.clearValidate()
      }
      if (this.title === this.GLOBAL.EDIT) {
        this.clearValidate()
        this.getTableData({dataIds: this.formData.dataIds})
        this.validate()
      }
      if (this.title === this.GLOBAL.DETAIL) {
        this.getTableData({dataIds: this.formData.dataIds})
        this.hideTableBtn('table', 'edit', 'delete')
      }
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      if (this.title === this.GLOBAL.EDIT || this.title === this.GLOBAL.ADD) {
        this.clearForm()
      }
      this.$set(this.table, 'data', [])
      this.restoreTableBtn()
    },
    submitHandle (data) {
      this.close()
    },
    // 详情数据点击事件
    detailDetailClickHandle (row) {
      this.$alert(row, '详情数据', {
        confirmButtonText: '确定',
        callback: () => {}
      })
    },
    // 新增信息项
    addDataElement () {
      this.$emit('addDataElement')
    },
    // 修改信息项
    editHandle (index, row) {
      this.$emit('dataElementEditHandle', row, index)
      this.tableIndex = index
    },
    // 信息项详情
    detailHandle (index, row) {
      this.$emit('dataElementDetailHandle', row, index)
    },
    // 获取新增修改信息项数据
    getDataElementData () {
      this.$root.Bus.$on('dataElementData', (data, title) => {
        if (title.indexOf(this.GLOBAL.ADD) > -1) {
          this.table.data.push(data)
        } else if (title.indexOf(this.GLOBAL.EDIT) > -1) {
          let tableData = this.table.data
          for (let i = 0, len = tableData.length; len > i; i++) {
            if (data.id && tableData[i].id === data.id) {
              this.$set(tableData, i, data)
              break
            } else {
              this.$set(tableData, this.tableIndex, data)
            }
          }
        }
      })
    },
    iconChangeHandle (icon) {
      this.$set(this.form, 'icon', icon)
      this.iconVisible = false
    }
  },
  beforeDestroy () {
    console.log('destory')
    this.$root.Bus.$off('dataElementData')
  }
}
</script>

<style lang="scss" scoped>
.rule-form {
  .el-select, .el-cascader {
    width: 100%;
  }
}
.btn-warpper {
  margin-bottom: 10px;
}
.max-height {
  .el-button {
    padding: 8px !important;
    margin: 8px 0 0 8px !important;
  }
}
</style>
