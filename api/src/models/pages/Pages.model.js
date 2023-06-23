const { DataTypes } = require("sequelize");
const sequelize = require('../../config/mysql.db');

const Pages = sequelize.define('pages',{
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING
	},
        slug: {
		type: DataTypes.STRING
	},
	description: {
		type: DataTypes.STRING
	},
	image: {
		type: DataTypes.STRING
	}
});

module.exports = Pages;