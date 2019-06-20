const payload = {
    headers: {
        "Content-Type": "application/json",
    },
    method: "post",
};

function upload(trades) {
    payload.body = JSON.stringify(trades);
    fetch("/upload", payload)
        .then(res => console.log(res))
        .catch(e => console.log("Error:", e));
}
