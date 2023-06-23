const { Router } = require('express');
const { Auth } = require('../../middleware/index')
const PagesController = require('../../controllers/pages/Pages.controller');
const router = Router();




router
.get('/', PagesController.fetch)
.post('/', Auth, PagesController.create)
.put('/:id', Auth, PagesController.update)
.delete('/:id', Auth,  PagesController.delete)
.get('/:slug', PagesController.fetchOneBySlug)

module.exports = router;