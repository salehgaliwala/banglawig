const {Router} = require('express');
const VariationAttributesController = require('../../controllers/variations/VariationAttributes.controller');
const { Auth, Admin, } = require('../../middleware');
const router = Router();



router
.post('/', Auth, Admin, VariationAttributesController.create)
.get('/:id', VariationAttributesController.findOne)
.put('/:id', Auth, Admin, VariationAttributesController.update)
.delete('/:id', Auth, Admin, VariationAttributesController.delete)



module.exports = router;