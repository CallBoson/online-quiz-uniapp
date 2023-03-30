import config from "./config"

const base_url = config.API_PREFIX

class Request {
	post(url, data) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: base_url + url,
				data: data ?? {},
				header: { Authorization: 'Bearer ' + uni.getStorageSync('token') },
				method: 'POST',
				success: (res) => {
					if (res?.data?.status == 200) {
						return resolve(res.data)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.message
						})
						return reject(res.data)
					}
				},
				fail: (err) => {
					console.error('uni.request => fail')
					uni.showToast({
						icon: 'none',
						title: '服务器发生错误'
					})
					return reject(err)
				}
			})
		})
	}
}

export default new Request()