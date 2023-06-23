const { console } = require("../../helpers");
const { Claims } = require('../../models')
const Service = require("../Service");

class ClaimService extends Service {
	constructor() {
		super(Claims);
		console(`${this.model.name} service started`);
	}

}

module.exports = new ClaimService();