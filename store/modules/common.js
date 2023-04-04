export default {
	state: {
		longParam: ''
	},
	getters: {
		longParam: state => state.longParam
	},
	mutations: {
        // 传入长参数
		setLongParam(state, param) {
			state.longParam = param
		}
	},
	actions: { 
		
	}
}