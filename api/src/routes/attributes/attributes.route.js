const { Router } = require('express');
const router = Router();
const attributeValuesRouter = require('./attributes-values.route')
const { AttributesController } = require('../../controllers');
const { Auth, Admin } = require('../../middleware/index');

router
.use('/values', attributeValuesRouter)

.get('/', AttributesController.fetch)
.get('/nested', AttributesController.fetchNested)
.post('/', Auth, Admin, AttributesController.create)
.put('/:id', Auth, Admin, AttributesController.update)
.delete('/:id', Auth, Admin, AttributesController.delete)
.get('/:id', AttributesController.findOne)

module.exports = router;