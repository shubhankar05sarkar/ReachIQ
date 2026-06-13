const customers = require("../data/customers");

const getCustomers = (req, res) => {
  res.status(200).json({
    success: true,
    count: customers.length,
    data: customers,
  });
};

module.exports = {
  getCustomers,
};