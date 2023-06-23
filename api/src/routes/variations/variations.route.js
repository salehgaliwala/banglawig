const {Router} = require('express');
const VariationsController = require('../../controllers/variations/Variations.controller');
const router = Router();
const VariationAttributesRouter = require('./variationsAttributes.route')
const VariationDetailsRouter = require('./VariationDetails.route');
const {  Auth, Admin, } = require('../../middleware');



router
.use('/attributes', VariationAttributesRouter)
.use('/details', VariationDetailsRouter)

.post('/', Auth, Admin, VariationsController.create)
.post('/total', Auth, Admin, VariationsController.createWhole)
.put('/:id', Auth, Admin, VariationsController.update)

module.exports = router;