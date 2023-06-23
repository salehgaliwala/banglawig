
const createError = require("http-errors");
const { console, depthObjGenerator } = require("../../helpers");
const { Categories } = require('../../models')
const Service = require("../Service");

class CategoryService extends Service {
	constructor() {
		super(Categories);
		console(`${this.model.name} service started`);
	}


	async getNestedCategory(parentId=0, depth=5) {
		try{
			const objRef = {
					model: Categories,
					as: 'children',
					required: false
			};
			
			const include = depthObjGenerator(objRef, 'include', depth);
			console(include)
			const nestedCats = await this.model.findAll({
				include,
				where: {
					parentId: parentId
				}
			});
			return nestedCats;
		} catch(err) {
			console(err.message);
			return createError(500);
		}
	}

}

module.exports = new CategoryService();