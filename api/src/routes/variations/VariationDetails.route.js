const {Router} = require('express');
const VariationDetailsController = require('../../controllers/variations/VariationDetails.controller');
const {  Auth, Admin, } = require('../../middleware');
const router = Router();



router
.post('/', Auth, Admin, VariationDetailsController.create)
.get('/:id', VariationDetailsController.findOne)
.put('/:id', Auth, Admin, VariationDetailsController.update)
.delete('/:id', Auth, Admin, VariationDetailsController.delete)



module.exports = router;