const {
	DataTypes
} = require('sequelize');
const sequelize = require('./index.js')

const Quiz = sequelize.define('Quiz', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: true
    },
    each_score: {
        /**
         * 每题分数 eg:
         * {
         *   single: 10,
         *   multiple: 10,
         *   judge: 10,
         *   fill: 10,
         *   short: 10,
         * }
         */
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_shuffle: {
        // 是否随机出题
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    is_show_answer: {
        // 是否每答完一题显示答案
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    date_range: {
        // 答题时间范围
        type: DataTypes.STRING,
        allowNull: true
    },
    countdown_minutes: {
        // 答题倒计分钟
        type: DataTypes.INTEGER,
        allowNull: true
    },
    is_random_options: {
        // 是否选项乱序
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
	tableName: 'quizs'
})

module.exports = Quiz
