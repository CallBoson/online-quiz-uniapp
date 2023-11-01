const {
	DataTypes
} = require('sequelize');
const sequelize = require('./index.js')

const User = sequelize.define('user', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	username: {
		type: DataTypes.STRING,
	},
	avatar: {
		type: DataTypes.STRING
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true
	}
}, {
	tableName: 'users'
});

module.exports = User
