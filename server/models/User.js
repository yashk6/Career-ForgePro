const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
    isPro: { type: Boolean, default: false },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
  },
  { timestamps: true }
);

// Password complexity regex: min 8, 1 uppercase, 1 number/symbol
userSchema.path('password').validate(function(password) {
  return /^(?=.*[A-Z])(?=.*\d|\W).{8,}$/.test(password);
}, 'Password must be 8+ chars with uppercase & number/symbol');

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);

