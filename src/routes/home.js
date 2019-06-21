const express = require("express");
const router = express.Router();
const request = require("request");
const allSettled = require("promise.allsettled");

const Trade = require("../models/trade");
const tradesController = require("../controllers/trades");
const validate = require("../utils/validate");

router.get("/", tradesController.trades);

router.post("/", tradesController.upload);

router.post("/upload", (req, res) => {
    const rawTrades = [];
    const trades = [];
    const upload = JSON.parse(req.body.trades.replace(/_/g, " "));
    upload.forEach(row => rawTrades.push(new Trade(validate(row)).save()));
    allSettled(rawTrades)
        .then(results => {
            results.forEach((result, i) => {
                let trade = { status: result.status.toUpperCase() };
                if (result.status === "fulfilled") trade.trade = result.value;
                else {
                    trade.trade = upload[i];
                    trade.trade._id = result.reason._message;
                    trade.errors = Object.keys(result.reason.errors);
                }
                trades.push(trade);
            });
            res.render("commit", { trades });
            // res.send(trades);
        })
        .catch(e => console.log("*** ERROR: ***", e));
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
