const Controller = require("../Controller");
const CartItemValidator = require('../../validations/carts/cartItems.validation');
const CartItemService = require('../../services/carts/CartItems.service');


class CartItemController extends Controller {
	constructor() {
		super(CartItemValidator, CartItemService);
		
	}
	

}

module.exports = new CartItemController()