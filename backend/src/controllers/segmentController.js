const customers = require("../data/customers");

const getSegments = (req, res) => {
  const highValue = customers.filter(
    (customer) => customer.totalSpent >= 15000
  );

  const dormant = customers.filter(
    (customer) => customer.status === "Dormant"
  );

  const atRisk = customers.filter(
    (customer) => customer.status === "At Risk"
  );

  const segments = [
    {
      name: "High Value Customers",
      count: highValue.length,
      description: "Customers spending over ₹15,000",
    },
    {
      name: "Dormant Customers",
      count: dormant.length,
      description: "Customers inactive recently",
    },
    {
      name: "At Risk Customers",
      count: atRisk.length,
      description: "Customers showing lower engagement",
    },
  ];

  res.status(200).json({
    success: true,
    data: segments,
  });
};

module.exports = {
  getSegments,
};