const joi = require('@hapi/joi');


class ProductValidator {

	searchDto(data) {
		return joi.object({
			title: joi.optional(),
			page: joi.number().optional(),
			limit: joi.number().optional(),
			categoryId: joi.number().optional()
		}).validate(data);
	}

	postDto(data) {
		return joi.object({
			title: joi.string().required(),
			description: joi.string().required(),
			shortDescription: joi.string().required(),
			price: joi.number().required(),
			stock: joi.number().required(),
			brandId: joi.number().optional(),
			featureImage: joi.string().required()
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({
			title: joi.string().optional(),
			description: joi.string().optional(),
			shortDescription: joi.string().optional(),
			price: joi.number().optional(),
			stock: joi.number().optional(),
			brandId: joi.number().optional(),
			featureImage: joi.string().optional()
		}).validate(data);
	}
}

module.exports = new ProductValidator();