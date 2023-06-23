const { Router } = require('express');
const OrdersController = require('../../controllers/orders/Orders.controller');
const router = Router();
const {Auth} = require('../../middleware/index')
router
.get('/', Auth, OrdersController.fetchOrdersByUser)
.get('/shippingcost', Auth, OrdersController.shippingCost)
.get('/:id', Auth, OrdersController.findOne)
.post('/', Auth, OrdersController.create)

module.exports = router;