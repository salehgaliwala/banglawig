const joi = require('@hapi/joi');

class ShippingValidator {

	postDto(data) {
		return joi.object({
			country: joi.string().required(),
			countryCode: joi.string().required(),
			shippingCost: joi.number().required()
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({
			country: joi.string().optional(),
			countryCode: joi.string().optional(),
			shippingCost: joi.number().optional()
		}).validate(data);
	}


}

module.exports = new ShippingValidator()