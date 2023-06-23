const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const Shipping = sequelize.define('shipping',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	country: {
		type: DataTypes.STRING
	},
	countryCode: {
		type: DataTypes.STRING
	},
	shippingCost: {
		type: DataTypes.INTEGER
	}
});

module.exports = Shipping;