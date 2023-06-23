const createError = require("http-errors");
const { console } = require("../../helpers");
const { Cart, CartItem, Product, Variations, VariationDetails, VariationAttributes, Attributes, AttributeValues } = require('../../models');
const productService = require("../products/product.service");
const Service = require("../Service");
const CartItemsService = require("./CartItems.service");

class CartService extends Service {
	constructor() {
		super(Cart);
		console(`${this.model.name} service started`);
	}


	async fetchUserCarts(userId) {
		try {
			return await Cart.findOne({
				where: {userId},
				include: {
					model: CartItem,
					as: 'cartItems',
					include: [
						{
							model: Product,
							as: 'product',
							attributes: {exclude: ['description', 'shortDescription', 'createdAt', 'updatedAt']}
						},
						{
							model: Variations,
							as: 'variation',
							include: [
								{
									model: VariationAttributes,
									as: 'VariationAttributes',
									include: [
										{
											model: AttributeValues,
											as: 'attributeValue',
											required: false,
											attributes: ['title']
										},
										{
											model: Attributes,
											required: false,
											attributes: ['title', 'description']
										}
									],
									required: false,
									attributes: ['id']
								},
								{
									model: VariationDetails,
									as: 'VariationDetail',
									required: false,
									attributes: {exclude: ['variationId', 'createdAt', 'updatedAt']}
								}
							],
							required: false,
							attributes: ['id']
						},
					],
					attributes: ['id', 'cartId', 'productId', 'variationId', 'quantity']
				}
			});
		} catch(err) {
			console(err, `${this.model.name} get`)
			throw createError(500);
		}
	}


	/**
	 * 
	 * @param {*} userId 
	 * @param {*} data  | {productId, variationId, quantity}
	 */
	async addToCart(userId, data) {
		const {productId, variationId, quantity} = data;
		const cart = await this.fetchUserCarts(userId);
		if(cart) {
			// Add new cartItem || update existing cartItem
			const existingCartItemIndex = cart.cartItems.findIndex( cartItem => (cartItem.productId === productId && cartItem.variationId === variationId) );
			if( existingCartItemIndex === -1) { // no match && create new cartItem
				const newCartItem = await this.createNewCartItem(cart.id, {productId, variationId, quantity})
			} else { // matching cartItem found && increment it's quantity
				const cartItemId = cart.cartItems[existingCartItemIndex].id;
				const cartItemQuantity = +cart.cartItems[existingCartItemIndex].quantity;
				if((cartItemQuantity+data.quantity) <= 0) {
					await CartItemsService.delete(cartItemId)
				} else {
					const updatedCartItem = await CartItemsService.update(cartItemId, {quantity: cartItemQuantity+quantity})
				}
			}
		} else {
			// create new Cart && add new cartItem
			const newCart = await this.create({type: 'user', userId});
			const newCartItem = await this.createNewCartItem(newCart.id, {productId, variationId, quantity});
			if(newCartItem) return await this.fetchUserCarts(userId);
		}
	}

	/**
	 * 
	 * @param {*} cartId 
	 * @param {*} data | {productId, variationId, quantity}
	 * @returns 
	 */
	async createNewCartItem(cartId, data){
		try {
			const product = await productService.getProduct(data.productId);
			const variation = product.Variations.find(variation => variation.id === data.variationId);
			const cartItem = {
				cartId,
				product_title: product.title,
				product_image: product.featureImage,
				productId: data.productId,
				variationId: data.variationId,
				quantity: data.quantity,
				price: data.variationId ? variation.VariationDetail.price : product.price
			}
			const cartItemCreated = await CartItemsService.create(cartItem);
			return cartItemCreated;
		} catch(err) {
			console(err.message);
			return createError(500);
		}
	}

	async updateCartItem() {
		try{
	
		} catch(err) {
			console(err.message);
			return createError(500);
		}
	}


}

module.exports = new CartService();