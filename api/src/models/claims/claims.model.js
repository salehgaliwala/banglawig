const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const Claims = sequelize.define('claims',{
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
	},
	productId: {
		type: DataTypes.BIGINT,
	},
	userId: {
		type: DataTypes.BIGINT,
	},
	rating: {
		type: DataTypes.BIGINT,
	}
});

module.exports = Claims;