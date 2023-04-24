export default {
    data() {
        return {
            id: '', // 答题id
            quizDetail: {}, // 答题详情
        }
    },
    onLoad(options) {
        this.id = options.id
        this.getQuizDetail()
    },
    methods: {
        // 获取答题详情
        getQuizDetail() {
            uni.post('/quiz/detail', {
                id: this.id
            }).then(res => {
                console.log(res)
                res.data.date_range = res.data.date_range ? JSON.parse(res.data.date_range).join('至') : undefined
                this.quizDetail = res.data
            })
        },
        // 点击答题
        goToQuiz() {
            uni.navigateTo({
                url: `/pages/quiz/do_quiz/do_quiz?id=${this.id}`
            })
        },
        // 格式化时间
        formatDate(date) {
            date = new Date(date)
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            const hours = String(date.getHours()).padStart(2, '0')
            const minutes = String(date.getMinutes()).padStart(2, '0')
            const seconds = String(date.getSeconds()).padStart(2, '0')
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        },
        // 计算用时
        calcTime(item) {
            const date1 = new Date(item.start_time)
            const date2 = new Date(item.end_time)
            const diffInMs = Math.abs(date2 - date1)
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

            if (diffInMinutes === 0) {
                // 一分钟内显示秒
                const diffInSeconds = Math.floor(diffInMs / 1000)
                return `${diffInSeconds}秒`
            }
            return diffInMinutes + '分'
        },
        // 查看答题记录结果
        goToResult(id) {
            uni.navigateTo({
                url: `/pages/quiz/quiz_result/quiz_result?id=${id}`
            })
        }
    }
}