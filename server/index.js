const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config() // 加载.env
const {
	authenticateToken
} = require('./handler/authenticateToken.js')
const userRouter = require('./routes/user.js')
const questionRouter = require('./routes/question.js')
const questionBankRouter = require('./routes/questionBank.js')
const uploadRouter = require('./routes/upload.js')
const quizRouter = require('./routes/quiz.js')
const groupRouter = require('./routes/group.js')

const app = express()

// 解析 post body
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())

app.all('*', function(req, res, next) {
	//  开启 CORS 跨域 
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

	if (req.method == 'OPTIONS') {
		res.send(200) // 让options请求快速返回
	} else {
		res.ok = (data) => {
			res.json({
				status: 200,
				data,
				message: '操作成功'
			})
		}
		
		res.error = (message, status = 500) => {
			res.status(status)
			return next(new Error(message))
		}
		
		next()
	}

})

app.use(authenticateToken) // 鉴权中间件
app.use('/upload', uploadRouter) // 上传路由
app.use('/user', userRouter) // 用户路由
app.use('/question', questionRouter) // 题目路由
app.use('/questionBank', questionBankRouter) // 题库路由
app.use('/quiz', quizRouter) // 答题路由
app.use('/group', groupRouter) // 团队路由

app.use((req, res, next) => {
	res.error('接口不存在', 404)
})

app.use((err, req, res, next) => {
	console.error(err)
	// 错误处理
	res.json({
		status: res.statusCode,
		data: null,
		message: (err && err.message) || "系统错误",
	})
})

app.listen(3000, () => console.log('Server started on port 3000'));
