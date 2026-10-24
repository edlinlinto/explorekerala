require("dotenv").config();
const mongoose = require("mongoose");
const Destination = require("./Destination");

const destinations = [
  {
    id: 1,
    name: "Munnar",
    district: "Idukki",
    category: "Nature",
    estimatedCost: 1800
  },
  {
    id: 2,
    name: "Alappuzha",
    district: "Alappuzha",
    category: "Backwaters",
    estimatedCost: 2200
  },
  {
    id: 3,
    name: "Athirappilly",
    district: "Thrissur",
    category: "Nature",
    estimatedCost: 1200
  },
  {
    id: 4,
    name: "Fort Kochi",
    district: "Ernakulam",
    category: "Culture",
    estimatedCost: 1000
  }
];

async function seedDestinations() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    for (const destination of destinations) {
      await Destination.updateOne(
        { id: destination.id },
        { $set: destination },
        { upsert: true }
      );
    }

    console.log("Four destinations saved to MongoDB successfully!");
  } catch (error) {
    console.error("Error saving destinations:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedDestinations();