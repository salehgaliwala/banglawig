const { console, prepare, isValid } = require('../../helpers');
const { jwtOptions } = require('../../config/auth');
const { UserValidator } = require('../../validations');
const UsersService = require('../../services/users/Users.service');
const { hashSync, compareSync } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const {sendEmail, verificationTemplate} = require('../../config/email')



class UsersController {
	constructor() {
		console('users controller created');
	}

	async fetch(req, res, next){
		try{
			// validation & verification
			// const validation = ProductValidator.searchDto(req.body);
			// const validationHandler = isValid(validation);
			// if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await UsersService.getUsers();

			// handle error & send response
			return res.json(prepare(result));
		}catch(err){
			console(err.message)
			return next(createError(500));
		}
	}

	async signUp(req, res, next) {
		try{
			//* validation & verification
				const userData = req.body;
				const validation = UserValidator.signUp(userData);
				const validationHandler = isValid(validation);
				if(!validationHandler.valid) return next(validationHandler.error);

				//! remove it after verification email 
				userData.verified = true;

			//* process

				//* check username and email for existing user
				const userExists = await UsersService.checkUser(userData.username, userData.email);
				console(userExists)
				if(userExists){
					return res.status(400).json(prepare([], 'user already exists', false));
				}
				else {
					//* hashing password and create user
					userData.password = hashSync(userData.password, (12) );
					const user = await UsersService.create(userData);

					//*  generating jwt token 
					const token = jwt.sign( jwtOptions(user.id, user.username, user.roleId), (process.env.JWT_SECRET || 'MYPRIVATEJWTKEY'));

					//* sending verification email 
					// ! mail response is ignored 
					const emailData = verificationTemplate(user.username, token);
					sendEmail(emailData.from, user.email, emailData.subject, emailData.body);
					

					//* handle error & send response
					return res.status(201).json(prepare({user, token}));
				}
		}catch(err){
			console(err.message)
			return next(createError(500));
		}
	}


	async login( req, res, next ) {
		try{
			// validation & verification
			const userData = req.body;
			const validation = UserValidator.login(userData);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const user = await UsersService.checkUser(userData.username, userData.username);
			if(!user){
				return res.json(prepare([], 'user does not exist', false));
			} else {
				const matched = compareSync(userData.password, user.password );
				if(!matched) return res.json(prepare([], 'incorrect password !', false));

				// verify
				if(!user.verified) return res.json(prepare([], 'user is not verified', false));

				// jwt token {id: user.id, username: user.username, role: user.roleId}
				const token = jwt.sign( jwtOptions(user.id, user.username, user.roleId), 'MYPRIVATEJWTKEY');

				// handle error & send response
				return res.json(prepare({user, token}));
			}
		}catch(err){
			console(err.message);
			return next(createError(500));
		}
	}

	/**
	 * * Verify customer by token params
	 * ? Model User.verified = true
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 * @returns 
	 */
	async verifyUser(req, res, next) {
		try{
			const { token } = req.params;
			const { id } = jwt.verify(token, 'MYPRIVATEJWTKEY');

			const validation = UserValidator.verify({ id, token });
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const result = await UsersService.verify(id);
			console(result, 'console result : ')
			return result instanceof Error ? res.redirect('https://www.wigbd.com/tabs/account') : res.redirect('https://www.wigbd.com/tabs/account');

		} catch(err){
			console(err.message);
			return next(createError(500));
		}
	}
}

module.exports = new UsersController();
