const joi = require('@hapi/joi');

class VariationDetailsValidator {

	// searchDto(data) {
	// 	return joi.object({
	// 		variationId: joi.optional(),
	// 		description: joi.string().optional(),
	// 		page: joi.number().optional(),
	// 		limit: joi.number().optional(),
	// 		date: joi.string().optional()
	// 	}).validate(data);
	// }

	postDto(data) {
		return joi.object({
			variationId: joi.number().required(),
			price: joi.number().required(),
			description: joi.string().optional(),
			stock: joi.number().optional().default(-1),
			featureImage: joi.string().optional()
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({
			price: joi.number().optional(),
			description: joi.string().optional(),
			stock: joi.number().optional(),
			featureImage: joi.string().optional()
		}).validate(data);
	}


}

module.exports = new VariationDetailsValidator()