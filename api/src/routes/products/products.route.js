const { Router } = require('express');
const router = Router();

const { ProductController } = require('../../controllers');
const {  Auth, Admin, } = require('../../middleware');

router
.get('/', ProductController.fetch)
.post('/', Auth, Admin, ProductController.create)
.get('/:slug', ProductController.fetchOne)
.put('/:id', Auth, Admin, ProductController.update)
.delete('/:id', Auth, Admin, ProductController.delete)

module.exports = router;