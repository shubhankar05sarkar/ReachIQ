const express = require("express");
const {
  generateMessage,
  generateSegment,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/generate-message", generateMessage);
router.post("/generate-segment", generateSegment);

module.exports = router;