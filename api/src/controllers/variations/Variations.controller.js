const createError = require("http-errors");
const { isValid, prepare, console } = require("../../helpers");
const VariationsService = require("../../services/variations/Variations.service");
const VariationsValidation = require("../../validations/variations/Variations.validation");


class VariationsController {
	constructor(){
		console('ValidationsController initiated');
	}


	async createWhole(req, res, next) {
		try{
			const data = req.body;

			const validation = VariationsValidation.createDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const result = await VariationsService.createTotalVariation(data);

			return res.status(201).json(prepare(result, `${result.title} variation created successfully`));
		} catch(err) {
			console(err.message);
			return next(createError(500))
		}
	}


	async create(req, res, next) {
		try{
			const data = req.body;

			const validation = VariationsValidation.postDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const result = await VariationsService.create(data);

			return res.status(201).json(prepare(result, `${result.title} variation created successfully`));
		} catch(err) {
			console(err.message);
			return next(createError(500))
		}
	}


	async update(req, res, next) {
		try{
			const data = req.body;
			const id = req.params.id;

			const validation = VariationsValidation.updateDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const result = await VariationsService.update(id, data);

			return res.json(prepare(result, `${result.title} variation updated successfully`));
		} catch(err) {
			console(err.message);
			return next(createError(500))
		}
	}
}


module.exports = new VariationsController()