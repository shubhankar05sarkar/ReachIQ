const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const sendEvent = async (campaignId, status) => {
  try {
    await axios.post(
      "http://localhost:5000/api/events",
      {
        campaignId,
        status,
      }
    );

    console.log(status);
  } catch (error) {
    console.error(
      `Failed to send ${status} callback:`,
      error.message
    );
  }
};

app.post("/send", async (req, res) => {
  const campaign = req.body;

  console.log("Campaign received:");
  console.log(campaign);

  res.status(200).json({
    success: true,
    message: "Accepted",
  });

  const delivered = Math.random() < 0.9;

  if (!delivered) {
    setTimeout(() => {
      sendEvent(
        campaign.id,
        "Failed"
      );
    }, 3000);

    return;
  }

  setTimeout(() => {
    sendEvent(
      campaign.id,
      "Delivered"
    );
  }, 3000);

  const opened = Math.random() < 0.7;

  if (!opened) {
    return;
  }

  setTimeout(() => {
    sendEvent(
      campaign.id,
      "Opened"
    );
  }, 6000);

  const read = Math.random() < 0.8;

  if (!read) {
    return;
  }

  setTimeout(() => {
    sendEvent(
      campaign.id,
      "Read"
    );
  }, 7500);

  const clicked = Math.random() < 0.4;

  if (!clicked) {
    return;
  }

  setTimeout(() => {
    sendEvent(
      campaign.id,
      "Clicked"
    );
  }, 9000);
});

app.listen(6000, () => {
  console.log(
    "Channel Service running on port 6000"
  );
});