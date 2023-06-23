const { console } = require("../../helpers");
const { VariationAttributes } = require('../../models')
const Service = require("../Service");

class VariationAttributesService extends Service {
	constructor() {
		super(VariationAttributes);
		console(`${this.model.name} service started`);
	}

	// async getAttributes(searchQuery) {
	// 	try {
	// 		const defaults = {
	// 			attributeId: '',
	// 			title: '',
	// 			limit: 10,
	// 			offset: 0,
	// 			order: 'createdAt',
	// 			date: null
	// 		}
	// 		Object.assign(defaults, searchQuery);

	// 		const where = {
	// 			title: {
	// 				[Op.like]: `%${defaults.title}%`
	// 			}
	// 		}
	// 		if(defaults.date) where.createdAt = { [Op.between]: [defaults.date.split(',')[0], defaults.date.split(',')[1]] }
		
	// 		return await this.model.findAndCountAll({
	// 			where,
	// 			limit: +defaults.limit,
	// 			offset: +defaults.offset,
	// 			order: [[defaults.order, 'DESC']]
	// 		});
	// 	} catch(err) {
	// 		console(err, 'attr get')
	// 		throw createError(500);
	// 	}
	// }

}

module.exports = new VariationAttributesService();