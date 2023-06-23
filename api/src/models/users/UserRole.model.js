const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const UserRole = sequelize.define('userrole',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING
	},
	description: {
		type: DataTypes.STRING
	}
});

module.exports = UserRole;