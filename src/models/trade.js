const mongoose = require("mongoose");

const tradeSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
        trim: true,
    },
    buyOrSell: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports = mongoose.model("Trade", tradeSchema);
