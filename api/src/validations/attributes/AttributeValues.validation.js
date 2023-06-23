const joi = require('@hapi/joi');

class AttributeValuesValidator {

	searchDto(data) {
		return joi.object({
			attributeId: joi.optional(),
			title: joi.string().optional(),
			page: joi.number().optional(),
			limit: joi.number().optional(),
			date: joi.string().optional()
		}).validate(data);
	}

	postDto(data) {
		return joi.object({
			attributeId: joi.number().required(),
			title: joi.string().required(),
			description: joi.string().optional()
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({
			attributeId: joi.number().optional(),
			title: joi.string().optional(),
			description: joi.string().optional()
		}).validate(data);
	}


}

module.exports = new AttributeValuesValidator()