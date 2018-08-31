"use strict";

const express = require("express");
const cart = express.Router();
const pool = require("../pg-connection-pool");

cart.get("/cart", (req, res) => {
    pool.query("select * from ShoppingCart order by id").then((result) => {
        res.send(result.rows) 
    })
})

cart.delete("/cart/:id", function (req, res) {
    pool.query("Delete From ShoppingCart Where id=$1::int", [parseInt(req.params.id)]).then(() => {
        pool.query("Select * From ShoppingCart order by id").then((results) => {
          res.send(results.rows);
    });
  });
});

cart.post("/cart", (req, res) => {
    pool.query("Insert Into ShoppingCart(product, price, quantity) Values($1::text, $2::int, $3::int)", [req.body.product, req.body.price, req.body.quantity]).then(() => {
        pool.query("Select * From ShoppingCart order by id").then((results) => {
          res.send(results.rows);
    });
  }); 
});

cart.put("/cart/:id", function (req, res) {
    pool.query("Update ShoppingCart set quantity=$1::int Where id=$2::int", [req.body.quantity, parseInt(req.params.id)]).then(() => {
        pool.query("Select * From ShoppingCart order by id").then((results) => {
          res.send(results.rows);
        });
      });
});

module.exports = cart;