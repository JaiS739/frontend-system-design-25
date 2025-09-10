const express = require("express");
const path = require("path");

const app = express();

app.get("/sse", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let counter = 0;

  const interval = setInterval(() => {
    counter++;
    const data = {
      time: new Date().toLocaleDateString(),
      message: `Hello from server #${counter}`,
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 3000);

  req.on("close", () => {
    clearInterval(interval);
    console.log("Client closed connection.");
  });
});

const port = 8019;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
