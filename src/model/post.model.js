const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  dateModified: {
    type: Date,
    required: true,
  },
  comments: {
    type: Array,
    required: false,
  },
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
