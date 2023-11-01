const jwt = require('jsonwebtoken')

const Token = {
	encrypt: (data, time = 60 * 60 * 24 * 30) => {
		// 生成
		return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: time })
	},
	decrypt: (token) => {
		// 解析
		return new Promise((resolve, reject) => {
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
				if (err) {
					return reject(err)
				}
				return resolve(decoded)
			})
		})
	}
}

module.exports = Token