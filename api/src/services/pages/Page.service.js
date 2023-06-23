const createError = require("http-errors");
const { console } = require("../../helpers");
const { Pages } = require('../../models')
const Service = require("../Service");

class PageService extends Service {
	constructor() {
		super(Pages);
		console(`${this.model.name} service started`);
	}

        async findOneBySlug(slug) {
                try{
			const page = await Pages.findOne({ where: { slug } });
			if(!page) {
				return createError(404);
			}else{
				return page;
			}
		} catch(err) {
			console(err, `${Pages.name} page slug: ${slug}`)
			throw createError(500);
		}
        }
        async createUniueSlug(title) {
		try {
			const slug = title.toLowerCase().split(' ').join('-');
			const countSlugs = await Pages.count({
                                where: {
                                        slug: {
                                                [Op.like]: `%${slug}%`
                                        }
                                }
                        });

                        return (countSlugs && countSlugs > 0) ? `${slug}-${countSlugs+1}` : slug;
		} catch(err) {
			console(err.message);
			return createError(500);
		}
	}

}

module.exports = new PageService();