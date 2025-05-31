const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");

app.use(express.json());
app.use(cors({
  origin: 'https://growler-front.vercel.app'
}));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(routes);

module.exports = app;