const Router = require('express');
const newsContrellers = require('../controllers/newsControllers');
const router = new Router();


router.post('/', newsContrellers.create);
router.get('/', newsContrellers.getAll);
router.put('/', newsContrellers.update);
router.delete('/:id', newsContrellers.delete);


module.exports = router;


