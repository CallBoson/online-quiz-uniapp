export default {
    data() {
        return {
            myQuestionBankList: []
        }
    },
    mounted() {
        this.getMyQuestionBankList()
    },
    methods: {
        // 获取我的题库列表
        getMyQuestionBankList() {
            uni.post('/questionBank/my').then(res => {
                this.myQuestionBankList = res.data
            })

        }
    },
}