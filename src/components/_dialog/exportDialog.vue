<template>
  <k-dialog
    title="导出"
    width="small"
    :dialogVisible="visible"
    :bodyStyle="{height: '150px'}"
    :btns=btns
    @beforeCloseHandle="beforeCloseHandle"
    @confirmHandle="confirmHandle"
    @cancelHandle="cancelHandle"
  >
    <p class="notice">如导出数据量大，下载请耐心等待！</p>
    <div class="export-btn">
      <a href="javascript:;" class="el-button el-button--default">导入</a>
    </div>
  </k-dialog>
</template>

<script>
import kDialog from 'components/_dialog/dialog'
export default {
  name: 'exportDialog',
  components: {kDialog},
  data () {
    return {
      visible: false,
      btns: []
    }
  },
  methods: {
    open () {
      this.visible = true
    },
    confirmHandle () {

    },
    cancelHandle () {
      this.visible = false
    },
    beforeCloseHandle () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.notice {
  background-color: rgba(64,158,255,.1);
  display: block;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(64,158,255,.2);
}
.export-btn {
  text-align: center;
}
</style>
