const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  estimatedCost: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Destination", destinationSchema);