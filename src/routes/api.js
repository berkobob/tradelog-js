const express = require("express");
const router = express.Router();

const Trade = require("../models/trade");
const validate = require("../utils/validate");
const apiController = require("../controllers/api");

router.get("/", apiController.get);

router.post("/", apiController.post);

router.get("/closed", apiController.closed);

router.get("/open", apiController.open);

router.get("/:tradeID", apiController.getTradeByID);

router.delete("/:tradeID", apiController.deleteByID);

module.exports = router;
