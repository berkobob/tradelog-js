const sum = (x, y) => {
    return new Promise((resolve, reject) => {
        if (x < 0 || y < 0) return reject("Number must be positive");
        resolve(x + y);
    });
};

module.exports = sum;
