const {
	DataTypes
} = require('sequelize');
const sequelize = require('./index.js')

const Question = sequelize.define('question', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	type: {
        // 1: 单选题 2: 多选题 3: 判断题 4: 填空题 5: 简答题
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	question: {
        /**
         * 题目 eg:
         * {
         *   content: '题目内容',
         *   images: [ '图片1URL', '图片2URL' ]
         * }
         */
		type: DataTypes.STRING,
        allowNull: false
	},
	answer_single: {
        /**
         * 单选题答案 eg:
         *  [
         *    { content: '选项1', isAnswer: 0 },
         *    { content: '选项2', isAnswer: 1 },
         *    { content: '选项3', isAnswer: 0 }
         *  ]
         */
        type: DataTypes.STRING,
        allowNull: true
    },
    answer_multiple: {
        /**
         * 多选题答案 eg:
         *  [
         *    { content: '选项1', isAnswer: 0 },
         *    { content: '选项2', isAnswer: 1 },
         *    { content: '选项3', isAnswer: 1 }
         *  ]
         */
        type: DataTypes.STRING,
        allowNull: true
    },
    answer_judge: {
        /**
         * 判断题答案 eg:
         * { answer: 1 }
         */
        type: DataTypes.STRING,
        allowNull: true
    },
    answer_fill: {
        /**
         * 填空题答案 eg:
         * [
         *   [ '空1参考答案1', '空1参考答案2' ],
         *   [ '空2参考答案1', '空2参考答案2' ]
         * ]
         */
        type: DataTypes.STRING,
        allowNull: true
    },
    analysis: {
        /**
         * 题目解析 eg:
         * {
         *   content: '题目解析内容',
         *   images: [ '图片1URL', '图片2URL' ]
         * }
         */
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
	tableName: 'questions'
});


module.exports = Question
