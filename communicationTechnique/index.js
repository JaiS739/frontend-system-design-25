import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let data = "this is data";
const clientList = [];

// short polling:-
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/getData", (req, res) => {
  data = "updated data";
  res.send({
    data,
  });
});

// long polling:-

// get the file:-

app.get("/longPolling", (req, res) => {
  res.sendFile(path.join(__dirname, "longPolling.html"))
})

app.get("/getPollingData", (req, res) => {
  if(data!==req.query.lastData){
    res.json({data});
  }
  else{
    clientList.push(res);
  }
});

app.get("/updateData", (req, res) => {
  data = req.query.data;  // ✅ update global variable
  while(clientList.length > 0) {
    const client = clientList.pop();
    client.json({ data }); // ✅ keep consistent response shape
  }
  res.send({
    message: "data updated successfully",
    status: 201,
  });
});

const port = "8080";

app.listen(port, () => {
  console.log(`port is running at port http://localhost:${port}`);
});
