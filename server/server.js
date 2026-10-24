 const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Destination = require("./Destination");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the ExploreKerala API!");
});

// Get destinations from MongoDB
app.get("/api/destinations", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching destinations",
      error: error.message
    });
  }
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`ExploreKerala API running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });





