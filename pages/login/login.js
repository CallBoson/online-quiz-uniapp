import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
export default {
	mixins: [template_page_mixin],
	data() {
	  return {
		// 当前选中的模式
		currentModeIndex: 0,
		// 模式选中滑块
		modeSliderStyle: {
		  left: 0
		},
		// 是否显示密码
		showPassword: false,
		// 倒计时提示文字
		tips: '获取验证码'
	  }
	},
	watch: {
	  currentModeIndex(value) {
		const sliderWidth = uni.upx2px(476 / 2)
		this.modeSliderStyle.left = `${sliderWidth * value}px`
	  }
	},
	methods: {
	  // 切换模式
	  modeSwitch(index) {
		this.currentModeIndex = index
		this.showPassword = false
	  },
	  // 获取验证码
	  getCode() {
		if (this.$refs.code.canGetCode) {
		  this.$tn.message.loading('正在获取验证码')
		  setTimeout(() => {
			this.$tn.message.closeLoading()
			this.$tn.message.toast('验证码已经发送')
			// 通知组件开始计时
			this.$refs.code.start()
		  }, 2000)
		} else {
		  this.$tn.message.toast(this.$refs.code.secNum + '秒后再重试')
		}
	  },
	  // 获取验证码倒计时被修改
	  codeChange(event) {
		this.tips = event
	  }
	}
}