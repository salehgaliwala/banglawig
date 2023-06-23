// const sequelize = require("../../config/mysql.db");
const { console } = require("../../helpers");
const { Variations, VariationAttributes, VariationDetails, AttributeValues, Attributes } = require('../../models')
const Service = require("../Service");
const createError = require('http-errors');

class VariationsService extends Service {
	constructor() {
		super(Variations);
		console(`${this.model.name} service started`);
	}

	// async getAttributes(searchQuery) {
	// 	try {
	// 		const defaults = {
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

	async fetchOneTotalVariation(data) {
		// const t = await sequelize.transaction();
		try{
			return await Variations.findOne({
				where: {
					...data,
				},
				include: [
						{
							model: VariationAttributes,
							as: 'VariationAttributes',
							include: [
								{
									model: AttributeValues,
									as: 'attributeValue',
									required: false,
									attributes: ['id', 'title']
								},
								{
									model: Attributes,
									required: false,
									attributes: ['id', 'title', 'description']
								}
							],
							required: false,
							attributes: ['id', 'attributeId', 'attributeValueId']
						},
						{
							model: VariationDetails,
							as: 'VariationDetail',
							required: false,
							attributes: {exclude: ['variationId', 'createdAt', 'updatedAt']}
						}
					],
				});
		} catch(err) {
			console(err);
			return createError(500);
		}
	}

	async createTotalVariation(data) {
		// const t = await sequelize.transaction();
		try{
			const newVariation = await Variations.create({
				...data,
			}, {
				include: [
					{
						model: VariationAttributes,
						as: 'VariationAttributes'
					},
					{
						model: VariationDetails,
						as: 'VariationDetail'
					}
				]
			});

			return await this.fetchOneTotalVariation({id: newVariation.id});
		} catch(err) {
			console(err);
			return createError(500);
		}
	}

}

module.exports = new VariationsService();