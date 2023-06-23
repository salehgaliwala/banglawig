const { Router } = require('express');
const router = Router();
const productRouter = require('./products/products.route');
const variationRouter = require('./variations/variations.route');
const orderRouter = require('./orders/orders.route');
const attributesRouter = require('./attributes/attributes.route')
const UsersRouter = require('./users/users.route');
const categoryRouter = require('./categories/category.route')
const brandRouter = require('./brands/brands.route')
const claimRouter = require('./claims/claims.route')
const menuRouter = require('./menus/menu.route')
const cartRouter = require('./carts/carts.route')
const productCatRouter = require('./products/products-cat.route')
const pageRouter = require('./pages/pages.route')
const uploadRouter = require('./uploads/uploads.route')
const homepageRouter = require('./homepage/homepage.route')
const { Auth } = require('../middleware');
const utilitiesRouter = require('./utilities/utilities.route');
router
.use('/products', productRouter)
.use('/utilities', utilitiesRouter)
.use('/products-cat', productCatRouter)

.use('/orders', Auth, orderRouter)

.use('/attributes', attributesRouter)

.use('/users', UsersRouter)

.use('/variations', variationRouter)

.use('/categories', categoryRouter)

.use('/brands', brandRouter)

.use('/claims', claimRouter)

.use('/menus', menuRouter)

.use('/carts',Auth, cartRouter)

.use('/pages', pageRouter)

.use('/uploads', uploadRouter)

.use('/homepage', homepageRouter)
	
.use('/', (req, res, next) => {
		res.send('hello world, are you bold ? ')
})

module.exports = router;