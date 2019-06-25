const express = require('express');
const router = express.Router();
const request = require('request');

const Trade = require('../models/trade');
const webController = require('../controllers/web');

router.get('/', webController.get);

router.post('/', webController.post);

router.post('/upload', webController.upload);

router.get('/closed', webController.closed);

router.get('/open', webController.open);

router.get('/trades', webController.trades);

module.exports = router;
