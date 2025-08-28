import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let data = "this is data";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/getData", (req, res) => {
  data = "updated data";
  res.send({
    data,
  });
});

const port = "8080";

app.listen(port, () => {
  console.log(`port is running at port http://localhost:${port}`);
});
