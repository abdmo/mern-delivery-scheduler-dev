const router = require("express").Router();
let Record = require("../models/record.model");

router.route("/").get((req, res) => {
  Record.find()
    .then((records) => res.json(records))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Record.findById(req.params.id)
    .then((record) => res.json(record))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const status = req.body.status;
  const receiverName = req.body.receiver_name;
  const toAddress = req.body.to_address;
  const deliveryDate = Date.parse(req.body.delivery_date);
  const truckId = req.body.truck_id;
  const truckPlateNumber = req.body.truck_plate_number;

  const newRecord = new Record({
    status: status,
    receiver_name: receiverName,
    to_address: toAddress,
    delivery_date: deliveryDate,
    truck_id: truckId,
    truck_plate_number: truckPlateNumber,
  });

  newRecord
    .save()
    .then(() => res.json(newRecord))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Record.findById(req.params.id)
    .then((record) => {
      record.status = req.body.status;
      record
        .save()
        .then(() => res.json(record))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
