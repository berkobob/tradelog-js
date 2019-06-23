const path = require('path');
const csv = require('csvtojson');

const Trade = require('../models/trade');
const { headers } = require('../utils/consts');

exports.get = (req, res) => {
    let query = {};
    if (req.query.id) query._id = req.query.id;
    if (req.query.symbol) query.symbol = req.query.symbol;
    // console.log("FROM:", req.headers["user-agent"]);

    Trade.find(query)
        .then(results => {
            if (req.headers['user-agent'])
                res.status(200).render('home', { results });
            else res.status(200).send(results);
        })
        .catch(err => res.status(500).send(err));
};

exports.post = (req, res) => {
    const trade = new Trade(validate(req.body));
    trade
        .save()
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error));
};

exports.getTradeByID = (req, res) => {
    Trade.findById(req.params.tradeID)
        .then(data => {
            if (data) res.status(200).send([data]);
            else res.status(404).send();
        })
        .catch(err => res.status(500).send(err));
};

exports.deleteByID = (req, res) => {
    Trade.remove({ _id: req.params.tradeID })
        .then(result => {
            console.log(result);

            if (result.deletedCount > 0) res.status(200).send(result);
            else res.status(404).send();
        })
        .catch(err => res.status(500).send(err));
};
