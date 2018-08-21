<template>
  <k-dialog
    ref="logDia"
    :title="title"
    :width="width"
    >
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="text-center">操作数据前</span>
          </div>
          <log-detail :data="form.old"/>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="text-center">操作数据后</span>
          </div>
          <log-detail :data="form.new"/>
        </el-card>
      </el-col>
    </el-row>
  </k-dialog>
</template>

<script>
import kDialog from 'components/_dialog/dialog'
import logDetail from 'components/_form/logDetail'
import formMixin from 'js/mixin/form'
export default {
  name: 'logDialog',
  components: {kDialog, logDetail},
  mixins: [formMixin],
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: 'middle'
    },
    form: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      dialogRef: 'logDia'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.rule-form {
  .el-select, .el-cascader {
    width: 100%;
  }
}
.box-card {
  span {
    display: block;
  }
}
</style>
