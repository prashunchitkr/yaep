const express = require("express");
const products = require("./data/products");

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.get("/api/products", (_req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.filter((p) => p._id === req.params.id);
  res.send(product);
});

app.listen(5000, console.log("Server running on port 5000"));
