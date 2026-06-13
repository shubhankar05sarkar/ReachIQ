const express = require("express");
const router = express.Router();

const {
  getSegments,
} = require("../controllers/segmentController");

router.get("/", getSegments);

module.exports = router;