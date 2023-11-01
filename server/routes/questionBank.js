const express = require("express")
const router = express.Router()
const { validationResult, check, validateQuestionBankId } = require('../handler/validateForm.js')
const { User, Question, QuestionBank, Tag } = require('../orm/models.js')

// 创建题库标签
router.post('/createTag', async (req, res) => {
	const data = {
		name: req.body.name
	}
	await Tag.create({
		name: data.name
	})
	res.ok()
})

// 获取题库标签
router.post('/tags', async (req, res) => {
	const tags = await Tag.findAll()
	res.ok(tags.map(tag => tag.toJSON()))
})

// 创建题库
router.post('/create', [
	check('name')
		.notEmpty().withMessage('题库名称不能为空')
		.isLength({ min: 1, max: 16 }).withMessage('题库名称长度应为1-16')
], validationResult, async (req, res) => {
	const data = {
		name: req.body.name,
		cover: req.body.cover, // 题库封面URL(可选)
		tagIds: req.body.tagIds, // 题库标签ID数组 eg: [1, 2, 3](可选)
		is_private: req.body.is_private.toString() === ('0' || '1') ? req.body.is_private : '1' // 0: 公开 1: 私有(默认)
	}
	
	const isOwnerExist = await User.findByPk(req.user.id)
	
	// 创建题库
	const newQuestionBank = await QuestionBank.create({
		name: data.name,
		cover: data.cover,
		is_private: data.is_private,
		owner_id: isOwnerExist ? req.user.id : null
	}).catch(err => {
		return res.error(err)
	})
	
	// 添加标签
	const allTags = await Tag.findAll()
	const tags = allTags.filter(tag => data.tagIds.includes(tag.id))
	await newQuestionBank.addTags(tags)
	const dataJson = newQuestionBank.toJSON()
	dataJson.tags = tags
	
	res.ok(dataJson)
})

// 获取我的题库
router.post('/my', async (req, res) => {
	const data = {
		page: req.body.page || 1, // 当前页码
		limit: req.body.limit || 10 // 每页数量
	}

	// 获取题库列表
	const questionBanks = await QuestionBank.findAll({
		where: {
			owner_id: req.user.id
		},
		limit: data.limit,
		offset: (data.page - 1) * data.limit
	})

	// 获取题库标签
	const newQuestionBanks = []
	for (let i = questionBanks.length - 1; i >= 0; i--) {
		const tags = await questionBanks[i].getTags()
		const questions = await questionBanks[i].getQuestions()
		const json = questionBanks[i].toJSON()
		json.tags = tags
		json.questionCount = questions.length
		newQuestionBanks.push(json)
	}

	// 获取题库总数
	const totalCount = await QuestionBank.count({
		where: {
			owner_id: req.user.id
		}
	})

	const totalPages = Math.ceil(totalCount / data.limit)

	res.ok({
		question_banks: newQuestionBanks,
		total_pages: totalPages,
		total_count: totalCount,
		current_page: data.page,
		limit: data.limit,
		has_more: data.page < totalPages
	})
})

// 获取题库题目管理详情
router.post('/questionManage', validateQuestionBankId, async (req, res) => {
	const data = {
		id: req.body.id
	}
	const questionBank = req.questionBank
	// 题目列表
	const questions = await Question.findAll({
		where: {
			question_bank_id: req.questionBank.id
		},
		attributes: ['id', 'question', 'type', 'answer_single', 'answer_multiple', 'answer_judge', 'answer_fill', 'analysis']
	})

	// 题库名称
	const questionBankName = questionBank.name

	// 出题人信息
	const owner = await User.findByPk(questionBank.owner_id)
	const ownerInfo = {
		id: owner.id,
		username: owner.username,
		avatar: owner.avatar
	}

	res.ok({
		question_bank_name: questionBankName,
		owner: ownerInfo,
		questions
	})
})

// 获取所有题库
router.post('/all', async (req, res) => {
	const data = {
		tagId: req.body.tagId, // 题库标签ID(可选)
		page: req.body.page || 1, // 当前页码
		limit: req.body.limit || 10 // 每页数量
	}
	let questionBanks = []
	let totalCount = 0

	// 可以根据标签获取题库
	if (data.tagId) {
		const tag = await Tag.findByPk(data.tagId)
		questionBanks = await tag.getQuestionBanks({
			limit: data.limit,
			offset: (data.page - 1) * data.limit
		})
		totalCount = await tag.countQuestionBanks()
	} else {
		questionBanks = await QuestionBank.findAll({
			limit: data.limit,
			offset: (data.page - 1) * data.limit
		})
		totalCount = await QuestionBank.count()
	}

	// 获取题库标签
	const newQuestionBanks = []
	for (let i = 0; i < questionBanks.length; i++) {
		const tags = await questionBanks[i].getTags()
		const questionCount = await questionBanks[i].countQuestions()
		const json = questionBanks[i].toJSON()
		json.tags = tags
		json.questionCount = questionCount
		newQuestionBanks.push(json)
	}
	const totalPages = Math.ceil(totalCount / data.limit)
	res.ok({
		question_banks: newQuestionBanks,
		total_pages: totalPages,
		total_count: totalCount,
		current_page: data.page,
		limit: data.limit,
		has_more: data.page < totalPages
	})
})

// 获取题库详情
router.post('/detail', validateQuestionBankId, async (req, res) => {
	const data = {
		id: req.body.id
	}
	const questionBank = req.questionBank

	// 获取题库标签
	const tags = await questionBank.getTags()
	const json = questionBank.toJSON()
	json.tags = tags
	res.ok(json)
})

// 编辑题库
router.post('/edit', [
	check('name')
		.notEmpty().withMessage('题库名称不能为空')
		.isLength({ min: 1, max: 16 }).withMessage('题库名称长度应为1-16')
], validationResult, validateQuestionBankId, async (req, res) => {
	const data = {
		id: req.body.id,
		name: req.body.name,
		cover: req.body.cover, // 题库封面URL(可选)
		tagIds: req.body.tagIds, // 题库标签ID数组 eg: [1, 2, 3](可选)
		is_private: req.body.is_private.toString() === ('0' || '1') ? req.body.is_private : '1' // 0: 公开 1: 私有(默认)
	}
	const questionBank = req.questionBank

	// 编辑题库
	await questionBank.update({
		name: data.name,
		cover: data.cover,
		is_private: data.is_private
	})

	// 编辑标签
	const allTags = await Tag.findAll()
	const tags = allTags.filter(tag => data.tagIds.includes(tag.id))
	await questionBank.setTags(tags)
	const dataJson = questionBank.toJSON()
	dataJson.tags = tags

	res.ok(dataJson)
})

// 删除题库
router.post('/delete', validateQuestionBankId, async (req, res) => {
	const data = {
		id: req.body.id
	}
	const questionBank = req.questionBank
	
	// 删除题库
	await questionBank.destroy()
	res.ok()
})

module.exports = router