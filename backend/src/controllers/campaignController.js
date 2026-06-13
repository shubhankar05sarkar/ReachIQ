const campaigns = require("../data/campaigns");
const axios = require("axios");

const getCampaigns = (req, res) => {
  res.status(200).json({
    success: true,
    count: campaigns.length,
    data: campaigns,
  });
};

const createCampaign = async (req, res) => {
  try {
    const campaign = {
      id: Date.now(),
      ...req.body,
      status: "Queued",
      createdAt: new Date(),
    };

    campaigns.push(campaign);

    await axios.post(
      "https://reachiq-channel.onrender.com/send",
      campaign
    );

    res.status(201).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to queue campaign",
    });
  }
};

module.exports = {
  getCampaigns,
  createCampaign,
};