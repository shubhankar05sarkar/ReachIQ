const express = require("express");
const cors = require("cors");
require("dotenv").config();
const customerRoutes = require("./routes/customerRoutes");
const segmentRoutes = require("./routes/segmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const eventRoutes = require("./routes/eventRoutes");
const aiRoutes = require("./routes/aiRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ReachIQ Backend Running"
  });
});

const PORT = process.env.PORT || 5000;

app.use("/api/customers", customerRoutes);
app.use("/api/segments", segmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/orders", orderRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});