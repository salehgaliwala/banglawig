const { Router } = require('express');
const HomepageController = require('../../controllers/homepage/Homepage.controller');
const router = Router();



router
.get('/', HomepageController.fetchHomepage)

module.exports = router;