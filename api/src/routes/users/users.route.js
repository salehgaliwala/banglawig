const { Router } = require('express');
const router = Router();

const { UsersController } = require('../../controllers')

router
.get('/', UsersController.fetch)
.post('/', UsersController.signUp)
.post('/login', UsersController.login)
.get('/verify/:token', UsersController.verifyUser)

module.exports = router;