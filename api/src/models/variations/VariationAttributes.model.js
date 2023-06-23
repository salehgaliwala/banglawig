const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const VariationAttributes = sequelize.define('variationattributes',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	variationId: {
		type: DataTypes.INTEGER
	},
	attributeId: {
		type: DataTypes.INTEGER
	},
	attributeValueId: {
		type: DataTypes.INTEGER
	}
});

module.exports = VariationAttributes;