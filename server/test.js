const { querySql } = require('./database/db.js')

querySql(`select * from user where phone = '13535339346' and password = '84873231a';`).then(res => {
	console.log(res);
}).catch(err => {
	console.log(err);
})