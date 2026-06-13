const events = require("../data/events");

const receiveEvent = (req, res) => {
  const event = {
    id: Date.now(),
    ...req.body,
    receivedAt: new Date(),
  };

  events.push(event);

  res.status(200).json({
    success: true,
  });
};

const getEvents = (req, res) => {
  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
};

module.exports = {
  receiveEvent,
  getEvents,
};