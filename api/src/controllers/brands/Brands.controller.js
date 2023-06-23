const createError = require("http-errors");
const { console, isValid, prepare } = require("../../helpers");
const BrandService = require("../../services/Brands/Brand.service");
const BrandValidation = require("../../validations/Brands/Brands.validation");

class BrandsController {
	constructor(){
		console('AttributesController created');
	}

	async fetch(req, res, next) {
		try{
			// process
			const result = await BrandService.fetchAll();

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
			const result = await BrandService.findOne(id);

			// handle error  response

			return res.json(prepare(result));
			
		} catch(err) {
			console(err.message)
			throw next(createError(500));
		}
	}

	async test(req, res, next) {
		try{
			const id = req.params.id;

			// validate
			if(!id) return next(createError(400))

			// process

			// handle error  response

			return res.status(400).json({
				"ErrorNumber": 10,
				"Type": "ValidationException",
				"Message": "A validation exception occurred",
				"Elements": [
				  {
				    "ContactID": "00000000-0000-0000-0000-000000000000",
				    "Addresses": [],
				    "Phones": [
				      {
					"PhoneType": "DEFAULT",
					"ValidationErrors": []
				      },
				      {
					"PhoneType": "FAX",
					"ValidationErrors": []
				      },
				      {
					"PhoneType": "MOBILE",
					"ValidationErrors": []
				      },
				      {
					"PhoneType": "DDI",
					"ValidationErrors": []
				      }
				    ],
				    "ContactGroups": [],
				    "ContactPersons": [],
				    "HasValidationErrors": true,
				    "ValidationErrors": [
				      {
					"Message": "Contact name cannot be empty"
				      }
				    ]
				  }
				]
			      });
			
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
			const validation = BrandValidation.postDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await BrandService.create(data);

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
			const validation = BrandValidation.updateDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await BrandService.update(id, data);

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
			const result = await BrandService.delete(id);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500));
		}
	}
}

module.exports = new BrandsController();