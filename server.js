"use strict";
const express = require("express");
const app = express();
const cart = require("./routes/cart");

app.use(express.static("./public"));
app.use(express.json());
app.use("/", cart);

const port = 5000;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});