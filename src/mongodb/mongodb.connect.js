const mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.URI, { useNewUrlParser: true });
    console.log("Connected");
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
};

module.exports = connect;
