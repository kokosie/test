const axios = require("axios");
const express = require("express");
const ProtectedTextAPI = require("protectedtext-api");

const app = express();
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});

app.use("/", express.static("assets"));

/*
app.get("/api", (req, res) => {
  axios
    .get("https://www.protectedtext.com/data0?data")
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});
*/

app.get("/data", (req, res) => {
  getData().then(data => {
    res.send(data);
  });
});

async function getData() {
  const TabManager = await new ProtectedTextAPI("data0", "data").loadTabs();
  const savedText = await TabManager.view();
  return savedText;
}

app.post("/", (req, res) => {
  res.send(req.body);
});
const foo = (req, res) => {
  res.sendFile("index.html");
};
app.get("/", foo);
