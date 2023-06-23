const joi = require('@hapi/joi')


class UploadsValidator {

	searchDto(data) {
		return joi.object({
			title: joi.string().optional(),
			caseType: joi.string().valid('product','variation', 'brand','reviews').optional(),
			caseId: joi.number().optional(),
                        url: joi.string().optional(),
			page: joi.number().optional()
		}).validate(data);
	}


	postDto(data) {
		return joi.object({
			title: joi.string().required(),
			caseType: joi.string().valid('product','variation', 'brand','reviews').required(),
			caseId: joi.number().required(),
                        url: joi.string().optional()
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({
			title: joi.string().optional(),
			caseType: joi.string().optional(),
			caseId: joi.string().optional(),
                        file: joi.any().optional()
		}).validate(data);
	}
}

module.exports = new UploadsValidator()