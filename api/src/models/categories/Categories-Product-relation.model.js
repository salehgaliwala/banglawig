const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const ProCatTax = sequelize.define('product_category_relation',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	categoryId: {
		type: DataTypes.INTEGER
	},
	productId: {
		type: DataTypes.INTEGER
	}

});

module.exports = ProCatTax;