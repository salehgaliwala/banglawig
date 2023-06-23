const { console } = require("../../helpers");
const { ProCatTax } = require("../../models");
const Service = require("../Service");

class ProductCatService extends Service {

	constructor() {
		super(ProCatTax);
		console('product service created')
	}

	async createBulk(data) {
		try{
			return await ProCatTax.bulkCreate(data);
		} catch(err) {
			console(err, `${this.model.name} create`)
			return createError(500);
		}
	}

}

module.exports = new ProductCatService();