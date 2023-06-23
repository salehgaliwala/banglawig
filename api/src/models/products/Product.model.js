const { nanoid } = require("nanoid");
const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const Product = sequelize.define('products',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING
	},
	slug: {
		type: DataTypes.STRING,
		default: nanoid(5)
	},
	description: {
		type: DataTypes.TEXT('long')
	},
	shortDescription: {
		type: DataTypes.TEXT('long')
	},
	brandId: {
		type: DataTypes.INTEGER
	},
	price: {
		type: DataTypes.INTEGER
	},
	stock: {
		type: DataTypes.INTEGER,
		defaultValue: -1
	},
	discount: {
		type: DataTypes.INTEGER,	
	},
	featureImage: {
		type: DataTypes.STRING
	},
	updatedAt: {
		type: DataTypes.DATE
	},
	createdAt: {
		type: DataTypes.DATE
	}
});

module.exports = Product;