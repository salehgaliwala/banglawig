const joi = require('@hapi/joi');

class CartItemsValidator {

	postDto(data) {
		return joi.object({
			cartId: joi.number().required(),
			variationId: joi.number().required(),
			productId: joi.number().required(),
			product_title: joi.string().required(),
			product_image: joi.string().required(),
			price: joi.number().required(),
			quantity: joi.number().required()
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({
			cartId: joi.number().optional(),
			variationId: joi.number().optional(),
			productId: joi.number().optional(),
			product_title: joi.string().optional(),
			product_image: joi.string().optional(),
			price: joi.number().optional(),
			quantity: joi.number().optional()
		}).validate(data);
	}


}

module.exports = new CartItemsValidator()