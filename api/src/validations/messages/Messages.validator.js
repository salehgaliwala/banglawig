const joi = require('@hapi/joi');


class MessagesValidator {

	// searchDto(data) {
	// 	return joi.object({
	// 		title: joi.string().optional(),
	// 	}).validate(data);
	// }

	postDto(data) {
		return joi.object({
			email: joi.string().email().required(),
			message: joi.string().required()
		}).validate(data);
	}
}

module.exports = new MessagesValidator();