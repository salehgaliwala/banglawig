const createError = require('http-errors');
const { console, prepare, isValid } = require('../../helpers');
const productCatService = require('../../services/products/product-cat.service');
const productCatValidator = require('../../validations/products/product-cat.validator');
const Controller = require('../Controller');



class ProductCatController extends Controller {
	constructor() {
            super(productCatValidator, productCatService)
		console('productcat controller created');
	}

	async createBulk(req, res, next) {
		try{
			const data = req.body;

			const validation = productCatValidator.postBulkDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const result = await productCatService.createBulk(data);

			return res.status(201).json(prepare(result, `category relations created successfully`));
		} catch(err) {
			console(err.message);
			return next(createError(500))
		}
	}

}

module.exports = new ProductCatController();
