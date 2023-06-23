const createError = require("http-errors");
const { isValid, prepare, console } = require("../../helpers");
const CategoryValidation = require("../../validations/categories/Category.validator");
const CategoryService = require("../../services/categories/Category.service");


class CategoryController {
	constructor(){
		console('ValidationsController initiated');
	}


	async fetchAndCountAllCategories(req, res, next) {
		try{
			const result = await CategoryService.fetchAll();
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500))
		}
	}


	async fetchNestedCats(req, res, next) {
		try{
			const parentId = req.query.parent_id || 0;
			const depth = req.query.depth || 5;
			console({depth, parentId})
			const result = await CategoryService.getNestedCategory(+parentId, +depth);
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500))
		}
	}


	async create(req, res, next) {
		try{
			const data = req.body;

			const validation = CategoryValidation.postDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const result = await CategoryService.create(data);

			return res.status(201).json(prepare(result, `${result.title} category created successfully`));
		} catch(err) {
			console(err.message);
			return next(createError(500))
		}
	}


	async update(req, res, next) {
		try{
			const data = req.body;
			const id = req.params.id;

			const validation = CategoryValidation.updateDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const result = await CategoryService.update(id, data);

			return res.json(prepare(result, `${result.title} category updated successfully`));
		} catch(err) {
			console(err.message);
			return next(createError(500))
		}
	}

	
	async delete(req, res, next) {
		try{
			const id = req.params.id;
			if(!id) return next(createError(404));

			// process
			const result = await CategoryService.delete(id);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500));
		}
	}
}


module.exports = new CategoryController()