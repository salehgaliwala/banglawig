const joi = require('@hapi/joi');

class CartsValidator {

	postDto(data) {
		return joi.object({
			type: joi.string().optional(),
			userId: joi.number().required()
		}).validate(data);
	}

	addDto(data) {
		return joi.object({
			productId: joi.number().required(),
			variationId: joi.number().required(),
			quantity: joi.number().required()
		}).validate(data);
	}

	updateDto(data) {
		return joi.object({
			type: joi.string().optional(),
			userId: joi.number().optional()
		}).validate(data);
	}


}

module.exports = new CartsValidator()