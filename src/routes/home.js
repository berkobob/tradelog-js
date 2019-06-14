const express = require("express");
const router = express.Router();
const request = require("request");
const Trade = require("../models/trade");

router.get("/", (req, res) => {
    let query = {};
    if (req.query.id) query._id = req.query.id;
    if (req.query.symbol) query.symbol = req.query.symbol;

    Trade.find(query)
        .then(results => res.status(200).render("home", { results }))
        .catch(err => res.status(500).send(err));
    // res.render('home', {
    //     name: 'Antoine',
    //     age: 38,
    // });
});

router.get("/test", (req, res) => {
    request(
        "http://localhost:3000/api?id=5d0287456137ab41a424b957",
        (err, data) => {
            if (err) throw err;
            res.send(data.body);
        },
    );
});

module.exports = router;
