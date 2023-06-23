const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');

const { middleware } = require('./src/middleware');
const { logger } = require('./src/config');
const { console } = require('./src/helpers');
const router = require('./src/routes');
const prepare = require('./src/helpers/prepare');

const sequelize = require('./src/config/mysql.db');
const productService = require('./src/services/products/product.service');
const CartService = require('./src/services/carts/Cart.service');

sequelize.authenticate().then(()=>{
	console('connected')
	productService.getProducts().then(p => console({p}))
	CartService.fetchUserCarts(1).then(cart => console({cart}));
	
}).catch(err => {
	console(`${err} : disconnected`)
})

const app = express();
const port = process.env.PORT || 3000;

exports.ROOT_DIR = __dirname;


// handle rejection
app.use('unhandledRejection', (reason) => {
	logger.error(reason);
	process.exit(1);
});

// cors
app.use(cors({
	origin: '*',
	optionsSuccessStatus: 200
}));

// middleware
middleware(app);

// routes
router(app,express, __dirname)

// unmatched route handle errors
app.use((req, res, next)=>{
	const error = createError(404);
	next(error);
})

// logging errors
app.use((error, req, res, next) => {
	console(error);
	logger.error(error.message);
	res.statusCode = error.statusCode;
	res.json(prepare(error));
})

// listen
// app.listen(port, ()=>{
// 	console(`server is listening at port`);
// })
// // listen production
app.listen(8888,()=>{
	console(`server is listening at port`);
})