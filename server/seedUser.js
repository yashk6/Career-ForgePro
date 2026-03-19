const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/careerforge";

const DEFAULT_USER = {
  name: "Demo User",
  email: "demo@careerforge.local",
  password: "demo1234",
};

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const existing = await User.findOne({ email: DEFAULT_USER.email });
    if (existing) {
      console.log(`User already exists: ${DEFAULT_USER.email}`);
    } else {
      await User.create(DEFAULT_USER);
      console.log("Created default user:");
      console.log(`  Email: ${DEFAULT_USER.email}`);
      console.log(`  Password: ${DEFAULT_USER.password}`);
    }
  } catch (err) {
    console.error("Error seeding user:", err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();

