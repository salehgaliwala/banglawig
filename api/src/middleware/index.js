const morgan = require('morgan');
const { logger } = require('../config');
const express = require('express');
const Auth = require('./auth');
const Admin = require('./admin');
const upload = require('./upload');

module.exports = {
	middleware: (app) =>{
		app.use(morgan('combined', { stream: logger.stream}));
		app.use(express.json());
	},
	Auth,
	Admin,
	upload
}