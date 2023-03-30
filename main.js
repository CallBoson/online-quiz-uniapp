import App from './App'
import Vue from 'vue'
import TuniaoUI from 'tuniao-ui'
import store from './store'
import request from './utils/request.js'
import upload from './utils/upload.js'
uni.post = request.post
uni.uploadImage = upload.uploadImage
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