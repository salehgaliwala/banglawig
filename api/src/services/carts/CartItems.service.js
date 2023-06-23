const { console } = require("../../helpers");
const { CartItem } = require('../../models')
const Service = require("../Service");

class CartItemService extends Service {
	constructor() {
		super(CartItem);
		console(`${this.model.name} service started`);
	}

}

module.exports = new CartItemService();