export default {
    data() {
        return {
            mode: 'create', // create:创建题目 edit:编辑题目
            edit_id: '', // 编辑题目id
            question_bank_id: '', // 题库id
            question: { content: '' }, // 题干
            typeArray: ['单选题', '多选题', '判断题', '填空题', '简答题'],
            currentQuestionType: 1, // 1:单选题 2:多选题 3:判断题 4:填空题 5:简答题
            options_single: [{ content: '', isAnswer: false }], // 单选题选项
            options_multiple: [{ content: '', isAnswer: false }], // 多选题选项
            options_judge: { answer: undefined }, // 判断题选项
            options_fill: [['']], // 填空题答案
            analysis: { content: '' }, // 解析
        }
    },
    onLoad(options) {
        if (options?.id) {
            this.question_bank_id = options.id
        }
        if (options?.mode === 'edit') {
            this.mode = 'edit'
            uni.setNavigationBarTitle({
                title: '编辑题目'
            })
            const param = this.$store.getters.longParam
            this.edit_id = param.id
            this.currentQuestionType = param.type
            if (param.question) {
                this.question = param.question
            }
            if (param.answer_single) {
                this.options_single = param.answer_single.map(v => {
                    v.isAnswer = !!v.isAnswer
                    return v
                })
            }
            if (param.answer_multiple) {
                this.options_multiple = param.answer_multiple.map(v => {
                    v.isAnswer = !!v.isAnswer
                    return v
                })
            }
            if (param.answer_judge) {
                param.answer_judge.answer = !!param.answer_judge.answer
                this.options_judge = param.answer_judge
            }
            if (param.answer_fill) {
                this.options_fill = param.answer_fill
            }
            if (param.analysis) {
                this.analysis = param.analysis
            }
        }
    },
    methods: {
        // 选择题型
        selectQuestionType() {
            uni.showActionSheet({
                itemList: this.typeArray,
                success: (res) => {
                    this.currentQuestionType = res.tapIndex + 1
                }
            })
        },
        // 添加选项
        addOption() {
            if (this.currentQuestionType === 1) {
                // 单选题
                this.options_single.push({ content: '', isAnswer: false })
            } else if (this.currentQuestionType === 2) {
                // 多选题
                this.options_multiple.push({ content: '', isAnswer: false })
            } else if (this.currentQuestionType === 4) {
                // 填空题
                this.options_fill.push([''])
            }
        },
        // 删除选项
        removeOption(index) {
            if (this.currentQuestionType === 1) {
                if (this.options_single.length === 1) {
                    uni.showToast({
                        title: '至少保留一个选项',
                        icon: 'none'
                    })
                    return
                }
                this.options_single.splice(index, 1)
            } else if (this.currentQuestionType === 2) {
                if (this.options_multiple.length === 1) {
                    uni.showToast({
                        title: '至少保留一个选项',
                        icon: 'none'
                    })
                    return
                }
                this.options_multiple.splice(index, 1)
            } else if (this.currentQuestionType === 4) {
                if (this.options_fill.length === 1) {
                    uni.showToast({
                        title: '至少保留一个答案',
                        icon: 'none'
                    })
                    return
                }
                this.options_fill.splice(index, 1)
            }
        },
        // 点击单选题选项
        change_single(e) {
            this.options_single.forEach(item => {
                item.isAnswer = false
            })
            this.options_single[parseInt(e.detail.value)].isAnswer = true
        },
        // 输入单选题选项
        input_single(e) {
            this.options_single[e.target.dataset.index].content = e.detail.value
        },
        // 点击多选题选项
        change_multiple(e) {
            this.options_multiple.forEach(item => {
                item.isAnswer = false
            })
            e.detail.value.forEach(index => {
                this.options_multiple[parseInt(index)].isAnswer = true
            })
        },
        // 点击判断题选项
        change_judge(e) {
            this.options_judge.answer = e.detail.value === '1' ? true : false
        },
        // 添加填空题参考答案
        addFillAnswer(index) {
            this.options_fill[index].push('')
        },
        // 删除填空题参考答案
        removeFillAnswer(index, i) {
            if (this.options_fill[index].length === 1) {
                uni.showToast({
                    title: '至少保留一个参考答案',
                    icon: 'none'
                })
                return
            }
            this.options_fill[index].splice(i, 1)
        },
        // 输入多选题选项
        input_multiple(e) {
            this.options_multiple[e.target.dataset.index].content = e.detail.value
        },
        // 输入填空题参考答案
        input_fill(e) {
            this.options_fill[e.target.dataset.index][e.target.dataset.i] = e.detail.value
        },
        // 输入题干
        input_question(e) {
            this.question.content = e.detail.value
        },
        // 输入解析
        input_analysis(e) {
            this.analysis.content = e.detail.value
        },
        // 保存
        save() {
            uni.showLoading()
            const data = {
                id: this.mode === 'edit' ? this.edit_id : this.question_bank_id,
                type: this.currentQuestionType,
                question: this.question,
                answer: undefined,
                analysis: this.analysis
            }
            // 把选项转换成后端需要的格式
            if (this.currentQuestionType === 1) {
                // 单选题
                data.answer = Array.from(this.options_single, item => {
                    const obj = {}
                    obj.content = item.content
                    obj.isAnswer = item.isAnswer ? 1 : 0
                    return obj
                })
            } else if (this.currentQuestionType === 2) {
                // 多选题
                data.answer = Array.from(this.options_multiple, item => {
                    const obj = {}
                    obj.content = item.content
                    obj.isAnswer = item.isAnswer ? 1 : 0
                    return obj
                })
            } else if (this.currentQuestionType === 3) {
                // 判断题
                this.options_judge.answer = this.options_judge.answer ? 1 : 0
                data.answer = this.options_judge
            } else if (this.currentQuestionType === 4) {
                // 填空题
                data.answer = this.options_fill
            }

            uni.post(`/questionBank/${this.mode === 'edit' ? 'edit' : 'create'}Question`, data).then(() => {
                uni.hideLoading()
                uni.$emit('fetchData')
                uni.navigateBack()
            })
        }
        
    }
}