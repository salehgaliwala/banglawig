const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const Order = sequelize.define('orders',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	userId: {
		type: DataTypes.STRING,
		defaultValue: 'guest'
	},
	status: {
		type: DataTypes.STRING,
		defaultValue: 'pending'
	},
	subTotal: {
		type: DataTypes.INTEGER
	},
	shippingCost: {
		type: DataTypes.INTEGER
	},
	total: {
		type: DataTypes.INTEGER
	},
	discount: {
		type: DataTypes.INTEGER
	},
	couponCodes: {
		type: DataTypes.STRING
	}
});

module.exports = Order;