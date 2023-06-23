const { Router } = require('express');
const router = Router();

const { AttributeValuesController } = require('../../controllers');
const { Auth, Admin, } = require('../../middleware/index');

router
.get('/', AttributeValuesController.fetch)
.post('/', Auth, Admin, AttributeValuesController.create)
.put('/:id', Auth, Admin, AttributeValuesController.update)
.delete('/:id', Auth, Admin, AttributeValuesController.delete)
.get('/:id', AttributeValuesController.findOne)

module.exports = router;