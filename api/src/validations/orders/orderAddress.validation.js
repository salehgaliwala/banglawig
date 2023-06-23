const joi = require('@hapi/joi');

class OrderAddressValidator {

	postDto(data) {
		return joi.object({
			name: joi.string().required(),
			email: joi.string().required(),
			phone: joi.string().required(),
			whatsapp: joi.string().optional(),
			address: joi.string().required(),
			state: joi.string().required(),
			postcode: joi.number().required(),
			country: joi.string().required()
		}).validate(data);
	}

}

module.exports = new OrderAddressValidator()