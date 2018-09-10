var kLogDetail = Vue.extend({
  template:
    '<el-form :label-width="labelWidth" class="klogdetail detail-form">' +
        '<el-form-item :label="item.split(\':\')[0]" v-for="item in data" :key="item">' +
            '<span class="ellipsis">' +
                '{{item.split(\':\')[1] || \'无\'}}' +
            '</span>' +
        '</el-form-item>' +
    '</el-form>',
  data () {
    return {

    }
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    labelWidth: {
      type: String,
      default: '100'
    }

  }
})

Vue.component('kLogDetail', kLogDetail)
