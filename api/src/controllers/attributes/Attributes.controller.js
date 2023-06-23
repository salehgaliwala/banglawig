const createError = require("http-errors");
const { console, isValid, errorHandler, prepare } = require("../../helpers");
const AttributesService = require("../../services/attributes/Attributes.service");
const AttributesValidation = require("../../validations/attributes/Attributes.validation");

class AttributesController {
	constructor(){
		console('AttributesController created');
	}

	async fetch(req, res, next) {
		try{
			const data = req.query;
			// validation & verification
			const validation = AttributesValidation.searchDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await AttributesService.getAttributes(data);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			next(createError(500));
		}
	}


	async fetchNested(req, res, next) {
		try{
			// process
			const result = await AttributesService.getAttributesNested();

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			next(createError(500));
		}
	}

	async findOne(req, res, next) {
		try{
			const id = req.params.id;

			// validate
			if(!id) return next(createError(400))

			// process
			const result = await AttributesService.findOne(id);

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
			const validation = AttributesValidation.postDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await AttributesService.create(data);

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
			const validation = AttributesValidation.updateDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await AttributesService.update(id, data);

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
			if(!id) return next(createError(404));

			// process
			const result = await AttributesService.delete(id);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500));
		}
	}
}

module.exports = new AttributesController();