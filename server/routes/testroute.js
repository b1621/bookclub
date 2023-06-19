const express = require("express");
const router = express.Router();
const testcontroller = require("../controllers/testcontroller");

router
  .route("/")
  .get(testcontroller.getAllImages)
  .post(testcontroller.createtest);

module.exports = router;
