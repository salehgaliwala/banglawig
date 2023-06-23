const { Router } = require('express');
const router = Router();
const MenuController = require('../../controllers/menus/Menu.controller');



router
.get('/', MenuController.fetchNested)
.post('/', MenuController.create)
.put('/:id', MenuController.update)
.delete('/:id', MenuController.delete)
// .get('/:id', MenuController.findOne)

module.exports = router;