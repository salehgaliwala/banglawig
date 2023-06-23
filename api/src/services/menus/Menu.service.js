
const createError = require("http-errors");
const { console, depthObjGenerator } = require("../../helpers");
const { Menu } = require('../../models')
const Service = require("../Service");

class MenuService extends Service {
	constructor() {
		super(Menu);
		console(`${this.model.name} service started`);
	}


	async getNestedMenus(parentId=0, depth=5) {
		try{
			const objRef = {
					model: Menu,
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

module.exports = new MenuService();