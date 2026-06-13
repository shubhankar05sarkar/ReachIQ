const express = require("express");

const {
  getCampaigns,
  createCampaign,
} = require("../controllers/campaignController");

const router = express.Router();

router.get("/", getCampaigns);
router.post("/", createCampaign);

module.exports = router;