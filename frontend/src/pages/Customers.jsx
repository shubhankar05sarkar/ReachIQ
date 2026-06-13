import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function Customers() {
  const [searchParams] = useSearchParams();
  const selectedSegment =
    searchParams.get("segment");
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://reachiq-backend-6r8b.onrender.com/api/customers"
        );

        setCustomers(response.data.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  let segmentCustomers = customers;

if (selectedSegment === "high-value") {
  segmentCustomers = customers.filter(
    (customer) => customer.totalSpent > 15000
  );
}

if (selectedSegment === "dormant") {
  segmentCustomers = customers.filter(
    (customer) => customer.status === "Dormant"
  );
}

if (selectedSegment === "at-risk") {
  segmentCustomers = customers.filter(
    (customer) => customer.status === "At Risk"
  );
}

const filteredCustomers =
  segmentCustomers.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.city}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="page-header">
        <h1>Loading Customers...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="customers-header">
        <div>
          <h1>
  {selectedSegment === "high-value"
    ? "High Value Customers"
    : selectedSegment === "dormant"
    ? "Dormant Customers"
    : selectedSegment === "at-risk"
    ? "At Risk Customers"
    : "Customers"}
</h1>
          <p>{filteredCustomers.length} customers found</p>
        </div>

        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Email</th>
              <th>Total Spend</th>
              <th>Last Order</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.city}</td>
                <td>{customer.email}</td>
                <td>₹{customer.totalSpent.toLocaleString()}</td>
                <td>{formatDate(customer.lastOrderDate)}</td>

                <td>
                  <span
                    className={`status-badge ${customer.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Customers;