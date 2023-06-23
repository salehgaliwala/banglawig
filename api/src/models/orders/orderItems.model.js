const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const OrderItems = sequelize.define('ordersitems',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	orderId: {
		type: DataTypes.INTEGER
	},
	productId: {
		type: DataTypes.INTEGER
	},
	product_title: {
		type: DataTypes.STRING
	},
	product_image: {
		type: DataTypes.STRING
	},
	variationId: {
		type: DataTypes.INTEGER
	},
	price: {
		type: DataTypes.INTEGER
	},
	quantity: {
		type: DataTypes.INTEGER
	}
});

module.exports = OrderItems;