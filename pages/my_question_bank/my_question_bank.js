export default {
    data() {
        return {
            myQuestionBankList: [],
        }
    },
    onShow() {
        this.getMyQuestionBankList()
    },
    methods: {
        // 获取我的题库列表
        getMyQuestionBankList() {
            uni.post('/questionBank/my', {
                limit: 1000
            }).then(res => {
                this.myQuestionBankList = res.data.question_banks
            })

        },
		// 新建题库
		toCreate() {
			uni.navigateTo({
				url: '/pages/my_question_bank/create/create'
			})
		},
        // 题库详情
        toDetail(item) {
            uni.navigateTo({
                url: '/pages/my_question_bank/question_manage/question_manage?id=' + item.id
            })
        },
        // 操作菜单
        showMore(item) {
            uni.showActionSheet({
                itemList: ['编辑题库', '题目管理', '删除'],
                success: (res) => {
                    if (res.tapIndex === 0) {
                        uni.navigateTo({
                            url: '/pages/my_question_bank/create/create?id=' + item.id
                        })
                    } else if (res.tapIndex === 1) {
                        uni.navigateTo({
                            url: '/pages/my_question_bank/question_manage/question_manage?id=' + item.id
                        })
                    } else if (res.tapIndex === 2) {
                        uni.showModal({
                            title: '提示',
                            content: '确定删除该题库吗？',
                            success: (res) => {
                                if (res.confirm) {
                                    uni.post('/questionBank/delete', { id: item.id }).then(res => {
                                        uni.showToast({
                                            title: '删除成功',
                                            icon: 'success'
                                        })
                                        this.getMyQuestionBankList()
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }
    },
}