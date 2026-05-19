const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    published: Number,
  },
  {
    timestamp: true,
  },
);

module.exports = mongoose.model("Book", bookSchema);
