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
      console.log(error);
      return res.status(500).json({
        errorMessage: "Failed to get cars"
      });
    });
});

server.get("/api/cars/:id", (req, res) => {
  db("cars")
    .where(req.params.id)
    .then(car => {
      if (car.length) {
        return res.json(car);
      } else {
        return res.status(404).json({
          error: "invalid car id"
        });
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        error: "failed to get car"
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
      console.log(error);
      return res.status(500).json({
        errorMessage: "Failed to post car"
      });
    });
});

module.exports = server;
