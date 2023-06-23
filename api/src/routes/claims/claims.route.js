const { Router } = require('express');
const router = Router();
const ClaimsController = require('../../controllers/Claims/Claims.controller');
const { Auth, Admin } = require('../../middleware');



router
.get('/', ClaimsController.fetch)
.get('/test/:id', ClaimsController.test)
.post('/', Auth, Admin, ClaimsController.create)
.put('/:id', Auth, Admin, ClaimsController.update)
.delete('/:id', Auth, Admin, ClaimsController.delete)
.get('/:id', ClaimsController.findOne)

module.exports = router;