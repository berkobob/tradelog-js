const app = require("./app.js");
const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Tradelog server up and running on port ${port}`),
);
