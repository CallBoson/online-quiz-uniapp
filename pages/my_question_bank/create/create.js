export default {
	data() {
		return {
            mode: 'create',
			form: {
				cover: '',
				name: '',
				tagIds: [],
				is_private: '0'
			},
			tags: [],
            currentEditId: undefined
		}
	},
    onLoad(options) {
		this.getTags()
        if (options?.id) {
            this.currentEditId = options.id
            this.getDeail()
            this.mode = 'edit'
			uni.setNavigationBarTitle({
				title: '编辑题库'
			})
        }
    },
	methods: {
        // 获取题库详情
        getDeail() {
            uni.post('/questionBank/detail', { id: this.currentEditId }).then(res => {
                this.form = {
                    cover: res.data.cover,
                    name: res.data.name,
                    tagIds: res.data.tags.map(item => item.id),
                    is_private: Number(res.data.is_private).toString()
                }
            })
        },
		// 获取标签列表
		getTags() {
			uni.post('/questionBank/tags').then(res => {
				this.tags = res.data
			})
		},
		// 新建题库
		create() {
			uni.showLoading({
				title: '创建中'
			})
			uni.post('/questionBank/create', this.form).then(res => {
				uni.$emit('fetchData')
				uni.redirectTo({
					url: '/pages/my_question_bank/question_manage/question_manage?id=' + res.data.id
				})
			}).finally(() => {
				uni.hideLoading()
			})
		},
        // 编辑题库
        edit() {
            uni.showLoading({
				title: '保存中'
			})
			uni.post('/questionBank/edit', {
                id: this.currentEditId,
                ...this.form
            }).then(res => {
				uni.$emit('fetchData')
				uni.redirectTo({
					url: '/pages/my_question_bank/question_manage/question_manage?id=' + res.data.id
				})
			}).finally(() => {
				uni.hideLoading()
			})
        },
		chooseCover() {
			uni.uploadImage().then(res => {
				this.form.cover = res.data.url
			})
		}
	}
}