let x = "x";
let y = "y";
let z = "z";

let test = { x: 1, y: 2, z: 3 };

test["w"] = 4;

console.log("Test", test);
console.log("text.x", test.x);
console.log("in", "w" in test);
