const joi = require('@hapi/joi');


class UserValidator {

	searchDto(data) {
		return joi.object({
			title: joi.string().optional(),
			page: joi.number().optional(),
			limit: joi.number().optional(),
			categoryId: joi.number().optional()
		}).validate(data);
	}

	signUp(data) {
		return joi.object({
			name: joi.string().optional(),
			username: joi.string().required(),
			email: joi.string().required().email(),
			phone: joi.string().optional(),
			password: joi.string().required()
		}).validate(data);
	}

	login(data){
		return joi.object({
			username: joi.string().required(),
			password: joi.string().required()
		}).validate(data);
	}

	verify(data) {
		return joi.object({
			id: joi.number().required(),
			token: joi.string().required()
		}).validate(data);
	}
}

module.exports = new UserValidator();