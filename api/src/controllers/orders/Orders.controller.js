const Controller = require("../Controller");
const { console, prepare, isValid } = require('../../helpers');
const createError = require("http-errors");
const OrdersService = require("../../services/orders/Orders.service");
const OrderValidator = require('../../validations/orders/orders.validation')
const OrderAddressValidator = require('../../validations/orders/orderAddress.validation')


class OrderController extends Controller {
	constructor() {
		super(OrderValidator, OrdersService);
		
	}

        async fetchOrdersByUser(req, res, next){
                try{
                        const userId = req.user.id;
                        const result = await OrdersService.fetchUserOrders(userId);
                        return res.json(prepare(result));
                } catch(err) {
                        console(err.message);
                        return next(createError(500))
                }
        }
	

	async create(req, res, next) {
		try{
			const userId = req.user.id;
                        const orderAddress = req.body;
                        console({orderAddress})

                        const addressValidation = OrderAddressValidator.postDto(orderAddress);
                        const addressValidationHandler = isValid(addressValidation);
			if(!addressValidationHandler.valid) return next(addressValidationHandler.error);

			// process
			const result = await OrdersService.create(userId, orderAddress);

			// handle error and send response
			return res.json(prepare(result));
		} catch(err) {
			console(err.message)
			next(createError(500));
		}
	}


	async shippingCost(req, res, nexy){
		try{
			var axios = require("axios").default;
			var options = {
			method: 'GET',
			url: 'https://api-mock.dhl.com/mydhlapi/rates',
			params: {
			accountNumber: '123456789',
			originCountryCode: 'CZ',
			originCityName: 'Prague',
			destinationCountryCode: 'CZ',
			destinationCityName: 'CZ',
			weight: '5',
			length: '15',
			width: '10',
			height: '5',
			plannedShippingDate: '2020-02-26',
			isCustomsDeclarable: 'false',
			unitOfMeasurement: 'metric'
			},
			headers: {
			'Message-Reference': 'd0e7832e-5c98-11ea-bc55-0242ac13',
			'Message-Reference-Date': 'Wed, 21 Oct 2015 07:28:00 GMT',
			// 'Plugin-Name': 'SOME_STRING_VALUE',
			// 'Plugin-Version': 'SOME_STRING_VALUE',
			// 'Shipping-System-Platform-Name': 'SOME_STRING_VALUE',
			// 'Shipping-System-Platform-Version': 'SOME_STRING_VALUE',
			// 'Webstore-Platform-Name': 'SOME_STRING_VALUE',
			// 'Webstore-Platform-Version': 'SOME_STRING_VALUE',
			Authorization: 'Basic bmFpbTpuYWlt'

			}

			};


			axios.request(options).then(function (response) {

				console(response.data);
				return res.json(response)

			}).catch(function (error) {

				console(error);

			});
		}catch(err){
			console(err.message);
			return next(createError(500))
		}
	}

}

module.exports = new OrderController()