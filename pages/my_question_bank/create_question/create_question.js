export default {
    data() {
        return {
            mode: 'create', // create:创建题目 edit:编辑题目 manual:手动添加题目
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

        if (options?.mode) {
            this.mode = options.mode
        }

        if (options?.mode === 'edit') {
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
            this.options_judge.answer = !!(parseInt(e.detail.value))
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
        // 表单验证
        validateForm() {
            const error = (title) => {
                uni.showToast({
                    title,
                    icon: 'none'
                })
                throw new Error(title)
            }
            // 题目内容
            const questionContent = this.question.content
            if (!questionContent) {
                error('题目不能为空')
            } else if (questionContent.length > 1000) {
                error('题目长度不能超过1000')
            }

            // 题目类型
            const type = parseInt(this.currentQuestionType)
            if (![1, 2, 3, 4, 5].includes(type)) {
                error('题目类型错误')
            }

            // 题目答案
            let answer
            if (type === 1) {
                // 单选题
                answer = this.options_single
                if (!(answer instanceof Array)) {
                    error('单选题参数应为数组')
                }
                if (answer.length <= 1) {
                    error('单选题至少需要两个选项')
                }
                if (answer.some(item => (!item?.content) || item.content.trim().length > 100)) {
                    error('单选题选项长度为1~100')
                }
                if (answer.filter(item => item?.isAnswer).length !== 1) {
                    error('单选题有且只有一个正确答案')
                }
            } else if (type === 2) {
                // 多选题
                answer = this.options_multiple
                if (!(answer instanceof Array)) {
                    error('多选题参数应为数组')
                }
                if (answer.length <= 1) {
                    error('多选题至少需要两个选项')
                }
                if (answer.some(item => (!item?.content) || item.content.trim().length > 100)) {
                    error('多选题选项长度为1~100')
                }
                if (answer.filter(item => item?.isAnswer).length < 1) {
                    error('多选题至少有一个正确答案')
                }
            } else if (type === 4) {
                // 填空题
                answer = this.options_fill
                if (!(answer instanceof Array)) {
                    error('填空题参数应为数组')
                }
                if (answer.length < 1) {
                    error('填空题至少需要一个参考答案')
                }
                if (answer.some(item => !(item instanceof Array) || item.length < 1)) {
                    error('填空题参考答案应为数组且至少有一个答案')
                }
                if (answer.some(item => item.some(answer => !answer || answer.trim().length > 50))) {
                    error('填空题参考答案长度为1~50')
                }
            }

            return true
        },
        // 保存
        save() {
            if (!this.validateForm()) {
                return
            }

            if (this.mode === 'manual') {
                this.manualAdd()
                return
            }

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
                data.answer = this.options_judge
            } else if (this.currentQuestionType === 4) {
                // 填空题
                data.answer = this.options_fill
            }

            uni.post(`/question/${this.mode === 'edit' ? 'edit' : 'create'}`, data).then(() => {
                uni.hideLoading()
                uni.$emit('fetchData')
                uni.navigateBack()
            })
        },
        // 手动添加题目
        manualAdd() {
            uni.$emit('manualAdded', {
                question: this.question,
                type: this.currentQuestionType,
                answer_single: this.options_single,
                answer_multiple: this.options_multiple,
                answer_judge: this.options_judge,
                answer_fill: this.options_fill,
                analysis: this.analysis
            })
            uni.navigateBack()
        }
    }
}