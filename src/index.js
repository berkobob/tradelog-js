const app = require("./app.js");
const port = process.env.PORT;

app.listen(port, () =>
    console.log(`Tradelog server up and running on port ${port}`),
);
