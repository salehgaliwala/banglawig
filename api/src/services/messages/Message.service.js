const { console } = require("../../helpers");
const { Messages } = require('../../models');
const Service = require("../Service");

class MessageService extends Service {
	constructor() {
		super(Messages);
		console(`${this.model.name} service started`);
	}

}

module.exports = new MessageService();