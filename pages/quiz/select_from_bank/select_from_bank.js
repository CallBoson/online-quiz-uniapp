export default {
    data() {
        return {
            tabList: [
                { "tab-name": '全部' },
                { "tab-name": '我的题库' },
            ],
            currentTab: 0, // 当前选中的tab
            currentTagId: undefined, // 当前选中的标签id
            bankList: [], // 题库列表
            page: {
                current_page: 1,
                limit: 10,
                total_pages: 1,
                total_count: 0,
                has_more: false
            },
            loadStatus: 'loadmore' // 加载状态
        }
    },
    mounted() {
        this.getTags()
        this.getBankList()
    },
    onReachBottom() {
        if (this.page.has_more) {
            this.page.current_page++
            this.getBankList()
        }
    },
    methods: {
        // 点击tab切换
        changeTab(e) {
            this.currentTab = e
            this.currentTagId = this.tabList[e].tagId
            this.bankList = []
            this.page.current_page = 1
            this.getBankList()
        },
        // 获取标签
        getTags() {
            uni.post('/questionBank/tags').then(res => {
                for(let i = 0; i < res.data.length; i++) {
                    this.tabList.push({
                        "tagId": res.data[i].id,
                        "tab-name": res.data[i].name
                    })
                }
            })
        },
        // 获取题库列表
        async getBankList() {
            this.loadStatus = 'loading'
            let list = []
            if (this.currentTab === 1) {
                // 我的题库
                list = await uni.post('/questionBank/my', {
                    page: this.page.current_page,
                })
            } else {
                // 全部
                list = await uni.post('/questionBank/all', {
                    tagId: this.currentTagId,
                    page: this.page.current_page,
                })
            }
            this.bankList = this.bankList.concat(list.data.question_banks)
            this.page = {
                current_page: list.data.current_page,
                limit: list.data.limit,
                total_pages: list.data.total_pages,
                total_count: list.data.total_count,
                has_more: list.data.has_more
            }
            this.loadStatus = list.data.has_more ? 'loadmore' : 'nomore'
        },
        // 点击题库
        toBank(id) {
            uni.navigateTo({
                url: `/pages/my_question_bank/question_manage/question_manage?mode=select&id=${id}`
            })
        }
    }
}