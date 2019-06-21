var p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "P1");
});

var proms = [];
proms.push(p1);
Promise.all(proms).then(res => console.log("Done", res));

console.log("P1=", p1);
