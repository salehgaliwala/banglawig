const joi = require('@hapi/joi');


class ClaimValidator {

	searchDto(data) {
		return joi.object({
			title: joi.string().optional(),
			page: joi.number().optional(),
			limit: joi.number().optional()
			
		}).validate(data);
	}

	postDto(data) {
		return joi.object({			
			title: joi.string().required(),
			description: joi.string().required(),
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({			
			title: joi.string().optional(),
			description: joi.string().optional()
		}).validate(data);
	}
}

module.exports = new ClaimValidator();