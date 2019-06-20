const express = require("express");
const router = express.Router();
const request = require("request");

const Trade = require("../models/trade");
const tradesController = require("../controllers/trades");

router.get("/", tradesController.trades);

router.post("/", tradesController.upload);

router.post("/upload", (req, res) => {
    console.log("Trades:", req.body);

    // let trades = JSON.parse(req.body.trades);
    // console.log(trades);

    // req.body.trades.forEach(trade => console.log(trade));
    res.redirect("/");
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
