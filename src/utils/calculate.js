exports.calculate = trades => {
    let symbols = [];
    trades.forEach(trade => {
        symbols.push(trade.symbol);
    });
    let list = Array.from(new Set(symbols));
    console.log(list);

    return trades;
};
