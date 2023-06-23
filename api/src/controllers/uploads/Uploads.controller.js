const createError = require("http-errors");
const { console, isValid, prepare, getSiteUrl } = require("../../helpers");
const UploadService = require("../../services/uploads/Upload.service");
const UploadsValidation = require("../../validations/uploads/Uploads.validation");
const url = require('url')


class BrandsController {
	constructor(){
		console('AttributesController created');
	}

	async fetch(req, res, next) {
		try{
			const data = req.query;
			console(data);
			// validation & verification
			const validation = UploadsValidation.searchDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)
			// process
			const result = await UploadService.fetchAll(data);

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
			const result = await UploadService.findOne(id);

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
			console({data, file: req.file});
                        if(req.file) {
                                const pathToUrl = url.pathToFileURL(req.file.destination).pathname;
				const folder = pathToUrl.split('uploads')[1];
                                const file = req.file.filename;
                                const fileUrl = `${getSiteUrl(req)}/uploads${folder}/${file}`;
                                if(!data.url) data.url = fileUrl;
                                if(!data.title) data.title = file.split('--')[1].split('.')[0];
                                delete req.file;
                        } else {
                                const tail = data.url.split('/');
                                if(!data.title) data.title = tail[tail.length -1].split('.')[0];
                        }
			// validation & verification
			const validation = UploadsValidation.postDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await UploadService.create(data);

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
			const validation = UploadsValidation.updateDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			// process
			const result = await UploadService.update(id, data);

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
			const result = await UploadService.delete(id);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			return next(createError(500));
		}
	}
}

module.exports = new BrandsController();