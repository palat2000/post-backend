const mongoose = require("mongoose");

const authenticationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AuthenticationModel = mongoose.model(
  "Authentication",
  authenticationSchema
);

module.exports = AuthenticationModel;
