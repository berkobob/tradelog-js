const moment = require("moment");

class Position {
    constructor(trade) {
        this.trades = [trade];
        this.open = trade.date;
        this.close;
        this.days;
        this.quantity = trade.quantity;
        this.proceeds = trade.proceeds;
        this.commission = trade.commission;
        this.netCash = trade.netCash;
        this.netCashPerDay;
    }
    add(trade) {
        this.trades.push(trade);
        this.quantity += trade.quantity;
        this.proceeds += trade.proceeds;
        this.commission += trade.commission;
        this.netCash += trade.netCash;
        return this.quantity;
    }
    close(date) {
        this.close = date;
        this.days = moment(this.close).diff(moment(this.open), "days");
        if (this.days === 0) this.days = 1;
        this.netCashPerDay = this.netCash / this.days;
        console.log(
            `Trade complete: Days=${this.days} and ${
                this.netCashPerDay
            } per day`,
        );
    }
}

class Symbol {
    constructor(symbol) {
        this.symbol = symbol;
        this.closed = [];
        this.open = {};
    }

    add(trade) {
        if (trade.ticker in this.open) {
            if (!this.open[trade.ticker].add(trade)) {
                this.open[trade.ticker].close(trade.date);
                this.closed.push(this.open[trade.ticker]);
                delete this.open[trade.ticker];
            }
        } else this.open[trade.ticker] = new Position(trade);
    }
}

exports.calculate = trades => {
    new Set(trades.map(trade => trade.symbol)).forEach(symbol => {
        calcSymbol(trades.filter(trade => trade.symbol == symbol));
    });
    return trades;
};

const calcSymbol = trades => {
    const symbol = new Symbol(trades[0].symbol);
    trades.sort((a, b) => a.date - b.date).forEach(trade => symbol.add(trade));
    console.log(symbol);
};
