const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // (unique?)
  },
  password: {
    type: String,
    required: true,
  },

  photo: { type: String },
  socialNetwork: { type: String },
  productiveActivity: {
    type: Array(String),
  },
  description: {
    type: String(200),
  },
  country: String,
  province: String,
  latitude: Number,
  longitude: Number,
  videoKey: String,
  mitigatedCarbonFootprint: Number,
  mitigatedWaterFootprint: Number,
});

userSchema.pre("save", function (next) {
  const admin = this;

  if (!admin.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(admin.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      admin.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
