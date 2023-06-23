const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const Categories = sequelize.define('categories',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	parentId: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	title: {
		type: DataTypes.STRING
	},
	description: {
		type: DataTypes.STRING
	}
});

module.exports = Categories;