import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/commom'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common
  }
})
