const joi = require('@hapi/joi');

class OrderItemsValidator {

	postDto(data) {
		return joi.object({
			cartId: joi.number().required(),
			productId: joi.number().required(),
			variationId: joi.number().required(),
			quantity: joi.number().required()
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({
			cartId: joi.number().optional(),
			productId: joi.number().optional(),
			variationId: joi.number().optional(),
			quantity: joi.number().optional()
		}).validate(data);
	}


}

module.exports = new OrderItemsValidator()