import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();

    const interval = setInterval(() => {
      fetchEvents();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://reachiq-backend-6r8b.onrender.com/api/events"
      );

      setEvents(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const delivered = events.filter(
    (event) => event.status === "Delivered"
  ).length;

  const opened = events.filter(
    (event) => event.status === "Opened"
  ).length;

  const read = events.filter(
    (event) => event.status === "Read"
  ).length;

  const clicked = events.filter(
    (event) => event.status === "Clicked"
  ).length;

  const failed = events.filter(
    (event) => event.status === "Failed"
  ).length;

  const totalCampaigns = new Set(
    events.map((event) => event.campaignId)
  ).size;

  const deliveryRate =
    delivered + failed > 0
      ? (
          (delivered /
            (delivered + failed)) *
          100
        ).toFixed(1)
      : 0;

  const failureRate =
    delivered + failed > 0
      ? (
          (failed /
            (delivered + failed)) *
          100
        ).toFixed(1)
      : 0;

  const openRate =
    delivered > 0
      ? (
          (opened / delivered) *
          100
        ).toFixed(1)
      : 0;

  const readRate =
    opened > 0
      ? (
          (read / opened) *
          100
        ).toFixed(1)
      : 0;

  const clickRate =
    read > 0
      ? (
          (clicked / read) *
          100
        ).toFixed(1)
      : 0;

  return (
    <>
      <div className="page-header">
        <h1>Analytics</h1>
      </div>

      <div className="stats-grid">
        <div className="card">
          <h3>Delivery Rate</h3>
          <p>{deliveryRate}%</p>
        </div>

        <div className="card">
          <h3>Failure Rate</h3>
          <p>{failureRate}%</p>
        </div>

        <div className="card">
          <h3>Open Rate</h3>
          <p>{openRate}%</p>
        </div>

        <div className="card">
          <h3>Read Rate</h3>
          <p>{readRate}%</p>
        </div>

        <div className="card">
          <h3>Click Rate</h3>
          <p>{clickRate}%</p>
        </div>

        <div className="card">
          <h3>Total Campaigns</h3>
          <p>{totalCampaigns}</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Campaign Event Timeline</h2>

        <table>
          <thead>
            <tr>
              <th>Campaign ID</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {events
              .slice()
              .reverse()
              .map((event) => (
                <tr key={event.id}>
                  <td>{event.campaignId}</td>
                  <td>{event.status}</td>
                  <td>
                    {new Date(
                      event.receivedAt
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Analytics;