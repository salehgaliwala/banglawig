const createError = require("http-errors");
const { console, isValid, prepare } = require("../../helpers");
const VariationAttributesService = require("../../services/variations/VariationAttributes.service");
const VariationAttributesValidation = require("../../validations/variations/VariationAttributes.validation");


class VariationAttributesController {
	constructor(){
		console('VariationValuesController created');
	}


	async findOne(req, res, next) {
		try{
			const id = req.params.id;
			// validate
			if(!id) return next(createError(400))

			// process
			const result = await VariationAttributesService.findOne(id);

			// handle error  response
			return res.json(prepare(result));
			
		} catch(err) {
			console(err.message)
			return next(createError(500));
		}
	}

	async create(req, res, next) {
		try{
			const data = req.body;
			console(data);
			// validation & verification
			const validation = VariationAttributesValidation.postDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await VariationAttributesService.create(data);

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
			const validation = VariationAttributesValidation.updateDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await VariationAttributesService.update(id, data);

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
			const result = await VariationAttributesService.delete(id);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500));
		}
	}
}

module.exports = new VariationAttributesController();