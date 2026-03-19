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
  console.log("🚫 Demo user seeding DISABLED for production safety.");
  console.log("Create users via /api/auth/register endpoint.");
  process.exit(0);
}

run();

