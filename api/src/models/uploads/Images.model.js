const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const Images = sequelize.define('images',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING
	},
	caseType: {
		type: DataTypes.ENUM('product', 'variation', 'brand', 'category')
	},
	caseId: {
		type: DataTypes.INTEGER
	},
	url: {
		type: DataTypes.STRING
	}
});

module.exports = Images;