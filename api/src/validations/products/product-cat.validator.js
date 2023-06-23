const joi = require('@hapi/joi');


class ProductCatValidator {

	postDto(data) {
		return joi.object({
			productId: joi.number().required(),
			categoryId: joi.number().required(),
		}).validate(data);
	}

	postBulkDto(data) {
		return joi.array().items(joi.object().keys({
				productId: joi.number().required(),
				categoryId: joi.number().required(),
			})
		).validate(data);
	}

	updateDto(data) {
		return joi.object({
			productId: joi.number().optional(),
			categoryId: joi.number().optional(),
		}).validate(data);
	}
}

module.exports = new ProductCatValidator();