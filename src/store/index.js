import Vue from 'vue'
import VueX from 'vuex'
import mutations from './mutations'
import actions from './actions'
import state from './state'
import getters from './getters'

Vue.use(VueX)

export default new VueX.Store({
    state,
    mutations,
    actions,
    getters
})