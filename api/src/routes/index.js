// const productRouter = require('./products/products.route');
// const variationRouter = require('./variations/variations.route');
// const orderRouter = require('./orders/orders.route');
// const attributesRouter = require('./attributes/attributes.route')
// const UsersRouter = require('./users/users.route');

// const productService = require('../services/products/product.service');
const apiV1Routers = require('./api.v1');
module.exports = (app, express, dir) => {
	app.get('/', (req, res)=> {
		// productService.fetchAll().then(products => {
		// 	console.log({products})
		// 	return res.json(products)
		// })
		res.json({url: req.headers.host, a: req.url, protocol: req.protocol})
	})
	app.use('/uploads', express.static(dir+'/uploads'));
	
	app.use('/api/v1', apiV1Routers);
	// app.use('/products', productRouter);

	// app.use('/orders', orderRouter);

	// app.use('/attributes', attributesRouter)

	// app.use('/users', UsersRouter)

	// app.use('/variations', variationRouter)

	
	// app.use('/', (req, res, next) => {
	// 	res.send('working')
	// })
}