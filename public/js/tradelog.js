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
            rows.forEach(row => {
                var newRow = table.insertRow(table.rows.length);
                row = row.split(",");
                row.forEach((field, index) => {
                    let cell = newRow.insertCell(index);
                    let e = document.createElement("P");
                    e.innerHTML = row[index];
                    e.classList.add("w3-center");
                    cell.appendChild(e);
                });
                upload.push(row);
            });
            console.log(upload);
        };
    });
    input.click();
}
