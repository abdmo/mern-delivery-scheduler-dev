const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const truckSchema = new Schema(
  {
    plate_number: { type: String, unique: true, required: true },
    status: { type: String, enum: ["Available", "In Use"], required: true },
  },
  {
    timestamps: true,
  }
);

const Truck = mongoose.model("Truck", truckSchema);

module.exports = Truck;
