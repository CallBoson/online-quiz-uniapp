const {
	DataTypes
} = require('sequelize');
const sequelize = require('./index.js')

const QuestionBank = sequelize.define('QuestionBank', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	cover: {
		type: DataTypes.STRING,
	},
	is_private: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true
	}
}, {
	tableName: 'question_banks'
});

const Tag = sequelize.define('Tag', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
}, {
	tableName: 'Tags'
});

module.exports = { QuestionBank, Tag }
