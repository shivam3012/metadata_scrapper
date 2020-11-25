const express = require("express");
const router = express.Router();
const ScrapeController = require("../controller/scrapper.controller");

router.post("/", ScrapeController.scrapper);

module.exports = router;