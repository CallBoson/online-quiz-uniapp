const {
	DataTypes
} = require('sequelize');
const sequelize = require('./index.js')

const QuizRecord = sequelize.define('QuizRecord', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
    quiz_id: {
        // 测试id
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        // 用户id
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_time: {
        // 开始时间
        type: DataTypes.DATE,
        allowNull: true
    },
    end_time: {
        // 结束时间
        type: DataTypes.DATE,
        allowNull: true
    },
    score: {
        // 分数
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    correct_count: {
        // 正确题数
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        // 状态 1:未开始 2:进行中 3:已完成
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    answer_analysis: {
        /**
         * 答案解析
         * {
         *    question_id: {
         *       answer: 'A',
         *       correct: true
         *     }
         */
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
	tableName: 'quiz_records'
});

module.exports = QuizRecord
