import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
import NavIndexButton from '@/libs/components/nav-index-button.vue'
export default {
	mixins: [template_page_mixin],
	components: {
		NavIndexButton
	},
	data() {
		return {}
	},
	methods: {
		toLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
	}
}
