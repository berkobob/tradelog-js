const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
    res.render('home', {
        name: 'Antoine',
        age: 38,
    });
});

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
