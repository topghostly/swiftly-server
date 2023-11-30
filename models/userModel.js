const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userDetailSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    usermail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    businessType: {
      type: String,
    },
    CAC: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserDetail = mongoose.model("UserDetail", userDetailSchema);

module.exports = UserDetail;
