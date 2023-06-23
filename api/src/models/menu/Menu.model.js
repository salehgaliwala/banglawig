const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const Menu = sequelize.define('menus', {
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	parentId: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	title: {
		type: DataTypes.STRING
	},
	url: {
		type: DataTypes.STRING
	},
	order: {
		type: DataTypes.INTEGER
	}
});

module.exports = Menu;