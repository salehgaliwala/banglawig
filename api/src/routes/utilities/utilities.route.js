const { Router } = require('express');
const router = Router();

const { UtilitiesController } = require('../../controllers');
const {  Auth, Admin, } = require('../../middleware');
router
.get('/',UtilitiesController.geodata)
.get('/update',UtilitiesController.updatedata)
.get('/getgeodata',UtilitiesController.getipdata)
.post('/sendmail',UtilitiesController.sendmail)
.get('/reviews/:productId',UtilitiesController.getreviewsbyproductid)
.get('/reviewsupdate/:id',UtilitiesController.getreviewsbyid)
.put('/reviewsupdatedata/:id',UtilitiesController.reviewsupdatedata)
.get('/reviews/:productId/images',UtilitiesController.reviewsImages)
.get('/reviews',UtilitiesController.reviews)
.delete('/reviewsdelete/:id',UtilitiesController.reviewsdelete)
.post('/create-reviews',UtilitiesController.createreviews)
.get('/getallproducts',UtilitiesController.reviewsProducts)
.get('/getallmenu',UtilitiesController.getallmenu)
module.exports = router;