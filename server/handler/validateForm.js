const { check, validationResult } = require('express-validator')
const { QuestionBank } = require('../orm/QuestionBank.js')

exports.check = check

// 验证表单
exports.validationResult = function (req, res, next) {
	const err = validationResult(req);
	if (!err.isEmpty()) {
		const [{
			msg
		}] = err.errors
		return res.error(msg, 400)
	}
	next();
}

// 验证题库ID
exports.validateQuestionBankId = async function (req, res, next) {
	const data = {
		questionBankId: req.body.id
	}

	if (!data.questionBankId) {
		return res.error('题库ID不能为空', 400)
	}

	try {
		const questionBank = await QuestionBank.findByPk(data.questionBankId);

		if (!questionBank) {
			return res.error('题库不存在', 404)
		}

		req.questionBank = questionBank;
		next();
	} catch (err) {
		console.error(err);
		return res.error('服务器错误', 500)
	}
}

// 验证题目
exports.validateQuestion = (req, res, next) => {
	const questions = Array.isArray(req.body.questionList) ? req.body.questionList : [req.body]
	for (let i = 0; i < questions.length; i++) {
		// 题目内容
		const questionContent = questions[i]?.question?.content && questions[i].question.content.trim()
		if (!questionContent) {
			return res.error(`【${i+1}】` + '题目不能为空')
		} else if (questionContent.length > 1000) {
			return res.error(`【${i+1}】` + '题目长度不能超过1000')
		}

		// 题目类型
		const type = parseInt(questions[i].type)
		if (![1, 2, 3, 4, 5].includes(type)) {
			return res.error(`【${i+1}】` + '题目类型错误')
		}
		// 题目答案
		const answer = questions[i].answer
		if (type === 1) {
			// 单选题
			if (!(answer instanceof Array)) {
				return res.error(`【${i+1}】` + '单选题参数应为数组')
			}
			if (answer.length <= 1) {
				return res.error(`【${i+1}】` + '单选题至少需要两个选项')
			}
			if (answer.some(item => (!item?.content) || item.content.trim().length > 100)) {
				return res.error(`【${i+1}】` + '单选题选项长度为1~100')
			}
			if (answer.filter(item => item.isAnswer).length !== 1) {
				return res.error(`【${i+1}】` + '单选题有且只有一个正确答案')
			}
		} else if (type === 2) {
			// 多选题
			if (!(answer instanceof Array)) {
				return res.error(`【${i+1}】` + '多选题参数应为数组')
			}
			if (answer.length <= 1) {
				return res.error(`【${i+1}】` + '多选题至少需要两个选项')
			}
			if (answer.some(item => (!item?.content) || item.content.trim().length > 100)) {
				return res.error(`【${i+1}】` + '多选题选项长度为1~100')
			}
			if (answer.filter(item => parseInt(item?.isAnswer) === 1).length < 1) {
				return res.error(`【${i+1}】` + '多选题至少有一个正确答案')
			}
		} else if (type === 3) {
			// 判断题
			if (answer.answer != true && answer.answer != false) {
				return res.error(`【${i+1}】` + '判断题答案格式错误')
			}
		} else if (type === 4) {
			// 填空题
			if (!(answer instanceof Array)) {
				return res.error(`【${i+1}】` + '填空题参数应为数组')
			}
			if (answer.length < 1) {
				return res.error(`【${i+1}】` + '填空题至少需要一个参考答案')
			}
			if (answer.some(item => !(item instanceof Array) || item.length < 1)) {
				return res.error(`【${i+1}】` + '填空题参考答案应为数组且至少有一个答案')
			}
			if (answer.some(item => item.some(answer => !answer || answer.trim().length > 50))) {
				return res.error(`【${i+1}】` + '填空题参考答案长度为1~50')
			}
		}
	}
	next()
}