const {
	DataTypes
} = require('sequelize');
const sequelize = require('./index.js')

const GroupMember = sequelize.define('group_member', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authority: {
        // 1: owner, 2: admin, 3: member
        type: DataTypes.INTEGER,
        allowNull: false
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'groups',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
	tableName: 'group_members'
});


module.exports = GroupMember
