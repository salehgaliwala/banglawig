const { Router } = require('express');
const router = Router();
const CartItemController = require('../../controllers/carts/CartItems.controller');
const { Auth} = require('../../middleware');



router
.get('/', CartItemController.fetch)
.post('/', Auth, CartItemController.create)
.put('/:id', Auth, CartItemController.update)
.delete('/:id', Auth, CartItemController.delete)
.get('/:id', CartItemController.findOne)

module.exports = router;