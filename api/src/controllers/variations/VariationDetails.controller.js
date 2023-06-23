const createError = require("http-errors");
const { console, isValid, prepare } = require("../../helpers");
const VariationDetailsService = require("../../services/variations/VariationDetails.service");
const VariationDetailsValidation = require("../../validations/variations/VariationDetails.validation");

class VariationDetailsController {
	constructor(){
		console('VariationDetailsController created');
	}

	async findOne(req, res, next) {
		try{
			const id = req.params.id;
			// validate
			if(!id) return next(createError(400))

			// process
			const result = await VariationDetailsService.findOne(id);

			// handle error  response

			return res.json(prepare(result));
			
		} catch(err) {
			console(err.message)
			throw next(createError(500));
		}
	}

	async create(req, res, next) {
		try{
			const data = req.body;
			console(data);
			// validation & verification
			const validation = VariationDetailsValidation.postDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await VariationDetailsService.create(data);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			next(createError(500));
		}
	}

	async update(req, res, next) {
		try{
			const id = req.params.id;
			const data = req.body;
			console(data);
			// validation & verification
			if(!id) return next(createError(400));
			const validation = VariationDetailsValidation.updateDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await VariationDetailsService.update(id, data);

			// handle error and send response
			return res.json(prepare(result));

		} catch(err) {
			console(err.message)
			return next(createError(500));
		}
	}

	async delete(req, res, next) {
		try{
			const id = req.params.id;
			if(!id) return next(createError(400));

			// process
			const result = await VariationDetailsService.delete(id);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500));
		}
	}
}

module.exports = new VariationDetailsController();