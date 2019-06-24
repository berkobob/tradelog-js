const moment = require('moment');

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

        if (this.quantity === 0) this.close(trade.date);
        return this.quantity;
    }
    close(date) {
        this.close = date;
        this.days = moment(this.close).diff(moment(this.open), 'days');
        if (this.days === 0) this.days = 1;
        this.netCashPerDay = this.netCash / this.days;
        console.log(`Days=${this.days} and ${this.netCashPerDay} per day`);
    }
}

class Symbol {
    constructor(symbol) {
        this.symbol = symbol;
        this.count = 0;
        this.closed = {
            STK: [],
            OPT: [],
        };
        this.open = {
            STK: false,
            OPT: false,
        };
    }

    add(trade) {
        let pos = this.open[trade.assetClass];
        if (pos) {
            pos.add(trade);
            if (pos.quantity === 0) {
                this.count += 1;
                this.closed[trade.assetClass].push(pos);
                this.open[trade.assetClass] = false;
            }
        } else this.open[trade.assetClass] = new Position(trade);
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
