const express = require("express");
const app = express();

app.use(express.json());

//Import all routes
const products = require("./routes/product");

app.use("/api/v1", products);
// app.use("/api/v1/admin/product", products);
module.exports = app;
