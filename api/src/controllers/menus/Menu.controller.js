const createError = require("http-errors");
const { isValid, prepare, console } = require("../../helpers");
const MenuValidation = require("../../validations/menus/Menu.validator");
const MenuService = require("../../services/menus/Menu.service");


class MenuController {
	constructor(){
		console('ValidationsController initiated');
	}


	async fetchNested(req, res, next) {
		try{
			const parentId = req.query.parent_id || 0;
			const depth = req.query.depth || 5;
			console({depth, parentId})
			const result = await MenuService.getNestedMenus(+parentId, +depth);
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500))
		}
	}


	async create(req, res, next) {
		try{
			const data = req.body;

			const validation = MenuValidation.postDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const result = await MenuService.create(data);

			return res.status(201).json(prepare(result, `${result.title} ${MenuService.model.name} created successfully`));
		} catch(err) {
			console(err.message);
			return next(createError(500))
		}
	}


	async update(req, res, next) {
		try{
			const data = req.body;
			const id = req.params.id;

			const validation = MenuValidation.updateDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const result = await MenuService.update(id, data);

			return res.json(prepare(result, `${result.title} ${MenuService.model.name} updated successfully`));
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
			const result = await MenuService.delete(id);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500));
		}
	}


}


module.exports = new MenuController()