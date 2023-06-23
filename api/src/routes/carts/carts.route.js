const { Router } = require('express');
const router = Router();
const CartController = require('../../controllers/carts/Carts.controller');
const cartItemRouter = require('./cartItems.route');
const {Auth} = require('../../middleware/index');

// const { Auth } = require('../../middleware');

router
.use('/items', cartItemRouter)

.get('/', Auth, CartController.fetch)
.get('/user/', Auth, CartController.fetchUserCart)
.post('/', Auth, CartController.create)
.post('/add', Auth, CartController.addToCart)
.put('/:id', Auth, CartController.update)
.delete('/:id', Auth, CartController.delete)
.get('/:id', Auth, CartController.findOne)

module.exports = router;