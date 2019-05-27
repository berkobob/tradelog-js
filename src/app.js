const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");

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

app.use(express.json());
app.use(morgan("dev")); // Logger
app.use("/api", apiRoutes); // API router

// A single home route to see that we're up and running
app.get("/", (req, res) => {
    res.send("And we're off");
});

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
