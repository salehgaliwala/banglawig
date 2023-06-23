const { console } = require("../../helpers");
const { Brand } = require('../../models')
const Service = require("../Service");

class BrandService extends Service {
	constructor() {
		super(Brand);
		console(`${this.model.name} service started`);
	}

}

module.exports = new BrandService();