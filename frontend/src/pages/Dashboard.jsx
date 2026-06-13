import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalRevenue: 0,
    campaigns: 0,
    conversionRate: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard"
        );

        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="page-header">
        <h1>Loading Dashboard...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="topbar">
        <h1>Dashboard</h1>

        <button onClick={() => navigate("/campaigns")}>
          Create Campaign
        </button>
      </div>

      <section className="stats-grid">
        <div className="card">
          <h3>Total Customers</h3>
          <p>{stats.totalCustomers}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹{stats.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="card">
          <h3>Campaigns</h3>
          <p>{stats.campaigns}</p>
        </div>

        <div className="card">
          <h3>Conversion Rate</h3>
          <p>{stats.conversionRate}%</p>
        </div>
      </section>
    </>
  );
}

export default Dashboard;