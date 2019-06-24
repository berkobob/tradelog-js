const mongoose = require('mongoose');

const tradeSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
        trim: true,
    },
    buyOrSell: {
        type: String,
        required: true,
        trim: true,
        enum: ['BUY', 'SELL'],
    },
    quantity: {
        type: Number,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
        trim: true,
    },
    expiry: {
        type: Date,
        required: false,
    },
    strike: {
        type: Number,
    },
    putOrCall: {
        type: String,
        trim: true,
        enum: ['P', 'C', ''],
    },
    tradePrice: {
        type: Number,
        required: true,
    },
    proceeds: {
        type: Number,
        required: true,
    },
    commission: {
        type: Number,
        required: true,
    },
    netCash: {
        type: Number,
        required: true,
    },
    assetClass: {
        type: String,
        required: true,
        trim: true,
        enum: ['STK', 'OPT'],
    },
    openOrClose: {
        type: String,
        required: true,
        trim: true,
        enum: ['O', 'C'],
    },
    multiplier: {
        type: Number,
        required: true,
    },
    notes: {
        type: String,
        trim: true,
    },
    ticker: {
        type: String,
    },
});

module.exports = mongoose.model('Trade', tradeSchema);
