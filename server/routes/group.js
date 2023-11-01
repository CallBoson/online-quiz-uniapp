const express = require("express")
const router = express.Router()
const { validationResult, check } = require('../handler/validateForm.js')
const { Group, GroupMember, User } = require('../orm/models.js')

// 新建团队
router.post('/create', [
	check('title').notEmpty().withMessage('团队名不能为空'),
], validationResult, async (req, res) => {
	try {
		const data = {
			title: req.body.title,
			cover: req.body.cover,
		}

		// 创建一个新的群组
		const group = await Group.create({
			title: data.title,
			owner_id: req.user.id,
			cover: data.cover
		})

		// 将创建者添加为该群组的 owner
		await GroupMember.create({
			group_id: group.id,
			user_id: req.user.id,
			name: 'Owner',
			authority: 1
		})

		res.ok(group)
	} catch (error) {
		res.error(error)
	}
})

// 加入团队
router.post('/join', async (req, res) => {
	try {
		const data = {
			group_id: req.body.group_id,
		}

		// 查询该群组是否存在
		const group = await Group.findOne({
			where: {
				id: data.group_id
			}
		})

		if (!group) {
			throw new Error('该群组不存在')
		}

		// 判断用户是否已加入该群组
		const member = await GroupMember.findOne({
			where: {
				group_id: data.group_id,
				user_id: req.user.id
			}
		})

		if (member) {
			throw new Error('你已经加入了该团队')
		}

		// 添加一条新记录到 GroupMember 表中，表示当前用户已经加入该群组
		await GroupMember.create({
			group_id: data.group_id,
			user_id: req.user.id,
			name: 'Member',
			authority: 0
		})

		res.ok()
	} catch (error) {
		res.error(error)
	}
})

// 获取团队列表
router.post('/my_groups', async (req, res) => {
	try {
		const data = {
			type: req.body.type, // 1: 我创建的团队 2: 我加入的团队
		}

		let groups = []

		if (data.type == 1) {
			// 查询我创建的团队
			groups = await Group.findAll({
				where: {
					owner_id: req.user.id
				},
				include: [
					{
						model: GroupMember,
						where: {
							user_id: req.user.id
						},
						required: true
					}
				]
			})
		} else if (data.type == 2) {
			// 查询我加入的团队
			groups = await Group.findAll({
				include: [
					{
						model: GroupMember,
						where: {
							user_id: req.user.id
						},
						required: true
					}
				]
			})
		}

		res.ok(groups)
	} catch (error) {
		res.error(error)
	}
})

// 获取团队成员列表
router.post('/getMembers', async (req, res) => {
	try {
		const data = {
			group_id: req.body.group_id,
		}

		// 查询符合条件的群组成员记录，并返回用户信息
		const members = await GroupMember.findAll({
			where: {
				group_id: data.group_id
			},
			include: [
				{
					model: User,
					attributes: ['avatar'],
					required: true
				}
			]
		})

		res.ok(members)
	} catch (error) {
		res.error(error)
	}
})



module.exports = router