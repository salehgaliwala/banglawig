const joi = require('@hapi/joi');

class VariationAttributes {

	// searchDto(data) {
	// 	return joi.object({
	// 		attributeId: joi.optional(),
	// 		title: joi.string().optional(),
	// 		page: joi.number().optional(),
	// 		limit: joi.number().optional(),
	// 		date: joi.string().optional()
	// 	}).validate(data);
	// }

	postDto(data) {
		return joi.object({
			variationId: joi.number().required(),
			attributeId: joi.number().required(),
			attributeValueId: joi.any().required()
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({
			attributeId: joi.number().optional(),
			attributeValueId: joi.string().optional()
		}).validate(data);
	}


}

module.exports = new VariationAttributes()