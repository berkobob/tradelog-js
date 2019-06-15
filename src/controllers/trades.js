const Trade = require('../models/trade');

exports.trades = (req, res) => {
    let query = {};
    if (req.query.id) query._id = req.query.id;
    if (req.query.symbol) query.symbol = req.query.symbol;

    Trade.find(query)
        .then(results => {
            if (req.headers['user-agent'])
                res.status(200).render('home', { results });
            else res.status(200).send(results);
        })
        .catch(err => res.status(500).send(err));
};
