// models/userModel.js

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Provide email address!");
      }
    },
  },
  password: { type: String, required: true, trim: true, minlength: 8 },
  tokens: { type: String },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 11);
  }
});

userSchema.methods.generateAuthTokens = async function () {
  const user = this;
  console.log(user);
  const token = jwt.sign({ _id: user._id.toString() }, "SECRET_JWT");

  console.log(token);
  user.tokens = token;
  await user.save();
  return token;
};

userSchema.statics.loginUser = async (email, pass) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Wrong Password or Username");
  }
  const checkPassword = await bcrypt.compare(pass, user.password);
  if (!checkPassword) {
    throw new Error("Wrong Password or Username");
  }
  return user;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
