import { useState } from "react";
import axios from "axios";

function Campaigns() {
  const [campaignGoal, setCampaignGoal] = useState("");

  const [selectedSegment, setSelectedSegment] = useState(
    "High Value Customers"
  );

  const [selectedChannel, setSelectedChannel] = useState(
    "WhatsApp"
  );

  const [loading, setLoading] = useState(false);

  const [messageGenerated, setMessageGenerated] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [preview, setPreview] = useState({
    subject: "Campaign Subject",
    message: "Campaign message will appear here.",
  });

  const generateMessage = async () => {
    if (!campaignGoal.trim()) {
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await axios.post(
        "http://localhost:5000/api/ai/generate-message",
        {
          goal: campaignGoal,
          segment: selectedSegment,
          channel: selectedChannel,
        }
      );

      const aiText = response.data.data;

      const subjectMatch = aiText.match(
        /Subject:\s*(.*)/i
      );

      const messageMatch = aiText.match(
        /Message:\s*([\s\S]*)/i
      );

      setPreview({
        subject: subjectMatch
          ? subjectMatch[1].trim()
          : "Generated Subject",

        message: messageMatch
          ? messageMatch[1].trim()
          : aiText,
      });

      setMessageGenerated(true);
    } catch (error) {
      console.error(error);

      setMessageGenerated(false);

      setErrorMessage(
        "AI service is currently unavailable. Please try again in a few seconds."
      );
    } finally {
      setLoading(false);
    }
  };

  const sendCampaign = async () => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      await axios.post(
        "http://localhost:5000/api/campaigns",
        {
          segment: selectedSegment,
          channel: selectedChannel,
          goal: campaignGoal,
          subject: preview.subject,
          message: preview.message,
        }
      );

      setSuccessMessage(
        "Campaign created successfully."
      );
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Failed to create campaign. Please try again."
      );
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>Campaigns</h1>
      </div>

      <div className="campaign-builder">
        <h3>Create Campaign</h3>

        <div className="campaign-grid">
          <div className="form-group">
            <label>Audience Segment</label>

            <select
              value={selectedSegment}
              onChange={(e) =>
                setSelectedSegment(e.target.value)
              }
            >
              <option>High Value Customers</option>
              <option>Dormant Customers</option>
              <option>At Risk Customers</option>
            </select>
          </div>

          <div className="form-group">
            <label>Channel</label>

            <select
              value={selectedChannel}
              onChange={(e) =>
                setSelectedChannel(e.target.value)
              }
            >
              <option>WhatsApp</option>
              <option>Email</option>
              <option>SMS</option>
              <option>RCS</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Campaign Goal</label>

          <textarea
            placeholder="Example: Bring back inactive customers with a 15% discount offer"
            value={campaignGoal}
            onChange={(e) => {
              setCampaignGoal(e.target.value);
              setMessageGenerated(false);
              setErrorMessage("");
              setSuccessMessage("");
            }}
          />
        </div>

        <button
          className="primary-btn"
          onClick={generateMessage}
          disabled={
            !campaignGoal.trim() || loading
          }
        >
          {loading
            ? "Generating..."
            : "Generate AI Message"}
        </button>

        {loading && (
          <p style={{ marginTop: "10px" }}>
            Generating campaign message...
          </p>
        )}

        {errorMessage && (
          <p className="error-message">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="success-message">
            {successMessage}
          </p>
        )}
      </div>

      <div className="message-preview">
        <h3>Campaign Preview</h3>

        <div className="preview-card">
          <h4>Subject</h4>
          <p>{preview.subject}</p>

          <h4>Message</h4>
          <p>{preview.message}</p>
        </div>

        <button
          className="send-btn"
          onClick={sendCampaign}
          disabled={
            loading ||
            !campaignGoal.trim() ||
            !messageGenerated
          }
        >
          Send Campaign
        </button>
      </div>
    </>
  );
}

export default Campaigns;