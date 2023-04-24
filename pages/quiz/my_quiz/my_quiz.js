export default {
    data() {
        return {
            tab_list: [
                { "tab-name": '我参与的' },
                { "tab-name": '我管理的' },
            ],
            current_tab: 0,
            quizList: [], // 答题列表
        }
    },
    mounted() {
        this.getQuizList()
    },
    methods: {
        // 切换tab
        changeTab(e) {
            this.current_tab = e
            this.getQuizList()
        },
        // 获取答题列表
        getQuizList() {
            uni.post('/quiz/list', {
                type: this.current_tab == 0 ? 2 : 1 // 1:我管理的 2:我参与的
            }).then(res => {
                console.log(res)
                this.quizList = res.data.list
            })
        },
        // 跳转到答题详情
        toQuizDetail(id) {
            uni.navigateTo({
                url: '/pages/quiz/quiz_detail/quiz_detail?id=' + id
            })
        }
    }
}