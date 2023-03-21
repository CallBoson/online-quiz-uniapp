import App from './App'
import Vue from 'vue'
import TuniaoUI from 'tuniao-ui'
import store from './store'
import request from './utils/request.js'
uni.post = request.post
let vuexStore = require('@/store/$tn.mixin.js')
Vue.mixin(vuexStore)
Vue.use(TuniaoUI)
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()