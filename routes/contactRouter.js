const Router = require('express');
const contactControllers = require('../controllers/contactControllers');
const router = new Router();


router.post('/', contactControllers.create);
router.get('/', contactControllers.getAll);
router.put('/', contactControllers.put);
router.delete('/:id', contactControllers.delete);


module.exports = router;


