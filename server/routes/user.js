const express = require("express")
const router = express.Router()
const jwt = require('../utils/jwt.js')
const { validationResult, check } = require('../handler/validateForm.js')
const { User } = require('../orm/models.js')

// 登录
router.post('/login', [
	check('phone').notEmpty().withMessage('手机号不能为空'),
	check('password').notEmpty().withMessage('密码不能为空')
], validationResult, async (req, res) => {
	const user = {
		phone: req.body.phone,
		password: req.body.password
	}
	
	const findUser = await User.findOne({
		where: {
			phone: user.phone,
			password: user.password
		},
		attributes: ['id', 'phone', 'username', 'avatar']
	}).catch(err => {
		return res.error(err)
	})
	
	if (findUser) {
		const token = jwt.encrypt({ id: findUser.id, ...user })
		res.ok({ token, ...findUser.toJSON() })
	} else {
		res.error('账号不存在或密码错误', 400)
	}
})

// 注册
router.post('/register', [
	check('phone')
		.notEmpty().withMessage('手机号不能为空')
		.matches(/^1\d{10}$/).withMessage('请输入正确的11位手机号码'),
	check('password')
		.notEmpty().withMessage('密码不能为空')
		.isLength({ min: 6, max: 16 }).withMessage('密码长度应为6-16位'),
], validationResult, async (req, res) => {
	const user = {
		phone: req.body.phone,
		password: req.body.password
	}
	
	// 判断手机号是否存在
	const existingUser = await User.findOne({
		where: {
			phone: user.phone
		}
	})
	
	if (existingUser) {
		return res.error('用户已存在', 400)
	}
	
	// 插入记录
	const newUser = await User.create({
		phone: user.phone,
		password: user.password
	})
	
	// 更新username
	newUser.username = `user_${newUser.id}`
	await newUser.save()
	
	const token = jwt.encrypt({ id: newUser.id, ...user })
	res.ok({ token, ...newUser.toJSON() })
})

// 获取个人信息
router.post('/profile', async (req, res) => {
	const { id } = req.user
	const user = await User.findOne({
		where: {
			id
		},
		attributes: ['id', 'phone', 'username', 'avatar', 'description']
	}).catch(err => {
		return res.error(err)
	})
	
	if (user) {
		res.ok(user)
	} else {
		res.error('用户不存在', 400)
	}
})

// 更新个人信息
router.post('/update', [
	check('username').notEmpty().withMessage('昵称不能为空')
		.isLength({ min: 2, max: 16 }).withMessage('昵称长度应为2-16位'),
], async (req, res) => {
	const data = {
		username: req.body.username,
		avatar: req.body.avatar,
		description: req.body.description
	}
	const { id } = req.user

	const user = await User.findOne({
		where: {
			id
		}
	}).catch(err => {
		return res.error(err)
	})

	if (user) {
		await user.update(data)
		return res.ok(user)
	}

	res.error('用户不存在', 400)
})

module.exports = router