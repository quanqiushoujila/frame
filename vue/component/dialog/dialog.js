var kDialog = Vue.extend({
  template:
    '<el-dialog' +
    '  :append-to-body="appendToBody"' +
    '  :title="title"' +
    '  :width="newWidth"' +
    '  :modal="modal"' +
    '  :show-close="showClose"' +
    '  :close-on-press-escape="closeOnPressEscape"' +
    '  :close-on-click-modal="closeOnClickModal"' +
    '  :lock-scroll="lockScroll"' +
    '  :visible.sync="dialogVisible"' +
    '  :before-close="beforeCloseHandle"' +
    '  @open="openDialogHandle"' +
    '  @close="closeDialogHandle">' +
    '  <div class="dialog-body" :style="bodyStyle" ref="dialogBody">' +
    '    <slot></slot>' +
    '  </div>' +
    '  <div slot="footer" class="dialog-footer" v-if="isBtnGroup">' +
    '    <el-button' +
    '      v-for="(item, index) in btnGroup"' +
    '      :key="item.name"' +
    '      :disabled="isDisabled(item.disabled)"' +
    '      :type="btnTypes[index]"' +
    '      @click="clickHandle(item.fn)">' +
    '      {{item.name}}' +
    '    </el-button>' +
    '  </div>' +
    '</el-dialog>',

  data: function () {
    return {
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
      default: function () {
        return [
          {
            name: '取消',
            fn: 'cancel-handle'
          },
          {
            name: '确认',
            fn: 'confirm-handle'
          }
        ]
      }
    },
    // body自定义样式
    bodyStyle: {
      type: Object,
      default: function () {
        return {}
      }
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    newWidth: function () {
      var self = this
      var size = [{name: 'large', width: '80%'}, {name: 'middle', width: '65%'}, {name: 'small', width: '50%'}, {name: 'mini', width: '30%'}]
      var data = size.filter(function(item) {
          return item.name === self.width
      });
      return data.length === 0 ? this.width : data[0].width
    }
  },
  methods: {
    open: function () {
      this.dialogVisible = true
    },
    close: function () {
      this.dialogVisible = false
    },
    isDisabled (status) {
      if (status) {
        if (isBoolean(status) && status) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    // 按钮是否禁用
    toggleDisabledButton (name, status) {
      name = name || '确认'
      for (var i = 0, len = this.btnGroup.length; i < len; i++) {
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
    beforeCloseHandle: function (done) {
      this.$emit('before-close-handle', done)
      this.close()
    },
    // Dialog 打开的回调
    openDialogHandle: function () {
      this.$emit('open-dialog-handle')
    },
    // Dialog 关闭的回调
    closeDialogHandle: function () {
      var self = this
      setTimeout(function () {
        self.$refs.dialogBody.scrollTo(0, 0)
      }, 100)
      this.$emit('close-dialog-handle')
      this.close()
    },
    // 自定义方法
    clickHandle: function (fn) {
      this.$emit(fn)
    }
  }
})

Vue.component('kDialog', kDialog)