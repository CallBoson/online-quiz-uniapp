import Vue from 'vue'
import Vuex from 'vuex'

import tuniao from './modules/tuniao.js'
import user from './modules/user.js'
import common from './modules/common.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		tuniao,
		user,
		common
	}
})

export default store