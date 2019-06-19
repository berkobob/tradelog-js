const headers = [
    "date",
    "buyOrSell",
    "quantity",
    "symbol",
    "expiry",
    "strike",
    "putOrCall",
    "tradePrice",
    "proceeds",
    "commission",
    "netCash",
    "assetClass",
    "openOrClose",
    "multiplier",
    "notes",
];

const cols = [
    "w3-center",
    "w3-left-align",
    "w3-right-align",
    "w3-left-align",
    "w3-center",
    "w3-right-align",
    "w3-center",
    "w3-right-align",
    "w3-right-align",
    "w3-right-align",
    "w3-right-align",
    "w3-center",
    "w3-center",
    "w3-right-align",
    "w3-center",
];

const url = "http://localhost:3000/api";

const payload = {
    headers: {
        "Content-Type": "application/json",
    },
    method: "POST",
};

let button;

function setup(e) {
    button = document.getElementById("upload");
    button.addEventListener("click", () => upload());
    document.getElementById("form").onSubmit();
}

document.addEventListener("DOMContentLoaded", e => setup(e));

function upload() {
    let table = document.getElementById("table");

    var input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", e => {
        let trades = [];
        let file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = e => {
            clearRows(table);
            let rows = e.target.result.split("\n").slice(1, -1);

            rows.forEach(row => {
                row = row.split(",");
                console.log(row);

                let trade = {};
                headers.forEach((key, i) => (trade[key] = row[i]));
                trades.push(trade);
                addRow(table, trade);
            });
            var upload = document.createElement("button");
            upload.innerText = "Upload";
            upload.classList.add("w3-green", "w3-button");
            button.parentNode.insertBefore(upload, button.nextSibling);
            upload.addEventListener("click", () => {
                clearRows(table);
                try {
                    trades.forEach(trade => {
                        payload.body = JSON.stringify(trade);
                        fetch(url, payload)
                            .then(data => {
                                if (data.status === 201)
                                    data.json().then(data => {
                                        trade.date = new Date(
                                            trade.date,
                                        ).toLocaleDateString();
                                        if (trade.expiry)
                                            trade.expiry = new Date(
                                                trade.expiry,
                                            ).toLocaleDateString();
                                        trade.tradePrice = trade.tradePrice
                                            .toFixed(2)
                                            .replace(
                                                /\d(?=(\d{3})+\.)/g,
                                                "$&,",
                                            );
                                        trade.proceeds = trade.proceeds
                                            .toFixed(2)
                                            .replace(
                                                /\d(?=(\d{3})+\.)/g,
                                                "$&,",
                                            );
                                        trade.commission = trade.commission
                                            .toFixed(2)
                                            .replace(
                                                /\d(?=(\d{3})+\.)/g,
                                                "$&,",
                                            );
                                        trade.netCash = trade.netCash
                                            .toFixed(2)
                                            .replace(
                                                /\d(?=(\d{3})+\.)/g,
                                                "$&,",
                                            );
                                        addRow(table, data);
                                    });
                            })
                            .catch(err => console.log(err));
                    });
                } catch (e) {
                    console.log(e.message);
                }
                upload.remove();
            });
        };
    });
    input.click();
}

/*
 * Utility Functions
 */

function clearRows(table) {
    let header = document.getElementById("header");
    while (table.firstChild) table.removeChild(table.firstChild);
    table.appendChild(header);
}

function addRow(table, trade) {
    debugger;
    var row = table.insertRow(table.rows.length);

    headers.forEach((header, index) => {
        let cell = row.insertCell(index);
        let elem = document.createElement("P");
        elem.innerHTML = trade[header];
        elem.classList.add(cols[index]);
        cell.appendChild(elem);
    });
}
