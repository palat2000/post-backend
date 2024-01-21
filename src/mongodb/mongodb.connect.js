const mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      "mongodb+srv://pondza1985:pond1985@friendship.xfeonq1.mongodb.net/",
      { useNewUrlParser: true }
    );
    console.log("Connected");
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(error);
  }
};

module.exports = connect;
