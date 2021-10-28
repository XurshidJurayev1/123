const Router = require('express');
const vacancyController = require('../controllers/vacancyControllers');
const router = new Router();


router.post('/', vacancyController.create);
router.get('/', vacancyController.getAll);
router.put('/', vacancyController.update);
router.delete('/:id', vacancyController.delete);


module.exports = router;


