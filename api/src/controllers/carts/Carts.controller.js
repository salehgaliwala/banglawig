const Controller = require("../Controller");
const CartValidator = require('../../validations/carts/carts.validation');
const CartService = require('../../services/carts/Cart.service');
const { console, prepare, isValid } = require('../../helpers');
const createError = require("http-errors");


class CartController extends Controller {
	constructor() {
		super(CartValidator, CartService);
		
	}
	

	async fetchUserCart(req, res, next) {
		try{
			const id = req.user.id;
			// process
			const result = await CartService.fetchUserCarts(id);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			next(createError(500));
		}
	}

	async addToCart(req, res, next) {
		try{
			const data = req.body;
			const userId = req.user.id;

			// validation & verification
			const validation = CartValidator.addDto(data);
			const validationHandler = isValid(validation);
			if(!validationHandler.valid) return next(validationHandler.error)

			const cartAdded = await CartService.addToCart(userId, data);

			const result = await CartService.fetchUserCarts(userId);

			res.json(prepare(result))

		} catch(err) {
			console(err.message)
			next(createError(500));
		}
	}

}

module.exports = new CartController()