const express = require("express");

const {
  receiveEvent,
  getEvents,
} = require("../controllers/eventController");

const router = express.Router();

router.post("/", receiveEvent);
router.get("/", getEvents);

module.exports = router;