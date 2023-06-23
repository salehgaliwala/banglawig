const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const Brand = sequelize.define('brands',{
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
	image: {
		type: DataTypes.STRING
	}
});

module.exports = Brand;