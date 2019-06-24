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

        if (this.quantity === 0) this.close(trade.date);
        return this.quantity;
    }
    close(date) {
        this.close = date;
        this.days = moment(this.close).diff(moment(this.open), "days");
        if (this.days === 0) this.days = 1;
        this.netCashPerDay = this.netCash / this.days;
        console.log(`Days=${this.days} and ${this.netCashPerDay} per day`);
    }
}

class Symbol {
    constructor() {
        this.positions = [];
        this.count = 0;
        this.position = false;
    }

    add(trade) {
        if (this.position) {
            this.position.add(trade);
            if (this.position.quantity === 0) {
                this.count += 1;
                this.positions.push(this.position);
                this.position = false;
            }
        } else this.position = new Position(trade);
    }
}

exports.calculate = trades => {
    new Set(trades.map(trade => trade.symbol)).forEach(symbol => {
        calcSymbol(trades.filter(trade => trade.symbol == symbol));
    });
    return trades;
};

const calcSymbol = trades => {
    const symbol = new Symbol();
    trades.sort((a, b) => a - b).forEach(trade => symbol.add(trade));
    console.log(symbol);
};
