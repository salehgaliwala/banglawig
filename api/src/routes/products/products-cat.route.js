const { Router } = require('express');
const router = Router();
const productCatController = require('../../controllers/products/product-cat.controller');
const {  Auth, Admin, } = require('../../middleware');


router
.get('/', productCatController.fetch)
.post('/', Auth, Admin, productCatController.create)
.post('/bulk', Auth, Admin, productCatController.createBulk)
.put('/:id', Auth, Admin, productCatController.update)
.delete('/:id', Auth, Admin, productCatController.delete)

module.exports = router;