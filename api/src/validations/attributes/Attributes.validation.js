const joi = require('@hapi/joi');

class AttributesValidator {

	searchDto(data) {
		return joi.object({
			title: joi.string().optional(),
			page: joi.number().optional(),
			limit: joi.number().optional(),
			date: joi.string().optional()
		}).validate(data);
	}

	postDto(data) {
		return joi.object({
			title: joi.string().required(),
			description: joi.string().optional()
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({
			title: joi.string().optional(),
			description: joi.string().optional()
		}).validate(data);
	}


}

module.exports = new AttributesValidator()