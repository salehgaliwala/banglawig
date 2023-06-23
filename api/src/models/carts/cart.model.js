const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const Cart = sequelize.define('carts',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	type: {
		type: DataTypes.STRING,
		defaultValue: 'Guest'
	},
	userId: {
		type: DataTypes.INTEGER
	}
});

module.exports = Cart;