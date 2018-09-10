var kTab = Vue.extend({
  template:
    '<el-tabs type="border-card" class="tab">' +
        '<el-tab-pane :label="item.label" v-for="item in data" :key="item.label">' +
            '<el-row :gutter="10">' +
                '<el-col :span="8" v-for="item1 in item.data" :key="item1.id" class="item ellipsis">' +
                    '<span style="cursor: pointer;" @click="click(item1)">{{ item1[name] + count(item1.count) }}</span>' +
                '</el-col>' +
            '</el-row>' +
        '</el-tab-pane>' +
    '</el-tabs>',
  props: {
    data: {
      type: Array
    },
    name: {
      type: String,
      default: 'nameCn'
    }
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    count (val) {
      if (!val) {
        return ''
      }
      return '(' + val + ')'
    },
    click (item) {
      this.$emit('open-table', item)
    }
  }
})

Vue.component('kTab', kTab)
