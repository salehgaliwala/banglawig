const joi = require('@hapi/joi')


class BrandsValidator {


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

module.exports = new BrandsValidator()