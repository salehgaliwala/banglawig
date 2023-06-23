const { console } = require("../../helpers");
const createError = require('http-errors');
const { Product, VariationAttributes, Variations, VariationDetails, AttributeValues, Images, Categories, Attributes } = require("../../models");
const Service = require("../Service");
const VariationDetailsService = require("../variations/VariationDetails.service");
const Brand = require("../../models/brands/Brands.model");
const { Op } = require("sequelize");

class ProductService extends Service {

	constructor() {
		super(Product);
		console('product service created')
	}

	getVariationNestedModel(){
			return [
				{
					model: Variations,
					as: 'Variations',
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
							model: Images,
							as: 'Images',
							where: {
								caseType: 'variation'
							},
							required: false,
							attributes: ['id', 'url', 'title']
						},
						{
							model: VariationDetails,
							as: 'VariationDetail',
							required: false,
							attributes: {exclude: ['variationId', 'createdAt', 'updatedAt']}
						}
					],
					required: false,
					attributes: ['id']
				},
				{
					model: Images,
					as: 'Images',
					where: {
						caseType: 'product'
					},
					required: false,
					attributes: ['id', 'url', 'title']
				},
				{
					model: Categories,
					required: false,
					attributes: {exclude: ['product_category_relation', 'updatedAt', 'createdAt']}
				},
				{
					model: Brand,
					as: 'brand',
					required: false
				}
			];
		}

		async getProduct(id) {
		try{
			const data = await this.model.findOne({
				where: {id},
				include: this.getVariationNestedModel()
			});

			return data;
			// return createError(500)
		}catch(err){
			console(err, 'product service')
			return createError(500);
		}
	}


	async getProductBySlug(slug) {
		return await this.model.findOne({
			where: { slug },
			include: this.getVariationNestedModel()
		});
	}

	async findBySlug(slug) {
		return await this.model.findAll({
			where: { 
				slug: {[Op.like]: `%${slug}%`}
			 }
		});
	}

	async createUniueSlug(title) {
		try {
			const slug = title.toLowerCase().split(' ').join('-');
			const matchingSlugs = await this.findBySlug(slug);
			let slugSuffixs = [];
			if( matchingSlugs && matchingSlugs.length > 0 ){
				matchingSlugs.map(singleProduct => {
					slugSuffixs.push(Math.abs(+singleProduct.slug.replace(slug, '')));
				})
				const newSuffix = Math.max(...slugSuffixs)+1;
				const newSlug = `${slug}-${newSuffix}`;
				return newSlug;
			} else {
				return slug;
			}
		} catch(err) {
			console(err.message);
			return createError(500);
		}
	}

	async getProducts(data={}) {
		try{
			const page = data.page || 1;
			const limit = 10;
			const offset = (page-1)*limit;
			for(let [key, value] of Object.entries(data)){
				if(key === 'title') data[key] = { [Op.like]: `%${value}%` }
				else if(key === 'page') delete data[key];
				else if(value === null && !value === 'title') delete data[key];
			}

			if(data.categoryId){
				const productRes = await this.findProductByCatId(data.categoryId, page)
				return {count: productRes ? productRes.products.length : 0, rows: productRes ? productRes.products : []};
			} else {
				const result = await this.model.findAndCountAll({
					where: {...data},
					include: this.getVariationNestedModel(),
						attributes: {exclude: ['brandId']},
						offset,
						limit,
						order: [['createdAt', 'DESC']]
				});

				return result;
			}
		}catch(err){
			console(err, 'product service')
			return createError(500);
		}
	}



	async findProductByCatId(catId, page=1){
		try{
			const limit = 10;
			const offset = (page-1)*limit;

			return await Categories.findOne({
				where: {id: catId},
				include:[
					{
						model: Product,
						required: false,
						include: this.getVariationNestedModel()
					}
				],
				attributes: {exclude: ['id', 'title', 'parentId', 'description', 'createdAt', 'updatedAt']},
				offset,
				limit
			})
		}catch(err){
			console(err.message);
			return createError(500);
		}
	}

	/**
	 * TODO: Needs to test the function
	 * // fetch product
	 * * if stock === -1 returns true
	 * ! if new stock < 0 i.e stock out order, return Error
	 * ? if not cal and return new stock
	 * @param {*} productId 
	 * @param {*} variationId 
	 * @param {*} amount 
	 * @returns true | Error | update
	 */
	async orderOccur(productId, variationId=null, amount=1){
		try{
			const product = await this.getProduct(productId);
			const newProductStock = this.changeStock(product, amount);
			const productUpdated = await this.update(productId, {stock: newProductStock});
			let variationUpdated = false;
			if(variationId) {
				const orderedVariation = product.Variations.find(v => v.id === variationId);
				const newVariationStock = this.changeStock(orderedVariation, amount);
				variationUpdated = await VariationDetailsService.update(variationId, {stock: newVariationStock})
			}
			return {productUpdated, variationUpdated}
		}catch(err) {
			console(err, 'during order occur in product service')
			return createError(500);
		}
	}

	/**
	 * TODO: Needs to test the function
	 * ? if stock === -1, return false
	 * ! if stock < 0, return Error
	 * * else return newStock
	 * @param {*} item 
	 * @param {*} deductAmount 
	 * @returns 
	 */
	changeStock(item, deductAmount=1) {
		if(item.stock === -1) {
			return false;
		}
		else {
			const newStock = item.stock - deductAmount;
			if(newStock < 0) {
				const error = new Error(`Item ${item.title} has ${item.stock} quantity available for order`);
				error.statusCode = 400;
				return error;
			}
			else {
				return newStock;
			}
		}
	}
}

module.exports = new ProductService();