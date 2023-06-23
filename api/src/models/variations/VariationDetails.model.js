const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const VariationDetails = sequelize.define('variationdetails',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	variationId: {
		type: DataTypes.INTEGER
	},
	price: {
		type: DataTypes.INTEGER
	},
	stock: {
		type: DataTypes.INTEGER,
		defaultValue: -1
	},
	description: {
		type: DataTypes.TEXT('long')
	},
	featureImage: {
		type: DataTypes.STRING
	},
});

module.exports = VariationDetails;