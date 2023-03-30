export default {
    data() {
        return {
            question_bank_name: '',
            owner_info: {},
            questions: []
        }
    },
    onLoad(options) {
        if (options?.id) {
            this.getDetail(options.id)
        }
    },
    methods: {
        getDetail(id) {
            uni.post('/questionBank/questionManage', { id }).then(res => {
                console.log(res)
                this.question_bank_name = res.data.question_bank_name
                this.owner_info = res.data.owner
                this.questions = res.data.questions
            })
        }
    }
}