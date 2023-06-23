const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const AttributeValues = sequelize.define('attributevalues',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	attributeId: {
		type: DataTypes.INTEGER
	},
	title: {
		type: DataTypes.STRING
	},
	description: {
		type: DataTypes.STRING
	}
});

module.exports = AttributeValues;