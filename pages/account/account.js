import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
import NavIndexButton from '@/libs/components/nav-index-button.vue'
import { mapState } from 'vuex'
export default {
	mixins: [template_page_mixin],
	components: {
		NavIndexButton
	},
	data() {
		return {
			
		}
	},
	computed: {
		...mapState({
			username: state => state.user.username,
			avatar: state => state.user.avatar,
		})
	},
	methods: {
		toLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		},
		toMyQuestionBank() {
			uni.navigateTo({
				url: '/pages/my_question_bank/my_question_bank'
			})
		}
	}
}
