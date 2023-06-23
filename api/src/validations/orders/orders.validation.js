const joi = require('@hapi/joi');

class OrdersValidator {

	postDto(data) {
		return joi.object({
			subTotal: joi.number().optional(),
			total: joi.number().optional(),
			discount: joi.number().optional(),
			couponCodes: joi.string().optional()
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({
			subTotal: joi.number().optional(),
			total: joi.number().optional(),
			discount: joi.number().optional(),
			couponCodes: joi.string().optional(),
			shippingCost: joi.number().optional()
		}).validate(data);
	}


}

module.exports = new OrdersValidator()