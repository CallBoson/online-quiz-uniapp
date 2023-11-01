const express = require("express")
const router = express.Router()
const { validationResult, check, validateQuestion } = require('../handler/validateForm.js')
const { Question, QuestionBank } = require('../orm/models.js')

// 批量新建题目
router.post('/create/batch', [
	check('id').notEmpty().withMessage('题库ID不能为空'),
], validationResult, validateQuestion, async (req, res) => {
    const data = {
        id: req.body.id, // 题库ID
        questionList: req.body.questionList // 题目列表
    }

    // 判断题库是否存在且是否属于当前用户
	const questionBank = await QuestionBank.findOne({
		where: {
			id: data.id,
			owner_id: req.user.id
		}
	})
	if (!questionBank) {
		return res.error('题库不存在或不属于当前用户')
	}

    // 批量创建题目
    const createdQuestions = await Question.bulkCreate(data.questionList.map(item => {
        item.type = parseInt(item.type)
        return {
            type: item.type,
            question: JSON.stringify(item.question),
            answer_single: item.type === 1 ? JSON.stringify(item.answer) : null,
            answer_multiple: item.type === 2 ? JSON.stringify(item.answer) : null,
            answer_judge: item.type === 3 ? JSON.stringify(item.answer) : null,
            answer_fill: item.type === 4 ? JSON.stringify(item.answer) : null,
            analysis: JSON.stringify(item.analysis),
            question_bank_id: data.id
        }
    }))
    res.ok(createdQuestions)
})


// 新建题目
router.post('/create', [
	check('id').notEmpty().withMessage('题库ID不能为空'),
], validationResult, validateQuestion, async (req, res) => {
	// 具体格式参考/orm/Question.js
	const type = parseInt(req.body.type)
    const data = {
		id: req.body.id, // 题库ID
		type, // 题目类型
		question: req.body.question, // 题目
        answer: req.body.answer, // 答案
		analysis: req.body.analysis // 解析
	}

	// 判断题库是否存在且是否属于当前用户
	const questionBank = await QuestionBank.findOne({
		where: {
			id: data.id,
			owner_id: req.user.id
		}
	})
	if (!questionBank) {
		return res.error('题库不存在或不属于当前用户')
	}

	const question = await Question.create({
		type: data.type,
		question: JSON.stringify(data.question),
		answer_single: type === 1 ? JSON.stringify(data.answer) : null,
		answer_multiple: type === 2 ? JSON.stringify(data.answer) : null,
		answer_judge: type === 3 ? JSON.stringify(data.answer) : null,
		answer_fill: type === 4 ? JSON.stringify(data.answer) : null,
		analysis: JSON.stringify(data.analysis),
		question_bank_id: data.id
	})
	
	res.ok(question)
})

// 修改题目
router.post('/edit', [
	check('id').notEmpty().withMessage('题目ID不能为空'),
], validationResult, validateQuestion, async (req, res) => {
	const type = parseInt(req.body.type)
    const data = {
		id: req.body.id, // 题库ID
		type, // 题目类型
		question: req.body.question, // 题目
        answer: req.body.answer, // 答案
		analysis: req.body.analysis // 解析
	}

	// 判断题目是否存在且是否属于当前用户
	const question = await Question.findOne({
		where: {
			id: data.id,
		},
		include: [{
			model: QuestionBank,
			where: {
				owner_id: req.user.id
			}
		}]
	})
	if (!question) {
		return res.error('题目不存在或不属于当前用户')
	}

	// 修改题目
	await question.update({
		id: data.id,
		type: data.type,
		question: JSON.stringify(data.question),
		answer_single: type === 1 ? JSON.stringify(data.answer) : null, // 单选题答案
		answer_multiple: type === 2 ? JSON.stringify(data.answer) : null, // 多选题答案
		answer_judge: type === 3 ? JSON.stringify(data.answer) : null, // 判断题答案
		answer_fill: type === 4 ? JSON.stringify(data.answer) : null, // 填空题答案
		analysis: JSON.stringify(data.analysis), // 解析
	})
	res.ok()
})

// 删除题目
router.post('/delete', [
	check('id').notEmpty().withMessage('题目ID不能为空'),
], validationResult, async (req, res) => {
	const data = {
		id: req.body.id // 题目ID
	}

	// 判断题目是否存在且是否属于当前用户
	const question = await Question.findOne({
		where: {
			id: data.id,
		},
		include: [{
			model: QuestionBank,
			where: {
				owner_id: req.user.id
			}
		}]
	})
	if (!question) {
		return res.error('题目不存在或不属于当前用户')
	}

	// 删除题目
	await question.destroy()
	res.ok()
})

module.exports = router