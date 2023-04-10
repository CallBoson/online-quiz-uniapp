let originQuestions = []
export default {
    data() {
        return {
            mode: 'manage', // select: 选择题目，manage: 题目管理
            question_bank_id: '', // 题库id
            question_bank_name: '', // 题库名称
            owner_info: {}, // 题库创建者信息
            questions: [], // 题目列表
            showTypeSelect: false, // 是否显示题目类型选择
            typeList: [
                { label: '单选题', value: '1' },
                { label: '多选题', value: '2' },
                { label: '判断题', value: '3' },
                { label: '填空题', value: '4' },
                { label: '简答题', value: '5' },
            ], // 题目类型列表
            currentSelectType: undefined, // 当前选择的题目类型
            isShowDetail: false, // 是否显示题目详情
            mode_select_data: {
                isSelectAll: false, // 是否全选
            }
        }
    },
    onLoad(options) {
        if (options?.mode) {
            this.mode = options.mode
        }

        // 题目模式下的从题库选题完毕事件
        if (options?.mode !== 'select') {
            uni.$on('selectedQuestions', (questions) => {
                // 批量创建题目
                uni.post('/question/create/batch', {
                    id: this.question_bank_id,
                    questionList: questions.map(q => {
                        const answer = q.type == 1 ? q.answer_single : q.type == 2 ? q.answer_multiple : q.type == 3 ? { answer: q.answer_judge } : q.type == 4 ? q.answer_fill : null
                        return {
                            type: q.type,
                            question: q.question,
                            analysis: q.analysis,
                            answer
                        }
                    })
                }).then(() => {
                    this.getDetail()
                })
            })
        }

        if (options?.id) {
            this.question_bank_id = options.id
            this.getDetail()
            uni.$on('fetchData', () => {
                this.getDetail()
            })
        }
    },
    onUnload() {
        uni.$off('fetchData')
        uni.$off('selectedQuestions')
    },
    computed: {
        // 选择模式下的选中题目数量
        modeSelectCount() {
            return this.questions.filter(item => item.isSelect).length
        }
    },
    methods: {
        // 获取题库详情
        getDetail() {
            uni.post('/questionBank/questionManage', { id: this.question_bank_id }).then(res => {
                this.question_bank_name = res.data.question_bank_name
                this.owner_info = res.data.owner
                // 题目列表
                this.questions = Array.from(res.data.questions, item => {
                    if (item.question) {
                        item.question = JSON.parse(item.question)
                    }
                    if (item.answer_single) {
                        item.answer_single = JSON.parse(item.answer_single)
                    }
                    if (item.answer_multiple) {
                        item.answer_multiple = JSON.parse(item.answer_multiple)
                    }
                    if (item.answer_judge) {
                        item.answer_judge = JSON.parse(item.answer_judge)
                    }
                    if (item.answer_fill) {
                        item.answer_fill = JSON.parse(item.answer_fill)
                    }
                    if (item.analysis) {
                        item.analysis = JSON.parse(item.analysis)
                    }

                    // 选择模式下的题目选择状态
                    if (this.mode === 'select') {
                        item.isSelect = false
                    }

                    return item
                })
                originQuestions = this.questions
            })
        },
        // 选择题目类型
        confirmTypeSelect(value) {
            this.currentSelectType = value[0]
            this.questions = originQuestions.filter(item => {
                return String(item.type) === this.currentSelectType.value
            })
        },
        // 重置题目类型选择
        resetSelectType() {
            this.currentSelectType = undefined
            this.questions = originQuestions
        },
        // 获取题目选项
        getOptions(item) {
            const type = String(item.type)
            if (type === '1') {
                return item.answer_single
            } else if (type === '2') {
                return item.answer_multiple
            } else if (type === '3') {
                return [
                    { content: '正确' },
                    { content: '错误' },
                ]
            } else {
                return []
            }
        },
        // 获取题目答案文本
        getAnswerText(item) {
            const type = String(item.type)
            if (type === '1') {
                return item.answer_single.find(item => item.isAnswer).content
            } else if (type === '2') {
                return Array.from(item.answer_multiple.filter(item => item.isAnswer), obj => {
                    return obj.content
                }).join('；')
            } else if (type === '3') {
                return item.answer_judge.answer ? '正确' : '错误'
            } else if (type === '4') {
                let text = '\n'
                for (let i = 0; i < item.answer_fill.length; i++) {
                    text += `空${i+1}: ${item.answer_fill[i].join('；')}\n`;
                }
                return text
            } else {
                return ''
            }
        },
        // 操作菜单
        showMore() {
            uni.showActionSheet({
                itemList: ['从题库选题', '手动录入'],
                success: (res) => {
                    if (res.tapIndex === 0) {
                        uni.navigateTo({
                            url: '/pages/quiz/select_from_bank/select_from_bank'
                        })
                    } else if (res.tapIndex === 1) {
                        uni.navigateTo({
                            url: '/pages/my_question_bank/create_question/create_question?id=' + this.question_bank_id
                        })
                    }
                }
            })
        },
        // 编辑题目
        editQuestion(item) {
            this.$store.commit('setLongParam', item)
            uni.navigateTo({
                url: '/pages/my_question_bank/create_question/create_question?mode=edit'
            })
        },
        // 删除题目
        deleteQuestion(item) {
            uni.showModal({
                title: '提示',
                content: '确定要删除该题目吗？',
                success: (res) => {
                    if (res.confirm) {
                        uni.post('/question/delete', { id: item.id }).then(res => {
                            uni.showToast({
                                title: '删除成功',
                                icon: 'success',
                                duration: 2000
                            })
                            uni.$emit('fetchData')
                        })
                    }
                }
            })
        },
        // 选择模式下的点击全选选择框
        modeSelectCheck (e) {
            this.questions.forEach(item => {
                item.isSelect = e.value
            })
        },
        // 选择模式下的点击题目
        modeSelectClickQuestion (index) {
            if (this.mode !== 'select') {
                return
            }
            this.questions[index].isSelect = !this.questions[index].isSelect
        },
        // 选择模式下的添加到答题
        modeSelectAdd () {
            const selectedQuestions = this.questions.filter(item => item.isSelect)
            if (selectedQuestions.length === 0) {
                uni.showToast({
                    title: '请选择题目',
                    icon: 'none',
                })
                return
            }
            uni.$emit('selectedQuestions', selectedQuestions)
            // 返回上两级页面
            uni.navigateBack({
                delta: 2
            })
        }
    },
    filters: {
        // 题目类型
        questionTypeFilter(value) {
            switch (String(value)) {
                case '1':
                    return '单选题'
                case '2':
                    return '多选题'
                case '3':
                    return '判断题'
                case '4':
                    return '填空题'
                case '5':
                    return '简答题'
                default:
                    return '未知类型'
            }
        }
    }
}