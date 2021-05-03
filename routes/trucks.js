const router = require("express").Router();
let Truck = require("../models/truck.model");

router.route("/").get((req, res) => {
  Truck.find()
    .then((trucks) => res.json(trucks))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const newTruck = new Truck({
    plate_number: req.body.plate_number,
    status: "Available",
  });

  newTruck
    .save()
    .then(() => res.json(newTruck))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Truck.findById(req.params.id)
    .then((truck) => {
      truck.status = req.body.status;
      truck
        .save()
        .then(() => res.json(truck))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/available").get((req, res) => {
  Truck.find({ status: "Available" })
    .count()
    .exec(function (err, count) {
      // Get a random entry
      var random = Math.floor(Math.random() * count);

      Truck.findOne({ status: "Available" })
        .skip(random)
        .then((trucks) => res.json(trucks))
        .catch((err) => res.status(400).json("Error: " + err));
    });
});

module.exports = router;
