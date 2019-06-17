function setup(e) {
    document.getElementById("upload").addEventListener("click", () => upload());
}
document.addEventListener("DOMContentLoaded", e => setup(e));

function upload() {
    let table = document.getElementById("table");
    let header = document.getElementById("header");
    let temp = header.nextElementSibling;
    while (table.firstChild) table.removeChild(table.firstChild);
    table.appendChild(header);

    var input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", e => {
        let upload = [];
        let file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = e => {
            let rows = e.target.result.split("\n").slice(1, -1);
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
            rows.forEach(row => {
                var newRow = table.insertRow(table.rows.length);
                row = row.split(",");
                row.forEach((field, index) => {
                    let cell = newRow.insertCell(index);
                    let e = document.createElement("P");
                    e.innerHTML = row[index];
                    e.classList.add(cols[index]);
                    cell.appendChild(e);
                });
                let trade = {};
                headers.forEach((key, i) => (trade[key] = row[i]));
                console.log(trade);

                upload.push(trade);
            });
            console.log(upload);
        };
    });
    input.click();
}
