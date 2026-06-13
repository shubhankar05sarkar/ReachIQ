import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Segments() {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [segments, setSegments] = useState([]);
  const [matchingCustomers, setMatchingCustomers] =
    useState([]);

  const [loading, setLoading] = useState(false);

  const [aiSuggestion, setAiSuggestion] = useState(
    "AI recommendations will appear here after generation."
  );

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await axios.get(
          "https://reachiq-backend-6r8b.onrender.com/api/segments"
        );

        setSegments(response.data.data);
      } catch (error) {
        console.error("Error fetching segments:", error);
      }
    };

    fetchSegments();
  }, []);

  const generateSegment = async () => {
    if (!prompt.trim()) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://reachiq-backend-6r8b.onrender.com/api/ai/generate-segment",
        {
          prompt,
        }
      );

      setAiSuggestion(response.data.segment);

      setMatchingCustomers(
        response.data.customers
      );
    } catch (error) {
      console.error(error);

      setAiSuggestion(
        "Failed to generate audience recommendation."
      );

      setMatchingCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>Segments</h1>
      </div>

      <div className="ai-builder">
        <h3>AI Segment Builder</h3>

        <p>
          Describe the audience you want to target in plain
          English.
        </p>

        <textarea
          placeholder="Example: Customers who spent over ₹10,000 and haven't ordered recently"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={generateSegment}
          disabled={!prompt.trim() || loading}
        >
          {loading
            ? "Generating..."
            : "Generate Segment"}
        </button>

        {loading && (
          <p style={{ marginTop: "10px" }}>
            Generating audience segment...
          </p>
        )}

        <div className="ai-preview">
          <h4>Suggested Segment</h4>

          <p>{aiSuggestion}</p>

          {matchingCustomers.length > 0 && (
            <div style={{ marginTop: "15px" }}>
              <h4>Matching Customers</h4>

              {matchingCustomers.map((customer) => (
                <div key={customer.id}>
                  • {customer.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="segments-grid">
        {segments.map((segment) => (
          <div
            className="segment-card"
            key={segment.name}
            onClick={() => {
              if (
                segment.name ===
                "High Value Customers"
              ) {
                navigate(
                  "/customers?segment=high-value"
                );
              }

              if (
                segment.name ===
                "Dormant Customers"
              ) {
                navigate(
                  "/customers?segment=dormant"
                );
              }

              if (
                segment.name ===
                "At Risk Customers"
              ) {
                navigate(
                  "/customers?segment=at-risk"
                );
              }
            }}
          >
            <h3>{segment.name}</h3>

            <p>{segment.description}</p>

            <div className="segment-count">
              {segment.count} Customers
            </div>

            <div className="segment-link">
              View Audience →
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Segments;