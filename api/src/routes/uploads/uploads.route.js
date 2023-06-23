const { Router } = require('express');
const router = Router();
const UploadsController = require('../../controllers/uploads/Uploads.controller');
const { upload } = require('../../middleware');



router
.get('/', UploadsController.fetch)
.post('/', upload, UploadsController.create)
.put('/:id', UploadsController.update)
.delete('/:id', UploadsController.delete)
.get('/:id', UploadsController.findOne)

module.exports = router;