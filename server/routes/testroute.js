const express = require("express");
const router = express.Router();
const testcontroller = require("../controllers/testcontroller");

router.route("/").get(testcontroller.gettest);

module.exports = router;
