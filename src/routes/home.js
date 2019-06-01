const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home", {
        name: "Antoine",
        age: 38,
    });
});

module.exports = router;
