const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const OrderAddress = sequelize.define('ordersaddress',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	orderId: {
		type: DataTypes.INTEGER
	},
	name: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING
	},
	phone: {
		type: DataTypes.STRING
	},
	whatsapp: {
		type: DataTypes.STRING
	},
	address: {
		type: DataTypes.STRING
	},
	state: {
		type: DataTypes.STRING
	},
	postcode: {
		type: DataTypes.STRING
	},
	country: {
		type: DataTypes.STRING
	}
});

module.exports = OrderAddress;