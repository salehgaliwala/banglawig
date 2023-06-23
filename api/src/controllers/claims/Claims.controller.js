const createError = require("http-errors");
const { console, isValid, prepare } = require("../../helpers");
const ClaimService = require("../../services/claims/Claim.service");
const ClaimValidation = require("../../validations/claims/Claims.validator");

class ClaimsController {
	constructor(){
		console('AttributesController created');
	}

	async fetch(req, res, next) {
		try{
			// process
			const result = await ClaimService.fetchAll();

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
			const result = await ClaimService.findOne(id);

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
			const validation = ClaimValidation.postDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await ClaimService.create(data);

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
			const validation = ClaimValidation.updateDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await ClaimService.update(id, data);

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
			const result = await ClaimService.delete(id);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500));
		}
	}
}

module.exports = new ClaimsController();