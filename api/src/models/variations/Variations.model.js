const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const Variations = sequelize.define('variations',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	productId: {
		type: DataTypes.INTEGER
	},
	title: {
		type: DataTypes.STRING,
		defaultValue: 'p-any'
	}
});

module.exports = Variations;