const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["New", "Scheduled", "Completed", "Cancelled"],
      required: true,
    },
    receiver_name: { type: String, required: true },
    to_address: { type: String, required: true },
    delivery_date: { type: Date, required: true },
    truck_id: { type: String, required: true },
    truck_plate_number: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
