const express = require('express');
const router = express.Router();

const Trade = require('../models/trade');
const validate = require('../utils/validate');
const apiController = require('../controllers/api');

router.get('/', apiController.get);

router.post('/', apiController.post);

router.get('/:tradeID', apiController.getTradeByID);

router.delete('/:tradeID', apiController.deleteByID);

module.exports = router;
