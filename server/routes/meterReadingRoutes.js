const express = require('express');
const router = express.Router();
const controller = require('../controllers/meterReadingController');

router.post('/', controller.create);
router.delete('/:id', controller.remove);
router.get('/:apartmentId', controller.listByApartment);

module.exports = router;
