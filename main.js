import App from './App'
import Vue from 'vue'
import TuniaoUI from 'tuniao-ui'
import store from './store'
let vuexStore = require('@/store/$tn.mixin.js')
Vue.mixin(vuexStore)
Vue.use(TuniaoUI)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()