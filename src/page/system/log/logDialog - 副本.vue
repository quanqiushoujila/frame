<template>
  <k-dialog
    :dialogVisible="dialogVisible"
    :title="title"
    :width="width"
    @beforeCloseHandle="beforeCloseHandle"
    @closeDialogHandle="closeDialogHandle"
    @openDialogHandle="openDialogHandle"
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
import logDetail from 'components/_other/logDetail'
export default {
  name: 'logDialog',
  props: {
    title: {
      type: String,
      default: 'ÌáÊ¾'
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
      dialogVisible: false
    }
  },
  components: {kDialog, logDetail},
  methods: {
    open () {
      this.dialogVisible = true
    },
    openDialogHandle () {
    },
    closeDialogHandle () {
    },
    beforeCloseHandle () {
      this.dialogVisible = false
    }
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
