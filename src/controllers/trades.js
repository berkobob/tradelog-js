const path = require("path");
const csv = require("csvtojson");

const Trade = require("../models/trade");
const { headers } = require("../utils/consts");

exports.trades = (req, res) => {
    let query = {};
    if (req.query.id) query._id = req.query.id;
    if (req.query.symbol) query.symbol = req.query.symbol;
    // console.log("FROM:", req.headers["user-agent"]);

    Trade.find(query)
        .then(results => {
            if (req.headers["user-agent"])
                res.status(200).render("home", { results });
            else res.status(200).send(results);
        })
        .catch(err => res.status(500).send(err));
};

exports.upload = (req, res) => {
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
