const express = require('express');
const router = express.Router();
const controller = require('../controllers/invoiceController');

router.get('/:apartmentId', controller.listByApartment);

module.exports = router;
