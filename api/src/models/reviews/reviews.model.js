const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const Reviews = sequelize.define('reviews',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	productId: {
		type: DataTypes.INTEGER
	},
	userId: {
		type: DataTypes.INTEGER
	},
	rating: {
		type: DataTypes.INTEGER
	},
	description: {
		type: DataTypes.STRING
	}
});

module.exports = Reviews;