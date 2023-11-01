const express = require("express")
const router = express.Router()
const Sequelize = require('sequelize')
const { validationResult, check, validateQuestion } = require('../handler/validateForm.js')
const { User, Quiz, Question, QuizRecord } = require('../orm/models.js')
const { auto_mark_short } = require("../utils/ai.js")

// 获取热门答题列表
router.post('/hot', async (req, res) => {
	try {
		const data = {
			page: req.body.page, // 页码
			limit: req.body.limit, // 每页数量
		}
		const page = parseInt(data.page) || 1
		const limit = parseInt(data.limit) || 999
		const offset = (page - 1) * limit

		// 查询每个答题对应的记录数量
		const recordCounts = await QuizRecord.findAll({
			group: ['quiz_id'],
			attributes: [
				'quiz_id',
				[Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
			],
			order: [
				[Sequelize.literal('count'), 'DESC']
			]
		})


		// 查询热门答题列表，按答题记录数量排列
		const quizList = await Quiz.findAll({
			attributes: [
				'id', 'title', 'description', 'cover'
			],
			include: [
				{
					model: User,
					attributes: ['id', 'username', 'avatar'],
					required: true
				}
			],
			offset: offset,
			limit: limit
		})

		// 将答题和记录数量合并起来
		const list = []
		for (let record of recordCounts) {
			const quiz = quizList.find(q => q.id === record.quiz_id)
			let obj = {
				...quiz.toJSON(),
				record_count: record.get('count') || 0
			}
			list.push(obj)
		}

		res.ok(list)
	} catch (error) {
		res.error(error)
	}
})


// 创建答题
router.post('/create', [
	check('questionList').not().isEmpty().withMessage('题目列表不能为空'),
	check('title')
		.not().isEmpty().withMessage('答题标题不能为空')
		.isLength({ min: 2, max: 20 }).withMessage('答题标题长度为2-20个字符'),
	check('description')
		.isLength({ min: 0, max: 300 }).withMessage('答题描述最长为300个字符'),
	check('each_score').custom((value) => {
		const values = {
			single: value?.single,
			multiple: value?.multiple,
			judge: value?.judge,
			fill: value?.fill,
			short: value?.short,
		}
		if (!Object.values(values).every(val => Number(val) >= 1 && Number(val) <= 100)) {
			return false
		}
		return true
	}).withMessage('题目分数应为1-100'),
], validationResult, validateQuestion, async (req, res) => {
	const data = {
		questionList: req.body.questionList, // 题目列表
		title: req.body.title, // 答题标题
		description: req.body.description, // 答题描述
		cover: req.body.cover, // 答题封面
		each_score: req.body.each_score, // 每题分数
		is_shuffle: req.body.is_shuffle, // 是否随机出题
		is_show_answer: req.body.is_show_answer, // 是否每答完一题显示答案
		date_range: req.body.date_range, // 答题时间范围
		countdown_minutes: req.body.countdown_minutes, // 答题倒计分钟
		is_random_options: req.body.is_random_options, // 是否随机选项
	}

	// 创建答题
	const createdQuiz = await Quiz.create({
		title: data.title,
		description: data.description,
		cover: data.cover,
		each_score: JSON.stringify(data.each_score),
		is_shuffle: !!(data.is_shuffle),
		is_show_answer: !!(data.is_show_answer),
		date_range: data.date_range instanceof Array ? JSON.stringify(data.date_range) : null,
		countdown_minutes: data.countdown_minutes || 0,
		is_random_options: !!(data.is_random_options),
		owner_id: req.user.id
	})

	// 批量创建题目
	await Question.bulkCreate(data.questionList.map(item => {
		item.type = parseInt(item.type)
		return {
			type: item.type,
			question: JSON.stringify(item.question),
			answer_single: item.type === 1 ? JSON.stringify(item.answer) : null,
			answer_multiple: item.type === 2 ? JSON.stringify(item.answer) : null,
			answer_judge: item.type === 3 ? JSON.stringify(item.answer) : null,
			answer_fill: item.type === 4 ? JSON.stringify(item.answer) : null,
			analysis: item.analysis ? JSON.stringify(item.analysis) : null,
			quiz_id: createdQuiz.id
		}
	}))

	res.ok({
		id: createdQuiz.id
	})
})

// 获取我的答题列表
router.post('/list', async (req, res) => {
	const data = {
		page: req.body.page, // 页码
		limit: req.body.limit, // 每页数量
		type: req.body.type || 1, // 答题类型 1: 我创建的 2: 我参与的
	}
	const page = parseInt(data.page) || 1
	const limit = parseInt(data.limit) || 999
	const offset = (page - 1) * limit

	let quizList
	if (data.type === 1) {
		quizList = await Quiz.findAndCountAll({
			where: {
				owner_id: req.user.id
			},
			offset,
			limit,
			order: [
				['id', 'DESC']
			]
		})
	} else {
		quizList = await Quiz.findAndCountAll({
			include: [{
				model: QuizRecord,
				as: 'records',
				where: {
					user_id: req.user.id
				}
			}],
			offset,
			limit,
			order: [
				['id', 'DESC']
			]
		})
	}

	res.ok({
		list: quizList.rows,
		total: quizList.count
	})
})

// 获取答题详情
router.post('/detail', [
	check('id').not().isEmpty().withMessage('答题ID不能为空'),
], validationResult, async (req, res) => {
	const data = {
		id: req.body.id, // 答题ID
	}

	// 获取答题详情，包括出题人信息、问题列表和答题记录
	const quiz = await Quiz.findOne({
		where: {
			id: data.id,
		},
		include: [
			{ model: User, as: 'user', attributes: ['username'], required: false },
			{ model: Question, as: 'questions' },
			{ 
				model: QuizRecord, 
				as: 'records', 
				where: { status: 3 }, 
				required: false,
			},
		],
	});

	quiz.records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

	if (!quiz) {
		return res.error(400, '答题不存在');
	}

	// 计算答题总分
	let totalScore = 0;
	quiz.questions.forEach((question) => {
		const eachScore = JSON.parse(quiz.each_score);
		totalScore += Number(
			eachScore[
			question.type === 1
				? 'single'
				: question.type === 2
				? 'multiple'
				: question.type === 3
				? 'judge'
				: question.type === 4
				? 'fill'
				: 'short'
			]
		);
	});

	res.ok({
		...quiz.toJSON(),
		username: quiz.user.username,
		question_count: quiz.questions.length,
		total_score: totalScore,
		records: quiz.records
	})
})

// 开始答题
router.post('/start', [
	check('id').not().isEmpty().withMessage('答题ID不能为空'),
], validationResult, async (req, res) => {
	const data = {
		id: req.body.id, // 答题ID
	}

	// 获取答题详情
	const quiz = await Quiz.findOne({
		where: {
			id: data.id
		}
	})

	if (!quiz) {
		return res.error(400, '答题不存在')
	}

	// 检查答题时间范围
	if (quiz.date_range) {
		const dateRange = JSON.parse(quiz.date_range)
		const now = new Date()
		if (dateRange[0] && now.getTime() < new Date(dateRange[0]).getTime()) {
			return res.error(400, '答题还未开始')
		}
		if (dateRange[1] && now.getTime() > new Date(dateRange[1]).getTime()) {
			return res.error(400, '答题已结束')
		}
	}

	// 获取题目列表
	const questionList = await Question.findAll({
		where: {
			quiz_id: quiz.id
		}
	})

	// 检查是否有状态为进行中的答题记录
	let quizRecord = await QuizRecord.findOne({
		where: {
			quiz_id: quiz.id,
			user_id: req.user.id,
			status: 2
		}
	})

	if (quizRecord) {
		const date_range = quiz.date_range ? JSON.parse(quiz.date_range) : null

		// 有时间段限制并超出答题时间段
		if (date_range && (new Date().getTime() >= new Date(date_range[1]).getTime())) {
			// 更改答题记录状态为已完成
			quizRecord.status = 3
			quizRecord.end_time = new Date()
			await quizRecord.save()

			// 创建答题记录
			quizRecord = await QuizRecord.create({
				quiz_id: quiz.id,
				user_id: req.user.id,
				start_time: new Date(),
				status: 2
			})
		}
	} else {
		// 若无进行中答题，创建答题记录
		quizRecord = await QuizRecord.create({
			quiz_id: quiz.id,
			user_id: req.user.id,
			start_time: new Date(),
			status: 2
		})
	}

	res.ok({
		question_list: Array.from(questionList, q => {
			return {
				id: q.id,
				question: JSON.parse(q.question),
				type: q.type,
				answer_single: q.type == 1 ? Array.from(JSON.parse(q.answer_single), a => {
					return {
						content: a.content,
						isChecked: false
					}
				}) : null,
				answer_multiple: q.type == 2 ? Array.from(JSON.parse(q.answer_multiple), a => {
					return {
						content: a.content,
						isChecked: false
					}
				}) : null,
				answer_fill: q.type == 4 ? new Array(JSON.parse(q.answer_fill).length).fill('') : null,
				answer_judge: q.type == 3 ? [
					{ content: '正确', isChecked: false },
					{ content: '错误', isChecked: false }
				] : null,
				answer_short: q.type == 5 ? { content: '' } : null
			}
		}),
		record_id: quizRecord.id,
		start_time: quizRecord.start_time,
		each_score: JSON.parse(quiz.each_score),
		countdown_minutes: quiz.countdown_minutes
	})
})

// 交卷
router.post('/submit', [
	check('record_id').not().isEmpty().withMessage('答题记录ID不能为空'),
	check('question_list')
		.isArray().withMessage('答题列表必须为数组')
		.not().isEmpty().withMessage('答题列表不能为空'),
], validationResult, async (req, res) => {
	const data = {
		record_id: req.body.record_id, // 答题记录ID
		question_list: req.body.question_list, // 答题列表
	}

	// 获取答题记录详情
	const quizRecord = await QuizRecord.findOne({
		where: {
			id: data.record_id
		},
		include: [
			{
				model: Quiz,
				as: 'Quiz',
				attributes: { exclude: ['createdAt', 'updatedAt'] }
			}
		]
	})

	if (!quizRecord) {
		return res.error(400, '答题记录不存在')
	}

	// 判断是否为进行中且在答题时间范围内的答题记录
	if (quizRecord.status != 2) {
		return res.error(400, '答题记录状态错误')
	}
	if (quizRecord.Quiz.date_range) {
		const dateRange = JSON.parse(quizRecord.Quiz.date_range)
		const now = new Date()
		if (dateRange[0] && now.getTime() < new Date(dateRange[0]).getTime()) {
			return res.error(400, '答题还未开始')
		}
		if (dateRange[1] && now.getTime() > new Date(dateRange[1]).getTime()) {
			return res.error(400, '答题已结束')
		}
	}

	// 获取题目列表
	const questionList = await Question.findAll({
		where: {
			quiz_id: quizRecord.quiz_id
		}
	})

	let score = 0 // 答题得分
	let correctCount = 0 // 答对题目数量
	let answer_analysis = {} // 答题解析
	for (let i = 0; i < questionList.length; i++) {
		const question = questionList[i] // 正确答案
		const userQuestion = data.question_list.find(q => q.id == question.id) // 用户答案
		if (!userQuestion) {
			// 用户未答题
			answer_analysis[question.id] = {
				answer: '',
				correct: false
			}
			continue
		}

		// 判断题目类型
		if (userQuestion.type == 1) {
			// 单选题
			let isCorrect = false
			const options = JSON.parse(question.answer_single)
			const correctAnswer = options.find(a => a.isAnswer) // 正确选项
			const userAnswer = userQuestion.answer_single.find(a => a.isChecked) // 用户选项
			// 判断正确选项的内容是否与用户选项的内容相同
			if (correctAnswer.content === (userAnswer && userAnswer.content)) {
				score += Number(JSON.parse(quizRecord.Quiz.each_score).single)
				correctCount++
				isCorrect = true
			}

			answer_analysis[question.id] = {
				answer: userAnswer ? userAnswer.content : '',
				correct: isCorrect,
				score: isCorrect ? Number(JSON.parse(quizRecord.Quiz.each_score).single): 0
			}
		} else if (userQuestion.type == 2) {
			// 多选题
			let isCorrect = false
			const options = JSON.parse(question.answer_multiple)
			const correctAnswers = options.filter(a => a.isAnswer) // 正确选项
			const userAnswers = userQuestion.answer_multiple.filter(a => a.isChecked) // 用户选项
			// 判断正确选项的内容是否与用户选项的内容相同
			if (correctAnswers.every(a => userAnswers.some(b => b.content == a.content)) && correctAnswers.length == userAnswers.length) {
				score += Number(JSON.parse(quizRecord.Quiz.each_score).multiple)
				correctCount++
				isCorrect = true
			}

			answer_analysis[question.id] = {
				answer: userAnswers.map(a => a.content).join('；'),
				correct: isCorrect,
				score: isCorrect ? Number(JSON.parse(quizRecord.Quiz.each_score).multiple): 0
			}
		} else if (userQuestion.type == 3) {
			// 判断题
			let isCorrect = false
			const answer = JSON.parse(question.answer_judge).answer // 正确答案
			const userAnswer = userQuestion.answer_judge.find(a => a.isChecked) || { content: '' } // 用户答案
			if ((userAnswer.content === '正确' && answer) || (userAnswer.content === '错误' && !answer)) {
				score += Number(JSON.parse(quizRecord.Quiz.each_score).judge)
				correctCount++
				isCorrect = true
			}
			answer_analysis[question.id] = {
				answer: userAnswer.content,
				correct: isCorrect,
				score: isCorrect ? Number(JSON.parse(quizRecord.Quiz.each_score).judge) : 0
			}
		} else if (userQuestion.type == 4) {
			// 填空题
			let correct_fill_count = 0 // 填空题答对数量
			const answers = JSON.parse(question.answer_fill) // 正确答案
			const userAnswers = userQuestion.answer_fill // 用户答案
			// 遍历正确答案
			for (let j = 0; j < userAnswers.length; j++) {
				// 判断用户答案是否包含正确答案
				if (answers[j].includes(userAnswers[j])) {
					correct_fill_count++
				}
			}

			// 若全部答对则算正确
			if (correct_fill_count == answers.length) {
				correctCount++
			}

			// 计算得分: 满分 * 答对空数量 / 总题数
			score += parseInt(Number(JSON.parse(quizRecord.Quiz.each_score).fill) * correct_fill_count / answers.length)

			answer_analysis[question.id] = {
				answer: userAnswers.join('；'),
				correct: correct_fill_count == answers.length,
				score: parseInt(Number(JSON.parse(quizRecord.Quiz.each_score).fill) * correct_fill_count / answers.length)
			}
		} else if (userQuestion.type == 5) {
			// 简答题

			const title = JSON.parse(question.question).content
			const answer = userQuestion.answer_short.content
			const analysis = JSON.parse(question.analysis).content

			// 标记ai评分中
			answer_analysis[question.id] = {
				answer,
				correct: false,
				ai_marking: true
			}

			// AI 评分
			auto_mark_short({
				title,
				answer,
				score: JSON.parse(quizRecord.Quiz.each_score).short
			}).then(result => {
				score += Number(result.score)
				answer_analysis[question.id] = {
					answer,
					correct: false,
					ai_reason: result.reason,
					ai_answer: result.standardAnswer,
					score: Number(result.score)
				}
			}).catch(err => {
				answer_analysis[question.id] = {
					answer,
					correct: false,
					ai_marking: false,
					ai_fail: true // ai评分失败
				}
			}).finally(() => {
				// ai评分技术后更新答题记录
				quizRecord.update({
					answer_analysis: JSON.stringify(answer_analysis),
					score
				})
			})
		}
	}

	// 更新答题记录
	await quizRecord.update({
		status: 3,
		end_time: new Date(),
		score,
		correct_count: correctCount,
		answer_analysis: JSON.stringify(answer_analysis)
	})

	res.ok({
		score,
		correct_count: correctCount
	})
})

router.post('/result', [
	check('record_id').not().isEmpty().withMessage('答题记录ID不能为空'),
], validationResult, async (req, res) => {
	const data = {
		record_id: req.body.record_id, // 答题记录ID
	}

	// 获取答题记录详情
	const quizRecord = await QuizRecord.findOne({
		where: {
			id: data.record_id
		},
		include: [
			{
				model: Quiz,
				as: 'Quiz',
				attributes: { exclude: ['createdAt', 'updatedAt'] },
				include: [
					{
						model: Question,
						as: 'questions',
						attributes: { exclude: ['createdAt', 'updatedAt'] },
					},
				]
			},
			{
				model: User,
				as: 'user',
				attributes: ['username', 'avatar'],
			}
		],
		attributes: { exclude: ['createdAt', 'updatedAt'] }
	})

	if (!quizRecord) {
		return res.error(400, '答题记录不存在')
	}

	// 判断是否为已完成的答题记录
	if (quizRecord.status != 3) {
		return res.error(400, '答题记录状态错误')
	}

	// 计算答题总分
	let totalScore = 0;
	quizRecord.Quiz.questions.forEach((question) => {
		const eachScore = JSON.parse(quizRecord.Quiz.each_score);
		totalScore += Number(
			eachScore[
			question.type === 1
				? 'single'
				: question.type === 2
				? 'multiple'
				: question.type === 3
				? 'judge'
				: question.type === 4
				? 'fill'
				: 'short'
			]
		);
	})

	res.ok({
		title: quizRecord.Quiz.title,
		correct_count: quizRecord.correct_count,
		score: quizRecord.score,
		start_time: quizRecord.start_time,
		end_time: quizRecord.end_time,
		user: quizRecord.user,
		total_score: totalScore,
		question_count: quizRecord.Quiz.questions.length,
		answer_analysis: JSON.parse(quizRecord.answer_analysis),
		questions: quizRecord.Quiz.questions,
		each_score: JSON.parse(quizRecord.Quiz.each_score)
	})
})




module.exports = router