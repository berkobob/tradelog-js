const express = require("express");
const router = express.Router();
const Trade = require("../models/trade");
const validate = require("../utils/validate");

router.get("/", (req, res, next) => {
    Trade.find({})
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err));
});

router.post("/", (req, res) => {
    const trade = new Trade(validate(req.body));
    trade
        .save()
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error));
});

router.get("/:tradeID", (req, res) => {
    Trade.findById(req.params.tradeID)
        .then(data => {
            if (data) res.status(200).send(data);
            else res.status(404).send();
        })
        .catch(err => res.status(500).send(err));
});

router.delete("/:tradeID", (req, res) => {
    Trade.remove({ _id: req.params.tradeID })
        .then(result => {
            console.log(result);

            if (result.deletedCount > 0) res.status(200).send(result);
            else res.status(404).send();
        })
        .catch(err => res.status(500).send(err));
});

module.exports = router;
