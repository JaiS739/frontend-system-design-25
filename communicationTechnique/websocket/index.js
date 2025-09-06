const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = 8090;
app.listen(port, () => {
  console.log(` the port is running at http://localhost:${port}`);
});
