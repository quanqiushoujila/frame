<template>
  <el-dialog
    :append-to-body="appendToBody"
    :title="title"
    :width="newWidth"
    :modal="modal"
    :show-close="showClose"
    :close-on-press-escape="closeOnPressEscape"
    :close-on-click-modal="closeOnClickModal"
    :lock-scroll="lockScroll"
    :visible.sync="dialogVisible"
    :before-close="beforeCloseHandle"
    @open="openDialogHandle"
    @close="closeDialogHandle">
    <div class="dialog-body" :style="bodyStyle">
      <slot></slot>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button
        v-for="(item, index) in btnGroup"
        :key="item.name"
        :type="btnTypes[index]"
        @click="clickHandle(item.fn)">
        {{item.name}}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import clonedeep from 'lodash/clonedeep'
export default {
  name: 'kDialog',
  data () {
    return {
      btnTypes: ['', 'primary', 'warning', 'info', 'success', 'danger'],
      btnGroup: []
    }
  },
  props: {
    // 是否显示 Dialog
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // Dialog 的标题
    title: {
      type: String,
      default: '提示'
    },
    // Dialog 的宽度 dialog大小:large, middle, small, mini
    width: {
      type: String,
      default: '50%'
    },
    // 是否为全屏 Dialog
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 是否需要遮罩层
    modal: {
      type: Boolean,
      default: true
    },
    // 是否在 Dialog 出现时将 body 滚动锁定
    lockScroll: {
      type: Boolean,
      default: true
    },
    // 是否可以通过点击 modal 关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    // 是否可以通过按下 ESC 关闭 Dialog
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 是否是详情
    hasDetail: {
      type: Boolean,
      default: false
    },
    // 按钮组
    btns: {
      type: Array,
      default () {
        return [
          {
            name: '取消',
            fn: 'cancelHandle'
          },
          {
            name: '确认',
            fn: 'confirmHandle'
          }
        ]
      }
    },
    bodyStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    hasDetail (newVal) {
      console.log(newVal)
      if (newVal) {
        this.btnGroup = []
      } else {
        this.btnGroup = this.btns.length > 0 ? clonedeep(this.btns) : clonedeep([{name: '取消', n: 'cancelHandle'}, {name: '确认', fn: 'confirmHandle'}])
      }
    }
  },
  mounted () {
    if (this.hasDetail) {
      this.btnGroup = []
    } else {
      this.btnGroup = this.btns.length > 0 ? clonedeep(this.btns) : clonedeep([{name: '取消', n: 'cancelHandle'}, {name: '确认', fn: 'confirmHandle'}])
    }
  },
  computed: {
    newWidth () {
      const size = [{name: 'large', width: '80%'}, {name: 'middle', width: '65%'}, {name: 'small', width: '50%'}, {name: 'mini', width: '30%'}]
      const index = size.findIndex((item) => {
        return item.name === this.width
      })
      return index === -1 ? this.width : size[index].width
    }
  },
  methods: {
    // 关闭前的回调，会暂停 Dialog 的关闭
    beforeCloseHandle (done) {
      this.$emit('beforeCloseHandle', done)
    },
    // Dialog 打开的回调
    openDialogHandle () {
      this.$emit('openDialogHandle')
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      this.$emit('closeDialogHandle')
    },
    // 自定义方法
    clickHandle (fn) {
      this.$emit(fn)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
  height: 300px;
  // min-height: calc(100vh - 300px);
  overflow: auto;
  margin: 0 -20px;
  padding: 0 20px;
}
</style>
