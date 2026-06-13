const customers = require("../data/customers");

const {
  generateCampaignMessage,
  generateSegmentSuggestion,
} = require("../services/geminiService");

const generateMessage = async (req, res) => {
  try {
    const { goal, segment, channel } = req.body;

    const response =
      await generateCampaignMessage(
        goal,
        segment,
        channel
      );

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate message",
    });
  }
};

const generateSegment = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response =
      await generateSegmentSuggestion(prompt);

    let matchingCustomers = [];

    const text = prompt.toLowerCase();

    const amountMatch = text.match(/\d+/);

    const amount = amountMatch
      ? parseInt(amountMatch[0])
      : 10000;

    const wantsSpent =
      text.includes("spent") ||
      text.includes("spend") ||
      text.includes("spending");

    const wantsMoreThan =
      text.includes("more than") ||
      text.includes("above") ||
      text.includes("greater than") ||
      text.includes("over");

    const wantsLessThan =
      text.includes("less than") ||
      text.includes("below") ||
      text.includes("under");

    const wantsActive =
      text.includes("active") ||
      text.includes("engaged");

    const wantsDormant =
      text.includes("dormant") ||
      text.includes("inactive") ||
      text.includes("not purchased") ||
      text.includes("haven't purchased") ||
      text.includes("hasn't purchased") ||
      text.includes("lapsed");

    const wantsAtRisk =
      text.includes("at risk") ||
      text.includes("low engagement") ||
      text.includes("engagement");

    if (
      wantsSpent &&
      wantsMoreThan &&
      wantsDormant
    ) {
      matchingCustomers = customers.filter(
        (customer) =>
          customer.totalSpent >= amount &&
          customer.status === "Dormant"
      );
    } else if (
      wantsSpent &&
      wantsLessThan &&
      wantsDormant
    ) {
      matchingCustomers = customers.filter(
        (customer) =>
          customer.totalSpent <= amount &&
          customer.status === "Dormant"
      );
    } else if (
      wantsSpent &&
      wantsMoreThan
    ) {
      matchingCustomers = customers.filter(
        (customer) =>
          customer.totalSpent >= amount
      );
    } else if (
      wantsSpent &&
      wantsLessThan
    ) {
      matchingCustomers = customers.filter(
        (customer) =>
          customer.totalSpent <= amount
      );
    } else if (wantsActive) {
  matchingCustomers = customers.filter(
    (customer) =>
      customer.status === "Active"
  );
}
    
    else if (wantsDormant) {
      matchingCustomers = customers.filter(
        (customer) =>
          customer.status === "Dormant"
      );
    } else if (wantsAtRisk) {
      matchingCustomers = customers.filter(
        (customer) =>
          customer.status === "At Risk"
      );
    }

    res.status(200).json({
      success: true,
      segment: response,
      customers: matchingCustomers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate segment",
    });
  }
};

module.exports = {
  generateMessage,
  generateSegment,
};