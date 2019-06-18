const express = require("express");
const router = express.Router();
const request = require("request");

const Trade = require("../models/trade");
const tradesController = require("../controllers/trades");

router.get("/", tradesController.trades);

router.post("/", (req, res) => {
    console.log(req.body);
    res.status(200).send("OK");
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
