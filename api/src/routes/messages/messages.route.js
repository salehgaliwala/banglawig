const { Router } = require('express');
const router = Router();
const MessageController = require('../../controllers/messages/Message.controller');

// const { Auth } = require('../../middleware');

router
.get('/', MessageController.fetch)
.post('/', MessageController.create)
// .put('/:id', MessageController.update)
// .delete('/:id', MessageController.delete)

module.exports = router;