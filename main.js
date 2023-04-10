import App from './App'
import Vue from 'vue'
import TuniaoUI from 'tuniao-ui'
import store from './store'
import request from './utils/request.js'
import upload from './utils/upload.js'
import util from './utils/util.js'

uni.post = request.post // 封装uni.request
uni.uploadImage = upload.uploadImage // 封装uni.uploadFile
uni.$util = util // 封装uni.$util

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