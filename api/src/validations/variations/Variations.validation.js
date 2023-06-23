const joi = require('@hapi/joi');

class VariationsValidator {

	createDto(data) {
		return joi.object({
			productId: joi.number().required(),
			title: joi.string().required(),
			VariationAttributes: joi.array().items(joi.object().keys({
				// variationId: joi.number().required(),
				attributeId: joi.number().required(),
				attributeValueId: joi.any().required()
			})).required(),
			VariationDetail: joi.object().keys({
				// variationId: joi.number().required(),
				price: joi.number().required(),
				description: joi.string().optional(),
				stock: joi.number().optional().default(-1),
				featureImage: joi.string().optional()
			}).required()
		}).validate(data);
	}

	postDto(data) {
		return joi.object({
			productId: joi.number().required(),
			title: joi.string().required()
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({
			title: joi.string().optional()
		}).validate(data);
	}


}

module.exports = new VariationsValidator()