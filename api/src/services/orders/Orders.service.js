const createError = require("http-errors");
const { console } = require("../../helpers");
const { Order, OrderItems, OrderAddress, Product, Variations, VariationAttributes, Attributes, VariationDetails, AttributeValues } = require('../../models');
const CartService = require("../carts/Cart.service");
const Service = require("../Service");

class OrderService extends Service {
	constructor() {
		super(Order);
		console(`${this.model.name} service started`);
	}


	async fetchUserOrders(userId) {
		try {
			return await Order.findAndCountAll({
				where: {userId},
				include: [{
					model: OrderItems,
					as: 'orderItems',
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
											model: Attributes,
											required: false,
											attributes: ['title']
										},
										{
											model: AttributeValues,
											as: 'attributeValue',
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
					attributes: ['id', 'orderId', 'productId', 'variationId', 'quantity']
				},{
					model: OrderAddress,
					as: 'orderAddress',
					required: false,
					attributes: {exclude: ['id', 'orderId', 'createdAt', 'updatedAt']}
				}
			]
			});
		} catch(err) {
			console(err, `${this.model.name} get`)
			throw createError(500);
		}
	}


        async create(userId, orderAddress) {
                try{
                        const cart = await CartService.fetchUserCarts(userId);
                        const orderItems = [];
                        cart.cartItems.map(cartItem => {
                                const orderItem = {
                                        productId: cartItem.productId,
                                        variationId: cartItem.variationId,
                                        product_title: cartItem.product.title,
                                        product_image: cartItem.product.featureImage,
                                        price: cartItem.variation.VariationDetail.price,
                                        quantity: cartItem.productId,
                                }
                                orderItems.push(orderItem);
                        });

                        console({orderItems})

                        const shippingCost = this.shippingCostCalc();
                        const subTotal = cart.cartItems.reduce((total, currentItem)=>total + currentItem.variation.VariationDetail.price*currentItem.quantity ,0)
                        const total = shippingCost+subTotal;
                        const order = await Order.create({
                                userId,
                                total,
                                subTotal,
                                shippingCost,
                                orderItems,
                                orderAddress
                        }, {
                               include: [
                                       {
                                               association: 'orderItems'
                                       },
                                       {
                                               association: 'orderAddress'
                                       }
                               ]
                        });
                        return order;

                } catch(err) {
                        console(err.message);
                        return createError(500)
                }

        }


        shippingCostCalc(country){
                const shippingCost = 60;
                return shippingCost;
        }



}

module.exports = new OrderService();