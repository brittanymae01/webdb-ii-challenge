const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/api/cars", (req, res) => {
  db("cars")
    .then(cars => {
      return res.json(cars);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Failed to get cars"
      });
    });
});

server.post("/api/cars", (req, res) => {
  db("cars")
    .insert(req.body)
    .then(post => {
      return res.status(201).json(req.body);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Failed to post car"
      });
    });
});

module.exports = server;
