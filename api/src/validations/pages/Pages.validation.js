const joi = require('@hapi/joi')


class PagesValidator {

        searchDto(data) {
		return joi.object({
			title: joi.string().optional(),
			slug: joi.string().optional(),
			description: joi.string().optional()
		}).validate(data);
	}

	postDto(data) {
		return joi.object({
			title: joi.string().required(),
			description: joi.string().optional(),
			image: joi.string().optional()
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({
			title: joi.string().optional(),
			slug: joi.string().optional(),
			description: joi.string().optional(),
			image: joi.string().optional()
		}).validate(data);
	}
}

module.exports = new PagesValidator()