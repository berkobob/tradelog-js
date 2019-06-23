const express = require('express');
const router = express.Router();
const request = require('request');

const Trade = require('../models/trade');
const webController = require('../controllers/web');

router.get('/', webController.get);

router.post('/', webController.post);

router.post('/upload', webController.upload);

router.get('/test', (req, res) => {
    request(
        'http://localhost:3000/api?id=5d0287456137ab41a424b957',
        (err, data) => {
            if (err) throw err;
            res.send(data.body);
        }
    );
});

module.exports = router;
