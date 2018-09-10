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
    :fullscreen="fullscreen"
    @open="openDialogHandle"
    @close="closeDialogHandle">
    <div class="dialog-body" :style="bodyStyle" ref="dialogBody">
      <div ref="bodyHeight">
        <slot></slot>
      </div>
    </div>
    <div slot="footer" class="dialog-footer" v-if="isBtnGroup">
      <el-button
        v-for="(item, index) in btnGroup"
        :key="item.name"
        :type="btnTypes[index]"
        v-if="isBtnShow(item.show)"
        :disabled="isDisabled(item.disabled)"
        @click="clickHandle(item.fn)">
        {{item.name}}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import isBoolean from 'lodash/isBoolean'
export default {
  name: 'kDialog',
  data () {
    return {
      newWidth: '50%',
      dialogFootHeight: 70,
      minDialogBodyHeight: 250,
      documentClientHeight: 250,
      // body自定义样式
      bodyStyle: {},
      dialogVisible: false,
      btnTypes: ['', 'primary', 'warning', 'info', 'success', 'danger']
    }
  },
  props: {
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
    // 是否需要按钮组
    isBtnGroup: {
      type: Boolean,
      default: false
    },
    // 按钮组
    btnGroup: {
      type: Array,
      default () {
        return [
          {
            name: '取消',
            fn: 'cancelHandle'
          },
          {
            name: '确认',
            fn: 'confirmHandle',
            show: true,
            disabled: false
          }
        ]
      }
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  mounted () {
    this.resetDocumentClientHeight()
  },
  watch: {
    newWidth: {
      handler (newVal) {
        const size = [{name: 'large', width: '80%'}, {name: 'middle', width: '65%'}, {name: 'small', width: '50%'}, {name: 'mini', width: '30%'}]
        const index = size.findIndex((item) => {
          return item.name === this.width
        })
        this.newWidth = index === -1 ? this.width : size[index].width
        if (this.fullscreen) {
          this.newWidth = '100%'
        }
      },
      immediate: true
    },
    dialogVisible (newVal) {
      if (newVal) {
        this.$nextTick(() => {
          const height = this.$refs.bodyHeight.offsetHeight
          if (height < this.minDialogBodyHeight) {
            this.bodyStyle = {'height': (this.minDialogBodyHeight) + 'px'}
          }
          if (this.fullscreen) {
            this.bodyStyle = {'height': `${window.innerHeight - (70 + 54 + 60)}px`}
          }
        })
      }
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
    },
    close () {
      this.dialogVisible = false
    },
    isBtnShow (status) {
      const result = isBoolean(status) ? (status ? 1 : 0) : 1
      return !!result
    },
    isDisabled (status) {
      const result = isBoolean(status) ? (status ? 1 : 0) : 0
      return !!result
    },
    // 按钮是否禁用
    toggleDisabledButton (name = '确认', status) {
      for (let i = 0, len = this.btnGroup.length; i < len; i++) {
        if (this.btnGroup[i].name === name) {
          if (status && isBoolean(status)) {
            this.$set(this.btnGroup[i], 'disabled', status)
          } else {
            if (this.btnGroup[i].disabled) {
              this.$set(this.btnGroup[i], 'disabled', false)
            } else {
              this.$set(this.btnGroup[i], 'disabled', true)
            }
          }
          break
        }
      }
    },
    // 关闭前的回调，会暂停 Dialog 的关闭
    beforeCloseHandle (done) {
      this.$emit('beforeCloseHandle', done)
      this.close()
    },
    // Dialog 打开的回调
    openDialogHandle () {
      this.$emit('openDialogHandle')
    },
    // Dialog 关闭的回调
    closeDialogHandle () {
      setTimeout(() => {
        this.$refs.dialogBody.scrollTo(0, 0)
      }, 50)
      this.$emit('closeDialogHandle')
      this.close()
    },
    // 自定义方法
    clickHandle (fn) {
      this.$emit(fn)
    },
    setDialogHeight () {
      const padding = 120
      const outter = 80
      const otherHeight = 120
      const other = outter + padding + otherHeight
      const height = other + this.minDialogBodyHeight
      if (height < this.documentClientHeight - other) {
        this.bodyStyle = {'height': (this.documentClientHeight - other) + 'px'}
      } else {
        this.bodyStyle = {'height': (this.minDialogBodyHeight) + 'px'}
      }
      if (this.fullscreen) {
        this.bodyStyle = {'height': `${window.innerHeight - (70 + 54 + 60)}px`}
      }
    },
    // 重置窗口可视高度
    resetDocumentClientHeight () {
      this.documentClientHeight = document.documentElement['clientHeight']
      this.setDialogHeight()
      window.onresize = () => {
        this.documentClientHeight = document.documentElement['clientHeight']
        this.setDialogHeight()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
  height: 300px;
  overflow: auto;
  margin: 0 -20px;
  padding: 0 20px;
}
</style>
