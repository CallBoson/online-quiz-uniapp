<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 登录
			const user = uni.getStorageSync('user')
			if (user) {
				uni.post('/user/login', JSON.parse(user)).then(res => {
					uni.setStorageSync('token', res.data.token)
					this.$store.commit('setUsername', res.data.username)
					this.$store.commit('setAvatar', res.data.avatar)
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
@import './tuniao-ui/index.scss';
@import './tuniao-ui/iconfont.css';
</style>
