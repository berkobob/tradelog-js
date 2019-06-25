const path = require("path");
const csv = require("csvtojson");

const Trade = require("../models/trade");
const { headers } = require("../utils/consts");
const validate = require("../utils/validate");
const allSettled = require("promise.allsettled");
const { process } = require("../utils/calculate");

exports.get = (req, res) => {
    let query = {};
    if (req.query.id) query._id = req.query.id;
    if (req.query.symbol) query.symbol = req.query.symbol;

    Trade.find(query).then(results => {
        Trade.find(query)
            .then(results => res.status(200).render("home", process(results)))
            .catch(err => res.status(500).send(err));
    });
};

exports.post = (req, res) => {
    if (!req.files) return res.redirect("/");
    let file = req.files.file.name;
    let upload = path.join(__dirname, "../../uploads/", file);
    req.files.file.mv(upload, err => {
        if (err) res.status(500).send(err);
        csv({ noheader: false, headers })
            .fromFile(upload)
            .then(trades => res.status(200).render("upload", { trades }))
            .catch(e => console.log(e));
    });
};

exports.upload = (req, res) => {
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
        })
        .catch(e => console.log("*** ERROR: ***", e));
};
