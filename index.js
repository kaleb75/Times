// Basic Timestamp Microservice using Express
const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  let dateString = req.params.date;
  let date;

  if (/^\d+$/.test(dateString)) {
    // If only digits, treat as unix timestamp (milliseconds or seconds)
    date = new Date(
      dateString.length <= 10
        ? parseInt(dateString) * 1000
        : parseInt(dateString)
    );
  } else {
    date = new Date(dateString);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.get("/", (req, res) => {
  res.send("Timestamp Microservice is running. Use /api/:date?");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
