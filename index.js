const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api", (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  let { date } = req.params;
  let parsedDate;

  // Remove spaces and handle both string and number
  date = date.trim();

  if (/^-?\d+$/.test(date)) {
    // If length is 13, treat as ms, if 10 as seconds
    parsedDate = new Date(
      date.length === 13 ? Number(date) : Number(date) * 1000
    );
  } else {
    parsedDate = new Date(date);
  }

  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
