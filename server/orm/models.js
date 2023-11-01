const sequelize = require('./index.js')
const User = require('./User.js')
const { QuestionBank, Tag } = require('./QuestionBank.js')
const Question = require('./Question.js')
const Quiz = require('./Quiz.js')
const QuizRecord = require('./QuizRecord.js')
const Group = require('./Group.js')
const GroupMember = require('./GroupMember.js')

// 使用 Sequelize 的 `belongsTo()`、`belongsToMany()` 和 `hasMany()` 方法定义模型之间的关联关系
QuestionBank.belongsTo(User, { foreignKey: 'owner_id' });    // 一个题库属于一个拥有者用户
QuestionBank.belongsToMany(Tag, { through: 'question_bank_tag' });    // 一个题库可以与多个标签相关联
Tag.belongsToMany(QuestionBank, { through: 'question_bank_tag' });    // 一个标签可以与多个题库相关联
QuestionBank.hasMany(Question, { foreignKey: 'question_bank_id' });    // 一个题库包含多个与之相关联的问题
Question.belongsTo(QuestionBank, { foreignKey: 'question_bank_id' });    // 一个问题属于一个题库
Quiz.hasMany(Question, { foreignKey: 'quiz_id' });    // 一个测验包含多个与之相关联的问题
Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });    // 一个问题属于一个测验
Quiz.belongsTo(User, { foreignKey: 'owner_id' });    // 一个测验属于一个拥有者用户
Quiz.hasMany(QuizRecord, { as: 'records', foreignKey: 'quiz_id' });    // 一个测验包含多条与之相关联的测验记录
QuizRecord.belongsTo(Quiz, { foreignKey: 'quiz_id' });    // 一条测验记录属于一个测验
QuizRecord.belongsTo(User, { foreignKey: 'user_id' });    // 一条测验记录属于一个参与者用户

// 建立 User 和 Group 之间的多对多关系
User.belongsToMany(Group, { through: 'group_member', foreignKey: 'user_id' });
Group.belongsToMany(User, { through: 'group_member', foreignKey: 'group_id' });

// 建立 Group 和 GroupMember 之间的一对多关系
Group.hasMany(GroupMember, { foreignKey: 'group_id' });
GroupMember.belongsTo(Group, { foreignKey: 'group_id' });

// 建立 User 和 GroupMember 之间的一对多关系
User.hasMany(GroupMember, { foreignKey: 'user_id' });
GroupMember.belongsTo(User, { foreignKey: 'user_id' });


sequelize.sync()

module.exports = {
    User,
    QuestionBank,
    Tag,
    Question,
    Quiz,
    QuizRecord,
    Group,
    GroupMember
}