const { Router } = require('express');
const router = Router();
const CategoryController = require('../../controllers/categories/Category.controller');
const {  Auth, Admin, } = require('../../middleware');



router
.get('/', CategoryController.fetchNestedCats)
.get('/all', CategoryController.fetchAndCountAllCategories)
.post('/', Auth, Admin, CategoryController.create)
.put('/:id', Auth, Admin, CategoryController.update)
.delete('/:id', Auth, Admin, CategoryController.delete)
// .get('/:id', AttributesController.findOne)

module.exports = router;