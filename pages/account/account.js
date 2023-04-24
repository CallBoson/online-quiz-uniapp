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
		},
		toMyQuiz() {
			uni.navigateTo({
				url: '/pages/quiz/my_quiz/my_quiz'
			})
		},
		logout() {
			uni.showModal({
				title: '提示',
				content: '确定退出登录吗？',
				success: (res) => {
					if (res.confirm) {
						uni.removeStorageSync('token')
						uni.removeStorageSync('user')
						this.$store.commit('setUsername', '')
						this.$store.commit('setAvatar', '')
					}
				}
			})
		},
		toProfile() {
			uni.navigateTo({
				url: '/pages/profile/profile'
			})
		}
	}
}
