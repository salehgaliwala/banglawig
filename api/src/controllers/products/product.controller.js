const { console, prepare, errorHandler, isValid } = require('../../helpers');
const createError = require('http-errors');
const { ProductValidator } = require('../../validations');
const ProductService = require('../../services/products/product.service');
const VariationsService = require('../../services/variations/Variations.service');
const VariationAttributesService = require('../../services/variations/VariationAttributes.service');
const VariationDetailsService = require('../../services/variations/VariationDetails.service');
const satelize = require('satelize');

class ProductController {
	constructor() {
		console('product controller created');
	}

	async geodata(req, res,next){
				
		
		try{
			satelize.satelize({ip:'103.19.255.86'}, function(err,payload){
				console(payload);
				if(payload.country_code == 'BD')
				{
					
					const responseData = {
						'currency': 'BDT',
						'currency_rate': '91',
						 }
						  const jsonContent = JSON.stringify(responseData);
  				 		 res.end(jsonContent);
				}
				else
				{
					const responseData = {
						'currency': '$',
						'currency_rate': '1',
						 }
						  const jsonContent = JSON.stringify(responseData);
  				 res.end(jsonContent);
				}
				
				//result.country = payload.country_code;
				});

				
		}
		catch(err){
			console(err.message)
			return next(err);
		}
	}

	async fetch(req, res, next){
		try{
			const data = req.query;
			if(!data.page) data.page = 1;
			// validation & verification
			const validation = ProductValidator.searchDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			
			const result = await ProductService.getProducts(data);
			
				
			// handle error & send response
			return res.json(prepare(result));
		}catch(err){
			console(err.message)
			return next(err);
		}
	}
	async fetchOne(req, res, next){
		try{
			const {slug} = req.params;
			// validation & verification
			if(!slug) return next(createError(404));

			// process
			const result = await ProductService.getProductBySlug(slug);			

			// handle error & send response
			return res.json(prepare(result));
		}catch(err){
			console(err.message)
			return next(err);
		}
	}

	async create(req, res, next) {
		try{
			const data = req.body;

			const validation = ProductValidator.postDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			data.slug = await ProductService.createUniueSlug(data.title);

			const result = await ProductService.create(data);

			return res.status(201).json(prepare(result, `product: ${result.title} created successfully`));
		} catch(err) {
			console(err.message);
			return next(createError(500))
		}
	}


	async update(req, res, next) {
		try{
			const data = req.body;
			const id = req.params.id;

			const validation = ProductValidator.updateDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error);

			const result = await ProductService.update(id, data);

			return res.json(prepare(result, `product: ${result.title} updated successfully`));
		} catch(err) {
			console(err.message);
			return next(createError(500))
		}
	}

	async delete(req, res, next) {
		try{
			const id = req.params.id;
			if(!id) return next(createError(400));

			// process
			const product = await ProductService.getProduct(id);
			if(!product) return next(createError(404));

			// ! Delete sequence
			// product
			const result = await ProductService.delete(product.id);
				// Variations[]
				if(product.Variations && product.Variations.length > 0){
					product.Variations.map(async variation => {
						await VariationsService.delete(variation.id);

						// VariationAttributes[]
						if(variation.VariationAttributes && variation.VariationAttributes.length > 0){
							variation.VariationAttributes.map(async varAttr => {
								await VariationAttributesService.delete(varAttr.id);
							})
						}
						// VariationDetail
						if(variation.VariationDetail && variation.VariationDetail.id) await VariationDetailsService.delete(variation.VariationDetail.id);
					})
				}

			//const result = await ProductService.delete(id);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500));
		}
	}
}

module.exports = new ProductController();
