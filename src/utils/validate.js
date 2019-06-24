const moment = require('moment');

const validate = trade => {
    trade.date = moment(trade.date, 'YYYYMMDD')._d;

    trade.ticker = trade.symbol;
    let symbol = trade.symbol.split(' ')[0];
    if (!isNaN(symbol[symbol.length - 1])) symbol = symbol.slice(0, -1);
    trade.symbol = symbol;

    if (trade.expiry) trade.expiry = moment(trade.expiry, 'DD/MM/YYYY')._d;

    return trade;
};

module.exports = validate;

// let x = validate({
//     date: "19700627",
//     buyOrSell: "buy",
//     quantity: 100,
//     symbol: "7",
//     expiry: "18/01/2014",
// });
// console.log(x);
