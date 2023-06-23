const { Op } = require("sequelize");
const { console } = require("../../helpers");
const { Images } = require('../../models')
const Service = require("../Service");

class UploadService extends Service {
	constructor() {
		super(Images);
		console(`${this.model.name} service started`);
	}


	async fetchAll(data={}) {
		try {
			const page = data.page || 1;
			const limit = 10;
			const offset = (page-1)*limit;
			for(let [key, value] of Object.entries(data)){
				if(key === 'title') data[key] = { [Op.like]: `%${value}%` }
				else if(key === 'page') delete data[key];
				else if(value === null && !value === 'title') delete data[key];
			}
			return await Images.findAndCountAll({
				where: {...data},
				limit,
				offset,
				order: [['createdAt', 'DESC']]
			});
		} catch(err) {
			console(err, `${this.model.name} get`)
			throw createError(500);
		}
	}

}

module.exports = new UploadService();