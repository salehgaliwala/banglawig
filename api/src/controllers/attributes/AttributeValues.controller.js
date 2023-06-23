const createError = require("http-errors");
const { console, isValid, prepare } = require("../../helpers");
const AttributeValuesService = require("../../services/attributes/AttributeValues.service");
const AttributeValuesValidation = require("../../validations/attributes/AttributeValues.validation");

class AttributeValuesController {
	constructor(){
		console('AttributeValuesController created');
	}

	async fetch(req, res, next) {
		try{
			const data = req.query;
			// validation & verification
			const validation = AttributeValuesValidation.searchDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await AttributeValuesService.getAttributes(data);

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
			const result = await AttributeValuesService.findOne(id);

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
			const validation = AttributeValuesValidation.postDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await AttributeValuesService.create(data);

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
			const validation = AttributeValuesValidation.updateDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await AttributeValuesService.update(id, data);

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
			// const data = req.body;
			// console(data);
			// validation & verification
			// const validation = AttributesValidation.updateDto(data);
			// const validationHandler = isValid(validation);
			// if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await AttributeValuesService.delete(id);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500));
		}
	}
}

module.exports = new AttributeValuesController();