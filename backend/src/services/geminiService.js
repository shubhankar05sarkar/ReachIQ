const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const generateCampaignMessage = async (goal, segment, channel) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  const prompt = `
You are a CRM marketing expert.

Generate a concise marketing campaign.

Audience Segment:
"${segment}"

Channel:
"${channel}"

Goal:
"${goal}"

Rules:
- Subject should be under 10 words
- Message should be under 80 words
- Use a friendly tone
- Include a clear call-to-action
- Tailor the content to the audience segment

Channel Rules:

WhatsApp:
- Conversational
- Can use 1-2 emojis
- Keep it personal

Email:
- Professional
- Include a subject line
- Slightly more detailed

SMS:
- Maximum 160 characters
- No unnecessary words
- Direct CTA

RCS:
- Promotional and engaging
- Mention offer clearly
- Modern marketing style

Return ONLY:

Subject: <subject>

Message: <message>

Do not use placeholders such as [Customer Name],
[Company Name], or [Website Link].

Use generic values instead.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

const generateSegmentSuggestion = async (prompt) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  const aiPrompt = `
You are a CRM audience segmentation expert.

A marketer describes an audience in plain English.

Audience Description:
"${prompt}"

Generate a concise audience recommendation.

Rules:
- Keep under 50 words
- Use Indian currency (₹)
- Return exactly one audience recommendation
- Start with "Suggested Audience:"
- Be specific and business-oriented

Example:
Suggested Audience: High Value Customers - customers who spent over ₹10,000 and purchase frequently.
`;

  const result = await model.generateContent(aiPrompt);

  return result.response.text();
};

module.exports = {
  generateCampaignMessage,
  generateSegmentSuggestion,
};