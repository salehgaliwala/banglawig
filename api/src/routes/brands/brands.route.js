const { Router } = require('express');
const router = Router();
const BrandsController = require('../../controllers/brands/Brands.controller');
const { Auth, Admin } = require('../../middleware');



router
.get('/', BrandsController.fetch)
.get('/test/:id', BrandsController.test)
.post('/', Auth, Admin, BrandsController.create)
.put('/:id', Auth, Admin, BrandsController.update)
.delete('/:id', Auth, Admin, BrandsController.delete)
.get('/:id', BrandsController.findOne)

module.exports = router;