const customers = require("../data/customers");
const campaigns = require("../data/campaigns");
const events = require("../data/events");

const getDashboardStats = (req, res) => {
  const totalCustomers = customers.length;

  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0
  );

  const totalCampaigns = campaigns.length;

  const delivered = events.filter(
    (event) => event.status === "Delivered"
  ).length;

  const clicked = events.filter(
    (event) => event.status === "Clicked"
  ).length;

  const conversionRate =
    delivered > 0
      ? Number(((clicked / delivered) * 100).toFixed(1))
      : 0;

  res.status(200).json({
    success: true,
    data: {
      totalCustomers,
      totalRevenue,
      campaigns: totalCampaigns,
      conversionRate,
    },
  });
};

module.exports = {
  getDashboardStats,
};