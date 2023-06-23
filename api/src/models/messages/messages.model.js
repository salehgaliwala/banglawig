const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const Messages = sequelize.define('messages',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
        email: {
		type: DataTypes.STRING
	},
	message: {
		type: DataTypes.STRING
	}
});

module.exports = Messages;