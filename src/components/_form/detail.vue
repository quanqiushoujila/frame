<template>
  <el-form
    :label-width="labelWidth"
    class="detail-form">
    <template v-for="item in currentProps">
      <el-form-item
        :label="item.label"
        v-if="!isArray(item) && item.inputType === 'tree' && item.show == null ? true : item.show"
        :key="item.prop">
        <el-tree
          :ref="item.prop + 'Tree'"
          :check-strictly="item.checkStrictly || false"
          :data="item.options"
          show-checkbox
          default-expand-all
          node-key="id"
          highlight-current
          :props="item.defaultProps || treeDefaultProps">
        </el-tree>
      </el-form-item>
      <el-form-item
        :label="item.label"
        v-else-if="!isArray(item) && item.show == null ? true : item.show"
        :key="item.prop">
        <span class="ellipsis">
          {{(data[data[item.prop + detailName] != null ? item.prop + detailName : item.prop])}}
        </span>
      </el-form-item>
      <el-form-item
        class="moreStyle"
        :label="item[0].label"
        v-else-if="isArray(item) && item.show == null ? true : item.show"
        :key="item[0].prop">
        <el-col
          :span="12"
          v-for="result in item"
          :key="result.prop">
          <span class="ellipsis" v-if="result.show == null ? true : item.show">
            {{(data[data[result.prop + detailName] != null ? result.prop + detailName : result.prop])}}
          </span>
        </el-col>
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
import isArray from 'lodash/isArray'
import clonedeep from 'lodash/clonedeep'
import {toggleDisabled} from 'js/util'
export default {
  name: 'kDetail',
  data () {
    return {
      treeDefaultProps: {
        children: 'children',
        label: 'label'
      },
      currentProps: []
    }
  },
  props: {
    labelWidth: {
      type: String,
      default: '100px'
    },
    props: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    detailName: {
      type: String,
      default: 'ForShow'
    }
  },
  watch: {
    props: {
      handler (newVal) {
        this.currentProps = clonedeep(newVal)
        this.currentProps.forEach((item) => {
          if (item.inputType === 'tree') {
            item.options = toggleDisabled(item.options, true)
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    isArray (val) {
      return isArray(val)
    },
    // 初始化tree
    initTree (prop, val = []) {
      prop += 'Tree'
      this.$refs[prop][0].setCheckedKeys(val)
    },
    // 打开弹窗记录数据tree
    openInitTree (prop) {
      let val = []
      if (this.data[prop]) {
        val = this.data[prop]
      }
      this.initTree(prop, val)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-form {
  span {
    display: block;
    border: 1px solid #dcdfe6;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
  }
  .more {
    .el-col {
      margin-top: 25px;
    }
    .el-col:nth-child(1), .el-col:nth-child(2) {
      margin-top: 0;
    }
  }
}
</style>
