const moment = require('moment');

class Position {
    constructor(trade) {
        this.trades = [trade];
        this.open = trade.date;
        this.closed;
        this.days;
        this.quantity = trade.quantity;
        this.proceeds = trade.proceeds;
        this.commission = trade.commission;
        this.netCash = trade.netCash;
        this.netCashPerDay;
        this.assetClass = trade.assetClass;
        console.log(trade.assetClass);
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
        this.closed = date;
        this.days = moment(this.closed).diff(moment(this.open), 'days');
        if (this.days === 0) this.days = 1;
        this.netCashPerDay = this.netCash / this.days;
        delete this.quantity;
    }
}

class Symbol {
    constructor(symbol) {
        this.name = symbol;
        this.closed = [];
        this.open = {};
        this.proceeds = 0;
        this.commission = 0;
        this.netCash = 0;
    }

    add(trade) {
        if (trade.ticker in this.open) {
            if (!this.open[trade.ticker].add(trade)) {
                this.open[trade.ticker].close(trade.date);
                this.closed.push(this.open[trade.ticker]);
                this.proceeds += this.open[trade.ticker].proceeds;
                this.commission += this.open[trade.ticker].commission;
                this.netCash += this.open[trade.ticker].netCash;
                delete this.open[trade.ticker];
            }
        } else this.open[trade.ticker] = new Position(trade);
    }
}

const calculate = trades => {
    const portfolio = [];
    new Set(trades.map(trade => trade.symbol)).forEach(name => {
        const symbol = new Symbol(name);
        trades
            .filter(trade => trade.symbol == name)
            .sort((a, b) => a.date - b.date)
            .forEach(trade => symbol.add(trade));
        symbol.open.length = Object.keys(symbol.open).length;
        portfolio.push(symbol);
    });
    sort(portfolio, 'name');
    return portfolio;
};

const sort = (me, by) => {
    me.sort((a, b) => {
        if (a[by] > b[by]) return 1;
        if (a[by] < b[by]) return -1;
        return 0;
    });
};

exports.summary = trades => {
    const portfolio = calculate(trades);
    const results = {
        open: portfolio.reduce((sum, symbol) => sum + symbol.open.length, 0),
        closed: portfolio.reduce(
            (sum, symbol) => sum + symbol.closed.length,
            0
        ),
        proceeds: portfolio.reduce((sum, symbol) => sum + symbol.proceeds, 0),
        commission: portfolio.reduce(
            (sum, symbol) => sum + symbol.commission,
            0
        ),
        netCash: portfolio.reduce((sum, symbol) => sum + symbol.netCash, 0),
    };

    return {
        portfolio,
        results,
    };
};

exports.closed = trades => {
    return { portfolio: calculate(trades) };
};

exports.open = trades => {
    return {
        portfolio: calculate(trades),
    };
};
