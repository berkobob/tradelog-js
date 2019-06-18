const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const apiRoutes = require("./routes/api");
const homeRoutes = require("./routes/home");
const moment = require("moment");
const numeral = require("numeral");

// Startup the database
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log(`Connected to ${process.env.MONGODB}`))
    .catch(err =>
        console.log("Database connection error:", err.errmsg, "\n", err),
    );

// Use handlebars at templating engine
numeral.defaultFormat("$0,0.00");
app.engine(
    "hbs",
    exphbs({
        defaultLayout: "main",
        extname: "hbs",
        helpers: {
            formatDate: date => (date ? moment(date).format("DD/MM/YY") : ""),
            formatStrike: amt => (amt ? numeral(amt).format() : ""),
            formatCash: amt => numeral(amt).format(""),
            formatNums: qty => numeral(qty).format("0,0"),
        },
    }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Config express
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(morgan("dev")); // Logger
app.use("/api", apiRoutes); // API router
app.use(homeRoutes);
app.use(express.json());
// This last route is a catchall to capture not found requests
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

// Add error middleware to handle errors consistently
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;

// // This is middleware to manage CORS errors
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization",
//     );

//     if (req.method === "OPTIONS") {
//         res.header(
//             "Access-Control-Allow-Methods",
//             "PUT, POST, PATCH, DELETE, GET",
//         );
//         return res.status(200).json({});
//     }
//     next();
// });
